// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock chat service
export const articleService = {
  async paginateArticles(page:number, limit:number){
    
  },


  getOneArticle(id:string){
    
  }
};
