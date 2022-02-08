import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Game } from 'src/types/dota/games';
import { Response } from 'src/types/request';

export class Request {
  private request: AxiosInstance;

  constructor(
    game: Game,
    userAgent: string,
    baseURL = 'https://liquipedia.net',
  ) {
    this.request = axios.create({
      baseURL: `${baseURL}/${game}`,
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
  }

  async get(url: string, config?: AxiosRequestConfig<any>): Promise<Response> {
    const response = await this.request.get<Response>(
      `/api.php?action=parse&origin=*&format=json&page=${url}`,
      config,
    );
    return response.data;
  }
}
