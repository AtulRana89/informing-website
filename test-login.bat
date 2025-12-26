@echo off
echo Testing Login Functionality
echo.

echo 1. Starting test server...
start "Test Server" cmd /k "cd server && node test-server.js"

echo 2. Waiting for server to start...
timeout /t 3 /nobreak > nul

echo 3. Testing health endpoint...
curl http://localhost:3000/api/health

echo.
echo 4. Testing login endpoint...
curl -X POST http://localhost:3000/api/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"

echo.
echo Test completed. Check the results above.
pause


