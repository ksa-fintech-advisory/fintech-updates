
import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Image as ImageIcon,
  Highlighter,
  Link2 
} from 'lucide-react';
import { useRef } from 'react';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  // Hooks must be called before any conditional returns
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const ToggleButton = ({
    isActive,
    onClick,
    icon: Icon,
    label
  }: {
    isActive: boolean;
    onClick: () => void;
    icon: any;
    label: string
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200 text-black' : 'text-gray-600'
      }`}
      title={label}
      type="button" // Prevent form submission if inside a form
    >
      <Icon size={18} />
    </button>
  );

  /* Image Upload Logic */
  const addImageUrl = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset value to allow same file upload again
    if (event.target) {
        event.target.value = '';
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  // ... (inside return)
  /* Hidden Input */
  // <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
  
  // Replace toggle button section


  const addHighlight = () => {
      // Basic implementation: convert current selection to highlight or insert new
      // For now, let's just toggle 'highlight' node if possible, or insert
      editor.chain().focus().toggleNode('highlight', 'paragraph').run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 rounded-t-lg sticky top-0 z-10 border-b">
      <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <ToggleButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={Undo}
          label="Undo"
        />
        <ToggleButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={Redo}
          label="Redo"
        />
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <ToggleButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          label="Bold"
        />
        <ToggleButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          label="Italic"
        />
         <ToggleButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={Strikethrough}
          label="Strike"
        />
         <ToggleButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={Code}
          label="Code"
        />
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <ToggleButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          label="H2"
        />
        <ToggleButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={Heading3}
          label="H3"
        />
      </div>

       <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <ToggleButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          label="Bullet List"
        />
        <ToggleButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          label="Ordered List"
        />
          <ToggleButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
          label="Quote"
        />
      </div>
      
      <div className="flex items-center gap-1">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          
          <ToggleButton
              onClick={triggerImageUpload}
              isActive={false}
              icon={ImageIcon}
              label="Upload Image"
            />
           <ToggleButton
              onClick={addImageUrl}
              isActive={false}
              icon={Link2} // Using Link2 for URL Image
              label="Image from URL"
            />
            
            {/* Custom Blocks */}
             <ToggleButton
              onClick={addHighlight}
              isActive={editor.isActive('highlight')}
              icon={Highlighter}
              label="Highlight Box"
            />
      </div>
    </div>
  );
};

export default EditorToolbar;
