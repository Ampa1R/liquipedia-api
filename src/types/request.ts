export type RequestHeaders = {
  acceptEncoding?: "gzip" | "compress" | "deflate" | "br" | "identity" | "*";
  userAgent?: string;
};

export type RequestOptions = {
  url: string;
  headers?: RequestHeaders;
};

export type Response = {
  parse: {
    displaytitle: string;
    text: {
      "*": string;
    };
    title: string;
    pageid: number;
  };
};

export default interface RequestClient {
  get(request: RequestOptions): Promise<Response>;
}
