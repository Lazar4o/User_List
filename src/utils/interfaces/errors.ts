export interface ApiError {
  response: {
    status: number | string;
  };
}

export interface RegectedApiError {
  status: number;
  message: string;
}
