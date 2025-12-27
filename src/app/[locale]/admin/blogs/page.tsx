'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogListTable from '@/core/components/admin/blog/BlogListTable';
import { adminBlogApi } from '@/services/api/admin/blogApi';

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminBlogApi.getBlogs();
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminBlogApi.deleteBlog(id);
      // Reload blogs after deletion
      await loadBlogs();
    } catch (err: any) {
      alert(err.message || 'Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-600 mt-1">Manage all blog articles</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Blog
        </button>
      </div>

      <BlogListTable blogs={blogs} onDelete={handleDelete} />
    </div>
  );
}
