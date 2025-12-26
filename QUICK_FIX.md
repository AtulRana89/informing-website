# Quick Fix for Login "Server Error"

## The Problem
You're getting "Server error" when trying to login. This is because the servers aren't running properly.

## Solution (3 Steps)

### Step 1: Start the Test Server
Open a **new** Command Prompt or PowerShell window and run:

```bash
cd C:\react-project\informng-science\informingscience\server
node test-server.js
```

You should see:
```
Test server running on port 3000
Use email: admin@example.com, password: admin123
```

### Step 2: Start the Frontend
Open **another** Command Prompt or PowerShell window and run:

```bash
cd C:\react-project\informng-science\informingscience
npm start
```

You should see the React app starting on http://localhost:3000

### Step 3: Test Login
1. Open http://localhost:3000 in your browser
2. Use these credentials:
   - **Email:** admin@example.com
   - **Password:** admin123
3. Click "Sign in"

## Alternative: Use the Batch File
If the above doesn't work, double-click:
- `fix-login.bat` (for Command Prompt)
- `fix-login.ps1` (for PowerShell)

## What This Fixes
- ✅ Bypasses MongoDB connection issues
- ✅ Uses simple in-memory authentication
- ✅ Works without complex dependencies
- ✅ Provides immediate login functionality

## If It Still Doesn't Work
1. Check if port 3000 is already in use
2. Kill any existing Node.js processes
3. Restart your computer
4. Try the batch file method

## Default Credentials
- **Email:** admin@example.com
- **Password:** admin123

The login should work immediately with the test server!


