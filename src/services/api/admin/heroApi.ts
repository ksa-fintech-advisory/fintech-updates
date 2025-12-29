export interface CreateHeroDto {
  name: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  ctaButtons: string | any[]; // JSON string or array
  active?: boolean;
}

export interface UpdateHeroDto extends Partial<CreateHeroDto> {}

class AdminHeroApiService {
  private baseUrl = '/api/admin/heroes';

  async getHeroes(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch heroes');
    }
    return response.json();
  }

  async getHeroById(id: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hero');
    }
    return response.json();
  }

  async createHero(data: CreateHeroDto): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create hero');
    }

    return response.json();
  }

  async updateHero(id: string, data: UpdateHeroDto): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update hero');
    }

    return response.json();
  }

  async deleteHero(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete hero');
    }
  }
}

export const adminHeroApiService = new AdminHeroApiService();
