# Auto-Push Script for Antigravity
# Watches for file changes and auto-pushes to GitHub every 2 minutes (if there are changes)

$projectPath = "c:\Users\Dell\Desktop\Antigravity"
$checkInterval = 120  # seconds between checks

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " AUTO-PUSH is ACTIVE" -ForegroundColor Green
Write-Host " Watching: $projectPath" -ForegroundColor Gray
Write-Host " Checking every $checkInterval seconds" -ForegroundColor Gray
Write-Host " Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

while ($true) {
    Start-Sleep -Seconds $checkInterval

    Set-Location $projectPath

    # Check if there are any changes
    $status = git status --porcelain 2>&1
    
    if ($status) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host ""
        Write-Host "[$timestamp] Changes detected! Pushing to GitHub..." -ForegroundColor Yellow
        
        git add .
        git commit -m "Auto-update: $timestamp"
        $pushResult = git push 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$timestamp] Successfully pushed to GitHub & Vercel will auto-deploy!" -ForegroundColor Green
        } else {
            Write-Host "[$timestamp] Push failed: $pushResult" -ForegroundColor Red
        }
    } else {
        $timestamp = Get-Date -Format "HH:mm:ss"
        Write-Host "[$timestamp] No changes detected. Waiting..." -ForegroundColor DarkGray
    }
}
