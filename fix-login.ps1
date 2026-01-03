Write-Host "========================================" -ForegroundColor Green
Write-Host "    FIXING LOGIN SERVER ERROR" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Starting test server..." -ForegroundColor Yellow
Set-Location server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node test-server.js"

Write-Host "Step 2: Waiting for server to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "Step 3: Testing server health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -UseBasicParsing
    Write-Host "Server is running: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Server health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 4: Testing login API..." -ForegroundColor Yellow
try {
    $body = @{
        email = "admin@example.com"
        password = "admin123"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing
    Write-Host "Login test successful: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Login test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    INSTRUCTIONS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. The test server should now be running" -ForegroundColor White
Write-Host "2. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "3. Login with: admin@example.com / admin123" -ForegroundColor White
Write-Host "4. The login should work now!" -ForegroundColor Green
Write-Host ""
Write-Host "If you see any errors above, please report them." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


