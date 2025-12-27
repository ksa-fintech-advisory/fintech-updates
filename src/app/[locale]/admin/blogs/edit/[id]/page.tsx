'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlogForm from '@/core/components/admin/blog/BlogForm';
import { adminBlogApi } from '@/services/api/admin/blogApi';

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load blog data
      const blogData = await adminBlogApi.getBlog(params.id as string);
      setBlog(blogData);

      // Load categories and authors
      const [categoriesRes, authorsRes] = await Promise.all([
        fetch('/api/blogs?limit=1').then(r => r.json()),
        fetch('/api/admin/blogs').then(r => r.json()),
      ]);
      
      if (categoriesRes.categories) {
        setCategories(categoriesRes.categories.map((c: any) => ({ id: c.id, name: c.name, nameAr: c.name })));
      }
      
      const uniqueAuthors = authorsRes.reduce((acc: any[], blog: any) => {
        if (!acc.find(a => a.id === blog.author.id)) {
          acc.push({ id: blog.author.id, name: blog.author.name });
        }
        return acc;
      }, []);
      setAuthors(uniqueAuthors);
    } catch (err: any) {
      setError(err.message || 'Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    await adminBlogApi.updateBlog(params.id as string, data);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  if (error || !blog) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || 'Blog not found'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="text-gray-600 mt-1">Update blog article</p>
      </div>

      <BlogForm
        mode="edit"
        initialData={blog}
        onSubmit={handleSubmit}
        categories={categories}
        authors={authors}
      />
    </div>
  );
}
