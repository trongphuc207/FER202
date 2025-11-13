const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const hasJson = contentType && contentType.includes('application/json');
  const data = hasJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || response.statusText);
    error.response = {
      status: response.status,
      data,
    };
    throw error;
  }

  return data;
};

export const apiClient = {
  async get(url, config = {}) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...config.headers,
      },
      ...config,
    });
    return handleResponse(response);
  },

  async post(url, body, config = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...config.headers,
      },
      body: JSON.stringify(body),
      ...config,
    });
    return handleResponse(response);
  },
};

export default apiClient;

