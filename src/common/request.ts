import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Game } from "src/types/games";
import { Response } from "src/types/request";

export class Request {
  private _request: AxiosInstance;

  constructor(
    game: Game,
    userAgent: string,
    baseURL: string = "https://liquipedia.net"
  ) {
    this._request = axios.create({
      baseURL: `${baseURL}/${game}`,
      headers: {
        "User-Agent": userAgent,
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
  }

  async get(url: string, config?: AxiosRequestConfig<any>): Promise<Response> {
    const response = await this._request.get<Response>(
      `/api.php?action=parse&origin=*&format=json&page=${url}`,
      config
    );
    return response.data;
  }
}
