'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/core/components/admin/blog/BlogForm';
import { adminBlogApi } from '@/services/api/admin/blogApi';
import prisma from '@/lib/prisma';

export default function CreateBlogPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      // Fetch categories and authors
      const [categoriesRes, authorsRes] = await Promise.all([
        fetch('/api/blogs?limit=1').then(r => r.json()),
        fetch('/api/admin/blogs').then(r => r.json()),
      ]);
      
      // Extract unique categories
      if (categoriesRes.categories) {
        setCategories(categoriesRes.categories.map((c: any) => ({ id: c.id, name: c.name, nameAr: c.name })));
      }
      
      // Extract unique authors from blogs
      const uniqueAuthors = authorsRes.reduce((acc: any[], blog: any) => {
        if (!acc.find(a => a.id === blog.author.id)) {
          acc.push({ id: blog.author.id, name: blog.author.name });
        }
        return acc;
      }, []);
      setAuthors(uniqueAuthors);
    } catch (error) {
      console.error('Failed to load form data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    await adminBlogApi.createBlog(data);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <p className="text-gray-600 mt-1">Add a new blog article</p>
      </div>

      <BlogForm
        mode="create"
        onSubmit={handleSubmit}
        categories={categories}
        authors={authors}
      />
    </div>
  );
}
