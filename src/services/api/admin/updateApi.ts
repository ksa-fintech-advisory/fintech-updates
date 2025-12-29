export interface CreateUpdateDto {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  date: string;
  publishedAt?: string;
  featured?: boolean;
  slug: string;
}

export interface UpdateUpdateDto extends Partial<CreateUpdateDto> {}

class AdminUpdateApiService {
  private baseUrl = '/api/admin/updates';

  async getUpdates(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch updates');
    }
    return response.json();
  }

  async getUpdateById(id: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch update');
    }
    return response.json();
  }

  async createUpdate(data: CreateUpdateDto): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create update');
    }

    return response.json();
  }

  async updateUpdate(id: string, data: UpdateUpdateDto): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update update');
    }

    return response.json();
  }

  async deleteUpdate(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete update');
    }
  }
}

export const adminUpdateApiService = new AdminUpdateApiService();
