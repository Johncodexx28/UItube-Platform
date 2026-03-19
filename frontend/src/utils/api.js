const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Enhanced fetch wrapper for the application API
 * @param {string} endpoint - The API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, headers, body)
 * @returns {Promise<any>} - Parsed JSON response or throws an error
 */
export const apiFetch = async (endpoint, options = {}) => {
  const { headers, body, ...rest } = options;
  
  // CRITICAL: Normalize URL to prevent 404s and double slashes (//)
  // Ensures the URL always has /api and no redundant slashes.
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  const response = await fetch(`${baseUrl}${cleanEndpoint}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include', // Important for sending/receiving cookies
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const api = {
  get: (url, options) => apiFetch(url, { ...options, method: 'GET' }),
  post: (url, body, options) => apiFetch(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => apiFetch(url, { ...options, method: 'PUT', body }),
  patch: (url, body, options) => apiFetch(url, { ...options, method: 'PATCH', body }),
  delete: (url, options) => apiFetch(url, { ...options, method: 'DELETE' }),
};
