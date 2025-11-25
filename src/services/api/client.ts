import { articleService } from "./mock/articles";
import { blogService } from "./mock/blogs";
import { homeService } from "./mock/home";

// Export all services through a single client
export const apiClient = {
  home: homeService,
  blog: blogService,
  article: articleService
};



export type ApiClient = typeof apiClient;
