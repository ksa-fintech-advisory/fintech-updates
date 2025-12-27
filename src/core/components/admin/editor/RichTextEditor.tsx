
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';
import { parse, serialize } from './utils/serializer';
import { HighlightBlock } from './extensions/HighlightBlock';
import EditorToolbar from './EditorToolbar';

interface RichTextEditorProps {
  initialContent?: BlogContentBlock[];
  onChange?: (blocks: BlogContentBlock[]) => void;
  className?: string; // Additional classes
  direction?: 'ltr' | 'rtl'; // Text direction for RTL languages
}

const RichTextEditor = ({ initialContent = [], onChange, className, direction = 'ltr' }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      HighlightBlock,
    ],
    content: parse(initialContent),
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
        dir: direction, // Apply text direction
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const blocks = serialize(json);
      if (onChange) {
        onChange(blocks);
      }
    },
  });

  // Handle external content updates if needed (e.g., loading data async)
  // useEffect(() => {
  //   if (editor && initialContent) {
  //      // careful with infinite loops here, check equality
  //   }
  // }, [initialContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg shadow-sm bg-white ${className}`} dir={direction}>
      <EditorToolbar editor={editor} />
      <div className="border-t">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
