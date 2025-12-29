// API Configuration
//export const API_BASE_URL = 'https://informingscience.fyi';
//export const API_BASE_URL = 'https://informing-node.onrender.com';
export const API_BASE_URL = 'http://69.62.119.220:5000/api';
// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
