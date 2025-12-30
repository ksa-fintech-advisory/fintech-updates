'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { adminBlogApi } from '@/services/api/admin/blogApi';
import { format } from 'date-fns';
import Image from 'next/image';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const data = await adminBlogApi.getBlog(params.id as string);
        setBlog(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{isRTL ? 'جاري التحميل...' : 'Loading...'}</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || (isRTL ? 'لم يتم العثور على المدونة' : 'Blog not found')}
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with actions */}
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => router.push('/admin/blogs')}
            className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2"
          >
            {isRTL ? '← العودة للقائمة' : '← Back to list'}
          </button>
          <h1 className="text-3xl font-bold">
            {isRTL ? blog.titleAr : blog.titleEn}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isRTL ? 'تعديل' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="rounded-lg overflow-hidden relative h-64 w-full">
          <Image 
            src={blog.featuredImage} 
            alt={isRTL ? blog.titleAr : blog.titleEn}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Meta Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'معلومات المدونة' : 'Blog Information'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'المعرف' : 'Slug'}
            </label>
            <p className="mt-1 text-gray-900">{blog.slug}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'الفئة' : 'Category'}
            </label>
            <p className="mt-1">
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{ backgroundColor: blog.category.color + '20', color: blog.category.color }}
              >
                {isRTL ? blog.category.nameAr : blog.category.name}
              </span>
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'الكاتب' : 'Author'}
            </label>
            <p className="mt-1 text-gray-900">
              {isRTL ? (blog.author.nameAr || blog.author.name) : blog.author.name}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'تاريخ النشر' : 'Published Date'}
            </label>
            <p className="mt-1 text-gray-900">
              {format(new Date(blog.publishedAt), 'MMM dd, yyyy')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'وقت القراءة' : 'Read Time'}
            </label>
            <p className="mt-1 text-gray-900">
              {blog.readTime} {isRTL ? 'دقيقة' : 'min'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'الوسوم' : 'Tags'}
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {blog.tags && blog.tags.map((tag: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'المقتطف' : 'Excerpt'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'الإنجليزية' : 'English'}
            </label>
            <p className="mt-1 text-gray-700">{blog.excerptEn}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'العربية' : 'Arabic'}
            </label>
            <p className="mt-1 text-gray-700">{blog.excerptAr}</p>
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'محتوى المدونة' : 'Blog Content'}
        </h2>
        <div className="prose max-w-none">
          <h3 className="text-lg font-medium mb-2">
            {isRTL ? 'المحتوى بالإنجليزية' : 'English Content'}
          </h3>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
            {blog.contentEn && blog.contentEn.length} blocks
          </div>
          
          <h3 className="text-lg font-medium mb-2 mt-4">
            {isRTL ? 'المحتوى بالعربية' : 'Arabic Content'}
          </h3>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
            {blog.contentAr && blog.contentAr.length} blocks
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'التواريخ' : 'Timestamps'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'تاريخ الإنشاء' : 'Created At'}
            </label>
            <p className="mt-1 text-gray-900">
              {format(new Date(blog.createdAt), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              {isRTL ? 'تاريخ التعديل' : 'Updated At'}
            </label>
            <p className="mt-1 text-gray-900">
              {format(new Date(blog.updatedAt), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
