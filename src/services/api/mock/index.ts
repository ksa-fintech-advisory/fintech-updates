// Central export for all mock services
export { articleService } from './articles';
export { blogService } from './blogs';
export { homeService } from './home';
export { contactService } from './contact';
export { aboutUsService } from './aboutUs';
export { complianceService } from './compliance';
export { guideService } from './guides';

// Export data for direct access if needed
export { articles, authors, categories } from './data/articles.data';
export { blogs, blogCategories } from './data/blogs.data';
export { homeData } from './data/home.data';
export { aboutUsData } from './data/aboutUs.data';
export { complianceUpdates, complianceRegions, complianceCategories } from './data/compliance.data';
export { guides, guideCategories } from './data/guides.data';
