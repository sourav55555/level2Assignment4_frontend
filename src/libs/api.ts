/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api-client.ts

// import { cookies } from "next/headers";
import Cookies from 'js-cookie'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  requiresAuth?: boolean;
  cookieStore?: any; // For server-side cookie handling
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function request<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache = 'no-cache',
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
    credentials: 'include',
    };
  const cookieStore = Cookies.get('better-auth');
  console.log(cookieStore)

  // Add cookie header for server-side requests
  if (cookieStore) {
    config.headers = {
      ...config.headers,
      Cookie: cookieStore.toString(),
    };
  }

  // Add body for non-GET requests
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
    }
    console.log(config, "config")

  try {
    const response = await fetch(`${baseURL}${endpoint}`, config);

    // Parse response
    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        error: data?.message || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}

export async function getRequest<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
  return request<T>(endpoint, { ...options, method: 'GET' });
}

export async function postRequest<T>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method'>) {
  return request<T>(endpoint, { ...options, body, method: 'POST' });
}

export async function putRequest<T>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method'>) {
  return request<T>(endpoint, { ...options, body, method: 'PUT' });
}

export async function patchRequest<T>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method'>) {
  return request<T>(endpoint, { ...options, body, method: 'PATCH' });
}

export async function deleteRequest<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>) {
  return request<T>(endpoint, { ...options, method: 'DELETE' });
}