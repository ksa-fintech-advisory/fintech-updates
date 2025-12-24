
import { Node, mergeAttributes } from '@tiptap/core';

export interface HighlightOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlightBlock: {
      setHighlightBlock: (attributes?: { title?: string; text?: string; variant?: 'info' | 'warning' | 'success' }) => ReturnType;
    };
  }
}

export const HighlightBlock = Node.create<HighlightOptions>({
  name: 'highlight',

  group: 'block',

  content: 'inline*', // Allow inline content (text) inside

  // definable attributes
  addAttributes() {
    return {
      variant: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-variant'),
        renderHTML: attributes => ({
          'data-variant': attributes.variant,
        }),
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => ({
          'data-title': attributes.title,
        }),
      },
      // We map 'text' to the node content in Tiptap, so we don't need a specific attr for it, 
      // BUT our schema separates title and text. 
      // In Tiptap, it's better to have visual nodes.
      // Let's implement this as a wrapper div with a title div and a content div.
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="highlight"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'highlight', class: `highlight-block ${HTMLAttributes.variant}` }), 0];
  },

  addCommands() {
    return {
      setHighlightBlock:
        attributes =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
    };
  },
  
  // Custom Node View might be needed for better UI (Title input vs Content input).
  // For now, let's stick to simple renderHTML where the user just types content, 
  // and maybe we use a prompt or property editor for the Title.
  // Actually, to make it "Rich", we should probably use a React Node View.
});
