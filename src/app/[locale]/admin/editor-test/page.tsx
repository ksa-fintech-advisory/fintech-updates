
'use client';

import { useState } from 'react';
import RichTextEditor from '@/core/components/admin/editor/RichTextEditor';
import { BlogContentBlock } from '@/core/types/web/blog';

const initialMockContent: BlogContentBlock[] = [
    {
        type: 'header',
        level: 2,
        text: 'Testing the Rich Text Editor'
    },
    {
        type: 'paragraph',
        text: 'This is a paragraph to test if the editor can load existing content correctly.'
    },
    {
        type: 'list',
        style: 'unordered',
        items: ['Item 1', 'Item 2', 'Item 3']
    },
    {
        type: 'quote',
        text: 'This is a quote block.'
    },
    {
        type: 'highlight',
        title: 'Important Note',
        text: 'This is a highlight block with info variant.',
        variant: 'info'
    }
];

export default function EditorTestPage() {
    const [content, setContent] = useState<BlogContentBlock[]>(initialMockContent);

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-3xl font-bold mb-8">Rich Text Editor Test</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Editor</h2>
                    <RichTextEditor 
                        initialContent={initialMockContent} 
                        onChange={setContent} 
                        className="min-h-[500px]"
                    />
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto max-h-[600px]">
                    <h2 className="text-xl font-semibold mb-4 text-white">Live Data Output (JSON)</h2>
                    <pre className="text-xs font-mono">
                        {JSON.stringify(content, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
