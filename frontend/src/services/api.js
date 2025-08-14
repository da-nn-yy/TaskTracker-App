import { auth } from '../firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function to get Firebase ID token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }
  return await user.getIdToken();
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Task API methods
export const taskAPI = {
  // Get all tasks with optional filters
  getTasks: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';

    return await apiRequest(endpoint);
  },

  // Get single task by ID
  getTask: async (id) => {
    return await apiRequest(`/tasks/${id}`);
  },

  // Create new task
  createTask: async (taskData) => {
    return await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  // Update existing task
  updateTask: async (id, taskData) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  // Delete task
  deleteTask: async (id) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

// User API methods
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get user statistics
  getStats: async () => {
    return await apiRequest('/users/stats');
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};


