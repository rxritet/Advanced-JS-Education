/**
 * API Wrapper Pattern
 * Provides centralized HTTP request handling with error management
 * Reference: Ch. 3, "The Structure of a Design Pattern"
 * 
 * @author Your Name
 * @date 29.01.2026
 */

// Custom error classes for better error handling
class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class HttpError extends Error {
  constructor(status, statusText, data) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * ApiWrapper class - encapsulates fetch API logic
 */
class ApiWrapper {
  constructor(config = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 10000; // 10s default
    this.defaultHeaders = config.headers || {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Private method to handle all HTTP requests
   * @private
   */
  async _request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Setup timeout with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Request interceptor - add headers
      const config = {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      };

      // Make fetch request
      const response = await fetch(url, config);

      // Clear timeout if request completes
      clearTimeout(timeoutId);

      // Response interceptor - check HTTP status
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpError(response.status, response.statusText, errorData);
      }

      // Parse JSON response
      const data = await response.json();
      return data;

    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort (timeout)
      if (error.name === 'AbortError') {
        throw new NetworkError(`Request timeout after ${this.timeout}ms`);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new NetworkError('Network connection failed');
      }

      // Re-throw HTTP errors
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} config - Additional fetch config
   */
  async get(endpoint, config = {}) {
    return this._request(endpoint, {
      ...config,
      method: 'GET',
    });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional fetch config
   */
  async post(endpoint, data, config = {}) {
    return this._request(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional fetch config
   */
  async put(endpoint, data, config = {}) {
    return this._request(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} config - Additional fetch config
   */
  async delete(endpoint, config = {}) {
    return this._request(endpoint, {
      ...config,
      method: 'DELETE',
    });
  }

  /**
   * Set authorization token for all requests
   * @param {string} token - Bearer token
   */
  setAuthToken(token) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
}

// Create singleton instance
const api = new ApiWrapper({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// ===== Example Usage =====

// Example 1: Basic GET request
async function fetchUsers() {
  try {
    const users = await api.get('/users');
    console.log('Users:', users.slice(0, 2)); // Show first 2 users
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(`HTTP Error: ${error.status} - ${error.message}`);
    } else if (error instanceof NetworkError) {
      console.error(`Network Error: ${error.message}`);
    }
  }
}

// Example 2: POST request with data
async function createPost() {
  try {
    const newPost = await api.post('/posts', {
      title: 'API Wrapper Pattern',
      body: 'Centralizes HTTP request logic',
      userId: 1,
    });
    console.log('Created post:', newPost);
  } catch (error) {
    console.error('Failed to create post:', error.message);
  }
}

// Example 3: Request with auth token
async function fetchProtectedData() {
  // Set auth token
  api.setAuthToken('your-jwt-token-here');
  
  try {
    const data = await api.get('/posts/1');
    console.log('Protected data:', data);
  } catch (error) {
    console.error('Auth failed:', error.message);
  }
}

// Run examples
(async () => {
  console.log('=== API Wrapper Pattern Examples ===\n');
  
  await fetchUsers();
  console.log('\n---\n');
  
  await createPost();
  console.log('\n---\n');
  
  await fetchProtectedData();
})();

// Export for use in other modules
export default api;
export { ApiWrapper, NetworkError, HttpError };
