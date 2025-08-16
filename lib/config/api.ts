export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const API_ENDPOINTS = {
  CHECKIN: {
    BASE: '/api/checkin',
    SUBMIT: '/api/checkin',
    GALLERY: '/api/checkin/gallery',
    STATS: '/api/checkin/stats',
  },

  EXTERNAL: {
    SPOTIFY: 'https://api.spotify.com/v1',
    YOUTUBE: 'https://www.googleapis.com/youtube/v3',
    BANDSINTOWN: 'https://rest.bandsintown.com',
  },
} as const;

export const API_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  FORM_DATA: {
    Accept: 'application/json',
  },
  MULTIPART: {
    Accept: 'application/json',
  },
} as const;

export const API_ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access to this resource is forbidden.',
  BAD_REQUEST: 'Invalid request. Please check your input.',
  SERVER_ERROR: 'Server error. Please try again later.',
  RATE_LIMIT: 'Too many requests. Please try again later.',

  CHECKIN: {
    SUBMIT_FAILED: 'Failed to submit check-in. Please try again.',
    INVALID_SHOW: 'Please select a valid show.',
    INVALID_NAME: 'Please enter your name.',
    INVALID_PHOTO: 'Please upload a valid photo.',
    UPLOAD_FAILED: 'Failed to upload photo. Please try again.',
    DUPLICATE: 'You have already checked in to this show.',
  },
} as const;

export interface ApiResponse<T = never> {
  success: boolean;
  data?: T | undefined;
  error?: string | undefined;
  message?: string | undefined;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export const API_CONFIG = {
  TIMEOUT: {
    DEFAULT: 30000,
    UPLOAD: 60000,
    LONG: 120000,
  },

  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },

  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/webm'],
  },

  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 60,
    MAX_REQUESTS_PER_HOUR: 1000,
  },
} as const;

export const createApiResponse = <T>(
  success: boolean,
  statusCode: number,
  data?: T,
  error?: string,
  message?: string
): ApiResponse<T> => ({
  success,
  statusCode,
  data,
  error,
  message,
});

export const createApiError = (statusCode: number, message?: string): ApiError => {
  return {
    statusCode,
    message: message || API_ERROR_MESSAGES.GENERIC,
  };
};

export const isSuccessStatus = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode < 300;
};

export const getErrorMessageForStatus = (statusCode: number): string => {
  switch (statusCode) {
    case API_STATUS.BAD_REQUEST:
      return API_ERROR_MESSAGES.BAD_REQUEST;
    case API_STATUS.UNAUTHORIZED:
      return API_ERROR_MESSAGES.UNAUTHORIZED;
    case API_STATUS.FORBIDDEN:
      return API_ERROR_MESSAGES.FORBIDDEN;
    case API_STATUS.NOT_FOUND:
      return API_ERROR_MESSAGES.NOT_FOUND;
    case API_STATUS.TOO_MANY_REQUESTS:
      return API_ERROR_MESSAGES.RATE_LIMIT;
    case API_STATUS.INTERNAL_SERVER_ERROR:
    case API_STATUS.BAD_GATEWAY:
    case API_STATUS.SERVICE_UNAVAILABLE:
    case API_STATUS.GATEWAY_TIMEOUT:
      return API_ERROR_MESSAGES.SERVER_ERROR;
    default:
      return API_ERROR_MESSAGES.GENERIC;
  }
};

export const buildUrl = (
  baseUrl: string,
  params?: Record<string, string | number | boolean>
): string => {
  if (!params) return baseUrl;

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const parseApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    return createApiResponse(
      isSuccessStatus(response.status),
      response.status,
      data,
      !isSuccessStatus(response.status) ? data.error || data.message : undefined
    );
  } catch {
    return createApiResponse<T>(
      false,
      response.status,
      undefined,
      getErrorMessageForStatus(response.status)
    );
  }
};

export const API = {
  methods: API_METHODS,
  status: API_STATUS,
  endpoints: API_ENDPOINTS,
  headers: API_HEADERS,
  errors: API_ERROR_MESSAGES,
  config: API_CONFIG,
  utils: {
    createApiResponse,
    createApiError,
    isSuccessStatus,
    getErrorMessageForStatus,
    buildUrl,
    parseApiResponse,
  },
} as const;

export type ApiMethod = (typeof API_METHODS)[keyof typeof API_METHODS];
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS];
