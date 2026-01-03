// API Configuration
//export const API_BASE_URL = 'https://informingscience.fyi';
//export const API_BASE_URL = 'https://informing-node.onrender.com';
// process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const API_BASE_URL = 'http://localhost:5000/api';
// export const API_BASE_URL = 'https://www.informingscience.fyi/api';
// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
