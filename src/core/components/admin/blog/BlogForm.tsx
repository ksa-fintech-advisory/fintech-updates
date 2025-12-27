'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/core/components/admin/editor/RichTextEditor';
import { BlogContentBlock } from '@/core/types/web/blog';
import { CreateBlogDto, UpdateBlogDto } from '@/services/api/admin/blogApi';

interface BlogFormProps {
  initialData?: any; // Full blog data from API for editing
  mode: 'create' | 'edit';
  onSubmit: (data: CreateBlogDto | UpdateBlogDto) => Promise<void>;
  categories: Array<{ id: string; name: string; nameAr: string }>;
  authors: Array<{ id: string; name: string }>;
}

export default function BlogForm({ initialData, mode, onSubmit, categories, authors }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');
  
  // Form state
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    titleEn: initialData?.titleEn || '',
    titleAr: initialData?.titleAr || '',
    excerptEn: initialData?.excerptEn || '',
    excerptAr: initialData?.excerptAr || '',
    featuredImage: initialData?.featuredImage || '',
    categoryId: initialData?.categoryId || '',
    authorId: initialData?.authorId || '',
    readTime: initialData?.readTime || 5,
    tags: initialData?.tags || [],
  });

  const [contentEn, setContentEn] = useState<BlogContentBlock[]>(initialData?.contentEn || []);
  const [contentAr, setContentAr] = useState<BlogContentBlock[]>(initialData?.contentAr || []);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.slug || !formData.titleEn || !formData.titleAr || !formData.categoryId || !formData.authorId) {
        throw new Error('Please fill in all required fields');
      }

      const submitData = {
        ...formData,
        contentEn,
        contentAr,
      };

      await onSubmit(submitData);
      
      // Redirect to blog list on success
      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="blog-url-slug"
            required
          />
          <p className="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title (English) *</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title (Arabic) *</label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              dir="rtl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (English) *</label>
            <textarea
              value={formData.excerptEn}
              onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (Arabic) *</label>
            <textarea
              value={formData.excerptAr}
              onChange={(e) => setFormData({ ...formData, excerptAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
              dir="rtl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author *</label>
            <select
              value={formData.authorId}
              onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select author</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Read Time (min)</label>
            <input
              type="number"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 5 })}
              className="w-full border rounded px-3 py-2"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Featured Image URL</label>
          <input
            type="text"
            value={formData.featuredImage}
            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="/images/blogs/example.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Content</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentLang('en')}
              className={`px-4 py-2 rounded ${currentLang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang('ar')}
              className={`px-4 py-2 rounded ${currentLang === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Arabic
            </button>
          </div>
        </div>

        {currentLang === 'en' ? (
          <RichTextEditor
            key="editor-en"
            initialContent={contentEn}
            onChange={setContentEn}
          />
        ) : (
          <RichTextEditor
            key="editor-ar"
            initialContent={contentAr}
            onChange={setContentAr}
          />
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border rounded hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Blog' : 'Update Blog'}
        </button>
      </div>
    </form>
  );
}
