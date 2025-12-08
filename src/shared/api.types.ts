export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: IApiError;
  meta?: IResponseMeta;
}

export interface IApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}

export interface IResponseMeta {
  timestamp: string;
  requestId?: string;
  version?: string;
}

export interface IApiSuccessResponse<T> extends IApiResponse<T> {
  success: true;
  data: T;
  message?: string;
  errorCode?: string;
}
