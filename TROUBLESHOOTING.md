# Troubleshooting Guide

## Login "Server Error" Issues

If you're experiencing "Server error" during login, follow these steps:

### 1. Check if Backend Server is Running

The most common cause is that the backend server is not running. You need to start both servers:

#### Option A: Use the provided scripts
```bash
# Windows (PowerShell)
.\start-servers.ps1

# Windows (Command Prompt)
start-servers.bat
```

#### Option B: Manual start
```bash
# Terminal 1 - Start Backend Server
cd server
npm start

# Terminal 2 - Start Frontend Server (in a new terminal)
npm start
```

### 2. Verify Server Status

Check if the backend server is running by visiting:
- http://localhost:3000/api/health
- http://localhost:3000/api/test

You should see JSON responses indicating the server is running.

### 3. Check Console for Errors

Open your browser's Developer Tools (F12) and check:
- **Console tab**: Look for network errors or JavaScript errors
- **Network tab**: Check if the login request is being made and what response is received

### 4. Common Issues and Solutions

#### Issue: "Cannot connect to server"
**Solution**: Make sure the backend server is running on port 3000

#### Issue: CORS errors
**Solution**: The server is configured to allow requests from localhost:3000. If you're using a different port, update the CORS configuration in `server/server.js`

#### Issue: MongoDB connection errors
**Solution**: Check your internet connection and MongoDB Atlas credentials

#### Issue: "Invalid credentials"
**Solution**: Use the default credentials:
- Email: admin@example.com
- Password: admin123

### 5. Default Admin Account

If no admin account exists, the server will automatically create one with:
- Email: admin@example.com
- Password: admin123

### 6. Environment Variables

The server uses these environment variables (optional):
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: JWT signing secret (default: auto-generated)
- `MONGODB_URI`: MongoDB connection string

### 7. Debug Mode

To enable debug logging, check the browser console and server terminal for detailed error messages.

### 8. Network Issues

If you're behind a corporate firewall or using a VPN, ensure:
- Port 3000 is accessible
- MongoDB Atlas is accessible
- No proxy settings are blocking the requests

### 9. Reset Everything

If all else fails:
1. Stop all servers
2. Clear browser cache and localStorage
3. Restart both servers
4. Try logging in again

### 10. Contact Support

If you continue to experience issues, please provide:
- Browser console errors
- Server terminal output
- Steps to reproduce the issue

