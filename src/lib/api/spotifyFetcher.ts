import { getAccessToken } from './getAccessToken';

interface IDefaultOptions {
  baseURL: string;
  headers?: HeadersInit;
  mode?: RequestMode;
  defaultParams?: Record<string, string | number>;
  interceptors: {
    request: (config: IRequestOptions) => IRequestOptions | Promise<IRequestOptions>;
    response?: (response: Response) => Response | Promise<Response>;
  };
}

interface IRequestOptions extends RequestInit {
  params?: Record<string, string | number>;
  body?: any;
}

export const fetcher = (defaultOptions: IDefaultOptions) => {
  return async (url: string, options: IRequestOptions = {}) => {
    const fullUrl = new URL(defaultOptions.baseURL + url);

    // 기본 params 추가
    if (defaultOptions.defaultParams) {
      Object.entries(defaultOptions.defaultParams).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, String(value));
      });
    }

    // 요청별 params 추가
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, String(value));
      });
    }

    const requestOptions: IRequestOptions = {
      method: options.method || 'GET',
      headers: new Headers({
        ...defaultOptions.headers,
        ...options.headers,
      }),
      mode: defaultOptions.mode,
      ...options,
    };

    // 요청 인터셉터
    const processedOptions = await defaultOptions.interceptors.request(requestOptions);

    // POST 요청 처리
    if (processedOptions.method === 'POST' && processedOptions.body) {
      processedOptions.headers = new Headers(processedOptions.headers);
      processedOptions.headers.set('Content-type', 'application/json');
      processedOptions.body = JSON.stringify(processedOptions.body);
    }

    try {
      let response = await fetch(fullUrl, processedOptions);

      // 응답 인터셉터
      if (defaultOptions.interceptors.response) {
        response = await defaultOptions.interceptors.response(response);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status : ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
};

export const spotifyFetcher = fetcher({
  baseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_URL!,
  headers: {
    'Content-Type': 'application/json',
  },
  defaultParams: {
    locale: 'ko_KR',
  },
  interceptors: {
    request: async (config) => {
      const token = await getAccessToken();
      config.headers = new Headers(config.headers);
      config.headers.set('Authorization', `Bearer ${token}`);
      return config;
    },
  },
});
