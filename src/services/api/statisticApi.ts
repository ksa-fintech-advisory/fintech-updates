class StatisticApiService {
  private baseUrl = '/api/statistics';

  private getFullUrl(path: string): string {
    if (typeof window === 'undefined') {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      return `${baseUrl}${path}`;
    }
    return path;
  }

  async getStatistics(lang?: string): Promise<any[]> {
    const searchParams = new URLSearchParams();
    if (lang) {
      searchParams.append('lang', lang);
    }

    const path = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const url = this.getFullUrl(path);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    
    return response.json();
  }
}

export const statisticApiService = new StatisticApiService();
