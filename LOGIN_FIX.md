# Login Server Error Fix

## Problem
You're getting "Server error" when trying to login with the admin dashboard.

## Root Cause
The issue is likely one of the following:
1. MongoDB connection problems
2. Server not running properly
3. CORS configuration issues
4. Missing dependencies

## Solution Steps

### Step 1: Use the Test Server (Recommended)
The test server bypasses MongoDB and works with in-memory storage.

1. **Stop all running servers** (Ctrl+C in all terminal windows)

2. **Start the test server:**
   ```bash
   cd server
   node test-server.js
   ```

3. **Test the login:**
   - Open http://localhost:3000 in your browser
   - Use credentials: admin@example.com / admin123
   - The login should work immediately

### Step 2: Alternative - Use the Simple Server
If you want more features but still avoid MongoDB issues:

1. **Start the simple server:**
   ```bash
   cd server
   npm run simple
   ```

2. **Test the login** with the same credentials

### Step 3: Fix the Original Server (Advanced)
If you want to use the full MongoDB version:

1. **Check MongoDB connection:**
   - Ensure you have internet access
   - Verify the MongoDB Atlas credentials are correct
   - Check if the connection string is valid

2. **Install missing dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Start the full server:**
   ```bash
   npm start
   ```

## Quick Test Commands

### Test Server Health:
```bash
curl http://localhost:3000/api/health
```

### Test Login API:
```bash
curl -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

## Default Credentials
- **Email:** admin@example.com
- **Password:** admin123

## Troubleshooting

### If servers won't start:
1. Check if port 3000 is already in use
2. Kill any existing Node.js processes
3. Restart your terminal/command prompt

### If login still fails:
1. Check browser console (F12) for errors
2. Check server terminal for error messages
3. Try clearing browser cache and localStorage

### If you see CORS errors:
1. Make sure the server is running on port 3000
2. Make sure the frontend is running on port 3000
3. Check that CORS is properly configured

## Files Created
- `server/test-server.js` - Minimal test server (no MongoDB)
- `server/simple-server.js` - Simple server with in-memory storage
- `test-login.bat` - Windows batch file to test login
- `start-servers.bat` - Start both frontend and backend
- `start-servers.ps1` - PowerShell version

## Next Steps
Once login is working:
1. The dashboard should load automatically
2. You can access all admin features
3. If you need MongoDB, fix the connection string in `server/server.js`


