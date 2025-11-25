import { Article, PaginatedArticles, ArticleFilters } from '@/core/types/web/article';
import { articles } from './data/articles.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const articleService = {
  /**
   * Get paginated articles with optional filters
   */
  async paginateArticles(
    page: number = 1,
    limit: number = 9,
    filters?: ArticleFilters
  ): Promise<PaginatedArticles> {
    await delay();
    
    let filteredArticles = [...articles];

    // Apply filters
    if (filters?.category) {
      filteredArticles = filteredArticles.filter(
        article => article.category.slug === filters.category
      );
    }

    if (filters?.tag) {
      filteredArticles = filteredArticles.filter(
        article => article.tags.includes(filters.tag!)
      );
    }

    if (filters?.featured !== undefined) {
      filteredArticles = filteredArticles.filter(
        article => article.isFeatured === filters.featured
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.en.toLowerCase().includes(searchLower) ||
        article.title.ar.toLowerCase().includes(searchLower) ||
        article.excerpt.en.toLowerCase().includes(searchLower) ||
        article.excerpt.ar.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by published date (newest first)
    filteredArticles.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const total = filteredArticles.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      articles: filteredArticles.slice(start, end),
      total,
      page,
      limit,
      totalPages,
    };
  },

  /**
   * Get a single article by ID or slug
   */
  async getOneArticle(idOrSlug: string): Promise<Article | null> {
    await delay();

    const article = articles.find(
      a => a.id === idOrSlug || a.slug === idOrSlug
    );

    if (article) {
      // Increment view count (in real app, this would update the database)
      article.views++;
    }

    return article || null;
  },

  /**
   * Get related articles based on category and tags
   */
  async getRelatedArticles(
    articleId: string,
    limit: number = 3
  ): Promise<Article[]> {
    await delay(300);

    const article = articles.find(a => a.id === articleId);
    if (!article) return [];

    // Find articles with same category or overlapping tags
    const related = articles
      .filter(a => a.id !== articleId)
      .map(a => {
        let score = 0;
        // Same category gets higher score
        if (a.category.id === article.category.id) score += 10;
        // Count overlapping tags
        const commonTags = a.tags.filter(tag => article.tags.includes(tag));
        score += commonTags.length * 2;
        return { article: a, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article);

    return related;
  },

  /**
   * Search articles by query
   */
  async searchArticles(query: string): Promise<Article[]> {
    await delay();

    const searchLower = query.toLowerCase();
    return articles.filter(article =>
      article.title.en.toLowerCase().includes(searchLower) ||
      article.title.ar.toLowerCase().includes(searchLower) ||
      article.excerpt.en.toLowerCase().includes(searchLower) ||
      article.excerpt.ar.toLowerCase().includes(searchLower) ||
      article.content.en.toLowerCase().includes(searchLower) ||
      article.content.ar.toLowerCase().includes(searchLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  },

  /**
   * Get featured articles
   */
  async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
    await delay(300);

    return articles
      .filter(a => a.isFeatured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  },
};
