'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface BlogListTableProps {
  blogs: any[];
  onDelete: (id: string) => Promise<void>;
}

export default function BlogListTable({ blogs, onDelete }: BlogListTableProps) {
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await onDelete(id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Published
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{blog.titleEn}</div>
                <div className="text-sm text-gray-500 truncate max-w-md">{blog.excerptEn}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: blog.category.color + '20', color: blog.category.color }}
                >
                  {blog.category.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {blog.author.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(blog.publishedAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id, blog.titleEn)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {blogs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No blogs found. Create your first blog!
        </div>
      )}
    </div>
  );
}
