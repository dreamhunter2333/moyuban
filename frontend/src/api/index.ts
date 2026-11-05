const API_BASE = import.meta.env.VITE_API_BASE || '';

export interface HolidayInfo {
  date: string;
  template: string;
}

export interface MoyuResponse {
  message: string;
  holidays: HolidayInfo[];
}

export const api = {
  async getMoyuMessage(day?: number, showSalary = true): Promise<string> {
    const params = new URLSearchParams();
    if (day) params.set('day', String(day));
    if (!showSalary) params.set('show_salary', 'false');
    const query = params.toString();
    const url = `${API_BASE}/api/moyu${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch moyu message');
    }
    return response.text();
  },

  async generateToken(length: number = 16): Promise<string> {
    const response = await fetch(`${API_BASE}/api/genereate_token?length=${length}`);
    if (!response.ok) {
      throw new Error('Failed to generate token');
    }
    return response.json();
  },
};
