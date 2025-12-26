@echo off
echo ========================================
echo    FIXING LOGIN SERVER ERROR
echo ========================================
echo.

echo Step 1: Starting test server...
cd server
start "Test Server" cmd /k "node test-server.js"

echo Step 2: Waiting for server to start...
timeout /t 5 /nobreak > nul

echo Step 3: Testing server health...
curl http://localhost:3000/api/health

echo.
echo Step 4: Testing login API...
curl -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"

echo.
echo ========================================
echo    INSTRUCTIONS
echo ========================================
echo.
echo 1. The test server should now be running
echo 2. Open http://localhost:3000 in your browser
echo 3. Login with: admin@example.com / admin123
echo 4. The login should work now!
echo.
echo If you see any errors above, please report them.
echo.
pause


