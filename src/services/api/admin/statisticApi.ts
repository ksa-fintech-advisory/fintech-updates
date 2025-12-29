export interface CreateStatisticDto {
  value: string;
  labelEn: string;
  labelAr: string;
  icon?: string;
  order?: number;
  active?: boolean;
}

export interface UpdateStatisticDto extends Partial<CreateStatisticDto> {}

class AdminStatisticApiService {
  private baseUrl = '/api/admin/statistics';

  async getStatistics(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  }

  async getStatisticById(id: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistic');
    }
    return response.json();
  }

  async createStatistic(data: CreateStatisticDto): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create statistic');
    }

    return response.json();
  }

  async updateStatistic(id: string, data: UpdateStatisticDto): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update statistic');
    }

    return response.json();
  }

  async deleteStatistic(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete statistic');
    }
  }
}

export const adminStatisticApiService = new AdminStatisticApiService();
