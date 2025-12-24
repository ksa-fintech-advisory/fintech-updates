import { JSONContent } from '@tiptap/react';
import { BlogContentBlock } from '@/core/types/web/blog';

// Helper to serialize inline text nodes to HTML string
const serializeToHtml = (content: any[]): string => {
    if (!content) return '';

    return content.map(node => {
        let text = node.text || '';

        // HTML Escape text to prevent XSS issues when avoiding innerHTML locally if we were, 
        // but we want to Produce HTML.
        // Basic escaping for < > &
        text = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        if (node.marks) {
            node.marks.forEach((mark: any) => {
                switch (mark.type) {
                    case 'bold':
                        text = `<strong>${text}</strong>`;
                        break;
                    case 'italic':
                        text = `<em>${text}</em>`;
                        break;
                    case 'strike':
                        text = `<s>${text}</s>`;
                        break;
                    case 'underline':
                        text = `<u>${text}</u>`;
                        break;
                    case 'code':
                        text = `<code>${text}</code>`;
                        break;
                    case 'link':
                        text = `<a href="${mark.attrs.href}" target="${mark.attrs.target || '_blank'}" rel="noopener noreferrer">${text}</a>`;
                        break;
                }
            });
        }
        return text;
    }).join('');
};

export const serialize = (json: JSONContent): BlogContentBlock[] => {
  const blocks: BlogContentBlock[] = [];

  if (!json.content) return blocks;

  json.content.forEach((node) => {
    switch (node.type) {
      case 'heading':
            if (node.attrs && node.content) {
           blocks.push({ 
             type: 'header', 
             level: node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6, 
               text: serializeToHtml(node.content)
           });
        }
        break;

        case 'paragraph':
        if (node.content) {
            // Check if it's an empty paragraph or just whitespace
            const hasContent = node.content.some(n => n.text && n.text.trim());
            // Or if it has images/hard breaks etc.
            // For now, if serializeToHtml returns empty string, ignore? 
            // Or keep empty paragraphs as spacers? 
            // Tiptap adds empty paragraphs often. Let's keep if it has content.
            const text = serializeToHtml(node.content);
            if (text) {
            blocks.push({ type: 'paragraph', text });
          }
        }
        break;

      case 'bulletList':
      case 'orderedList':
        if (node.content) {
            const items = node.content.map(listItem => {
                // list item -> paragraph -> text
                // Tiptap structure: bulletList -> listItem -> paragraph -> text
                if (listItem.content && listItem.content[0].content) {
                    return serializeToHtml(listItem.content[0].content);
                }
                return '';
            }).filter((t: string) => t !== '');
            
            blocks.push({
                type: 'list',
                style: node.type === 'orderedList' ? 'ordered' : 'unordered',
                items
            });
        }
        break;

      case 'blockquote':
         if (node.content) {
            // blockquote -> paragraph -> text
             const text = node.content.map((n: any) => serializeToHtml(n.content)).join('<br>');
             blocks.push({ type: 'quote', text });
         }
         break;

      case 'image':
        if (node.attrs) {
            blocks.push({
                type: 'image',
                src: node.attrs.src,
                alt: node.attrs.alt || '',
                caption: node.attrs.title
            });
        }
        break;
        
      case 'highlight': // Custom Custom Node
        if (node.attrs) {
            // For highlight, the content is in node.content (if we defined it as inline*)
            // My previous edit fallback to node.content.
            const text = node.content ? serializeToHtml(node.content) : (node.attrs.text || '');
             blocks.push({
                 type: 'highlight',
                 text: text, 
                 title: node.attrs.title,
                 variant: node.attrs.variant
             });
        }
        break;
        
       // TODO: Timeline serializer
    }
  });

  return blocks;
};

const parseHtmlToContent = (html: string): JSONContent[] => {
    // Basic parser for our supported subset
    // Since we are in browser, we can use DOMParser
    if (typeof window === 'undefined') {
        // Fallback for server-side (if ever used there) -> return plain text
        return [{ type: 'text', text: html.replace(/<[^>]*>/g, '') }];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nodes: JSONContent[] = [];

    const traverse = (domNode: Node, marks: any[] = []) => {
        if (domNode.nodeType === Node.TEXT_NODE) {
            if (domNode.textContent) {
                nodes.push({ type: 'text', text: domNode.textContent, marks: marks.length ? marks : undefined });
            }
        } else if (domNode.nodeType === Node.ELEMENT_NODE) {
            const el = domNode as HTMLElement;
            const newMarks = [...marks];

            switch (el.tagName.toLowerCase()) {
                case 'strong':
                case 'b':
                    newMarks.push({ type: 'bold' });
                    break;
                case 'em':
                case 'i':
                    newMarks.push({ type: 'italic' });
                    break;
                case 'u':
                    newMarks.push({ type: 'underline' });
                    break;
                case 's':
                case 'strike':
                    newMarks.push({ type: 'strike' });
                    break;
                case 'code':
                    newMarks.push({ type: 'code' });
                    break;
                case 'a':
                    newMarks.push({
                        type: 'link',
                        attrs: {
                            href: el.getAttribute('href'),
                            target: el.getAttribute('target')
                        }
                    });
                    break;
            }

            el.childNodes.forEach(child => traverse(child, newMarks));
        }
    };

    doc.body.childNodes.forEach(child => traverse(child));
    return nodes;
};

export const parse = (blocks: BlogContentBlock[]): JSONContent => {
    const content: JSONContent[] = [];

    blocks.forEach(block => {
        switch(block.type) {
            case 'header':
                content.push({
                    type: 'heading',
                    attrs: { level: block.level },
                    content: parseHtmlToContent(block.text)
                });
                break;
            case 'paragraph':
                 content.push({
                    type: 'paragraph',
                     content: parseHtmlToContent(block.text)
                });
                break;
            case 'list':
                 const listType = block.style === 'ordered' ? 'orderedList' : 'bulletList';
                 content.push({
                     type: listType,
                     content: block.items.map(item => ({
                         type: 'listItem',
                         content: [{
                             type: 'paragraph',
                             content: parseHtmlToContent(item)
                         }]
                     }))
                 });
                 break;
            case 'quote':
                content.push({
                    type: 'blockquote',
                    content: [{
                        type: 'paragraph',
                        content: parseHtmlToContent(block.text)
                    }]
                });
                break;
            case 'image':
                content.push({
                    type: 'image',
                    attrs: {
                        src: block.src,
                        alt: block.alt,
                        title: block.caption
                    }
                });
                break;
            case 'highlight':
                 content.push({
                     type: 'highlight',
                     attrs: {
                         title: block.title,
                         variant: block.variant
                     },
                     content: parseHtmlToContent(block.text)
                 });
                 break;
        }
    });

    return {
        type: 'doc',
        content
    };
};
