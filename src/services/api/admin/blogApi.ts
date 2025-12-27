import { Blog, BlogContentBlock } from '@/core/types/web/blog';

export interface CreateBlogDto {
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: BlogContentBlock[];
  contentAr: BlogContentBlock[];
  featuredImage?: string;
  tags: string[];
  categoryId: string;
  authorId: string;
  readTime?: number;
  publishedAt?: string;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}

class AdminBlogApi {
  private baseUrl = '/api/admin/blogs';

  async getBlogs(): Promise<Blog[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  }

  async getBlog(id: string): Promise<Blog> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return response.json();
  }

  async createBlog(data: CreateBlogDto): Promise<Blog> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create blog');
    }

    return response.json();
  }

  async updateBlog(id: string, data: UpdateBlogDto): Promise<Blog> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update blog');
    }

    return response.json();
  }

  async deleteBlog(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete blog');
    }
  }
}

export const adminBlogApi = new AdminBlogApi();
