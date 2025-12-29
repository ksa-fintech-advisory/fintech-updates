class UpdateApiService {
  private baseUrl = '/api/updates';

  private getFullUrl(path: string): string {
    // Check if we're on the server side
    if (typeof window === 'undefined') {
      // Server-side: use full URL
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      return `${baseUrl}${path}`;
    }
    // Client-side: use relative path
    return path;
  }

  async getUpdates(params?: {
    limit?: number;
    featured?: boolean;
    lang?: string;
  }): Promise<any[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.featured) {
      searchParams.append('featured', 'true');
    }
    if (params?.lang) {
      searchParams.append('lang', params.lang);
    }

    const path = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const url = this.getFullUrl(path);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch updates');
    }
    
    return response.json();
  }

  async getUpdateBySlug(slug: string, lang?: string): Promise<any> {
    const searchParams = new URLSearchParams();
    if (lang) {
      searchParams.append('lang', lang);
    }

    const path = `${this.baseUrl}/${slug}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const url = this.getFullUrl(path);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch update');
    }
    
    return response.json();
  }
}

export const updateApiService = new UpdateApiService();
