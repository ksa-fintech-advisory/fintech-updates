
import { JSONContent } from '@tiptap/react';
import { BlogContentBlock } from '@/core/types/web/blog';

export const serialize = (json: JSONContent): BlogContentBlock[] => {
  const blocks: BlogContentBlock[] = [];

  if (!json.content) return blocks;

  json.content.forEach((node) => {
    switch (node.type) {
      case 'heading':
        if (node.attrs && node.content && node.content[0].text) {
           blocks.push({ 
             type: 'header', 
             level: node.attrs.level as 1 | 2 | 3 | 4 | 5 | 6, 
             text: node.content[0].text 
           });
        }
        break;

      case 'paragraph':
        // Handle text with marks (bold, italic) - simple paragraphs for now or rich text processing?
        // The BlogContentBlock 'paragraph' is currently just { text: string }. 
        // This implies we lose inline formatting if we just take textContent.
        // However, looking at the mock data: "Europe is building a unified..." it seems plain strings are used, 
        // OR the 'text' field might need to support HTML/Markdown if we want bold/italic.
        // Let's check the mock data... it looks like plain text in the examples.
        // BUT, a real blog needs Bold/Italic. 
        // If the current schema allows only 'text: string', we might need to assume it can hold HTML or we strip formatting.
        // Given the requirement "like we did in the blogs", and the mock data shows no HTML tags in the 'text' fields...
        // Wait, looking at lines 64 of mock data: text: 'حالياً أوروبا بتشتغل...' 
        // It seems purely text based. 
        // Use case: "Rich Text Editor" implies we WANT formatting.
        // I will serialize paragraph content as TEXT for now to match strict schema, 
        // AND I will check if I should update the type or if 'text' is implicitly HTML-safe.
        // For now, I will extract text content.
        
        if (node.content) {
          const text = node.content.map(n => n.text).join('');
          if (text.trim()) {
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
                     return listItem.content[0].content.map((n: any) => n.text).join('');
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
             const text = node.content.map((n: any) => n.content?.map((t:any) => t.text).join('')).join('\n');
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
             blocks.push({
                 type: 'highlight',
                 text: node.attrs.text,
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

export const parse = (blocks: BlogContentBlock[]): JSONContent => {
    const content: JSONContent[] = [];

    blocks.forEach(block => {
        switch(block.type) {
            case 'header':
                content.push({
                    type: 'heading',
                    attrs: { level: block.level },
                    content: [{ type: 'text', text: block.text }]
                });
                break;
            case 'paragraph':
                 content.push({
                    type: 'paragraph',
                    content: [{ type: 'text', text: block.text }]
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
                             content: [{ type: 'text', text: item }]
                         }]
                     }))
                 });
                 break;
            case 'quote':
                content.push({
                    type: 'blockquote',
                    content: [{
                        type: 'paragraph',
                        content: [{ type: 'text', text: block.text }]
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
                         text: block.text,
                         title: block.title,
                         variant: block.variant
                     }
                 });
                 break;
        }
    });

    return {
        type: 'doc',
        content
    };
};
