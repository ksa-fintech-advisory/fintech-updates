import { Blog, PaginatedBlogs, BlogFilters, BlogCategory } from '@/core/types/web/blog';
import { blogs, blogCategories } from './data/blogs.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const blogService = {
  /**
   * Get paginated blogs with optional filters
   */
  async paginateBlogs(
    page: number = 1,
    limit: number = 12,
    filters?: BlogFilters
  ): Promise<PaginatedBlogs> {
    await delay();

    let filteredBlogs = [...blogs];

    // Apply category filter
    if (filters?.category) {
      filteredBlogs = filteredBlogs.filter(
        blog => blog.category.slug === filters.category
      );
    }

    // Apply search filter
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.en.toLowerCase().includes(searchLower) ||
        blog.title.ar.toLowerCase().includes(searchLower) ||
        blog.excerpt.en.toLowerCase().includes(searchLower) ||
        blog.excerpt.ar.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by published date (newest first)
    filteredBlogs.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const total = filteredBlogs.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      blogs: filteredBlogs.slice(start, end),
      total,
      page,
      limit,
      totalPages,
      categories: blogCategories,
    };
  },

  /**
   * Filter blogs by category
   */
  async filterBlogs(categorySlug: string): Promise<Blog[]> {
    await delay();

    return blogs.filter(blog => blog.category.slug === categorySlug);
  },

  /**
   * Get a single blog by slug
   */
  async getBlogBySlug(slug: string) {
    await delay();

    return blogs.find(blog => blog.slug === slug) || null;
  },

  /**
   * Get blog categories
   */
  async getBlogCategories() {
    await delay(200);

    return blogCategories;
  },

  /**
   * Search blogs by query
   */
  async searchBlogs(query: string) {
    await delay();

    const lowerQuery = query.toLowerCase();
    return blogs.filter(blog => 
      blog.title.en.toLowerCase().includes(lowerQuery) ||
      blog.title.ar.toLowerCase().includes(lowerQuery) ||
      blog.excerpt.en.toLowerCase().includes(lowerQuery) ||
      blog.excerpt.ar.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get one blog by ID or slug (alias for getBlogBySlug for consistency)
   */
  async getOneBlog(idOrSlug: string) {
    await delay();

    return blogs.find(blog => blog.id === idOrSlug || blog.slug === idOrSlug) || null;
  },
};