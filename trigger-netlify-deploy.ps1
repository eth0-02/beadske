# Trigger Netlify Deploy via Build Hook
# This will force Netlify to rebuild the site with fresh Sanity data

Write-Host "🚀 Triggering Netlify deployment..." -ForegroundColor Cyan
Write-Host ""

# You need to get your build hook URL from Netlify
# Go to: Netlify Dashboard -> Site settings -> Build & deploy -> Build hooks
# Create a new hook and paste the URL below

$buildHookUrl = "YOUR_NETLIFY_BUILD_HOOK_URL_HERE"

if ($buildHookUrl -eq "YOUR_NETLIFY_BUILD_HOOK_URL_HERE") {
    Write-Host "❌ ERROR: Build hook URL not configured!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📝 To fix this:" -ForegroundColor Yellow
    Write-Host "1. Go to Netlify Dashboard" -ForegroundColor White
    Write-Host "2. Your site -> Site configuration -> Build & deploy" -ForegroundColor White
    Write-Host "3. Scroll to 'Build hooks' section" -ForegroundColor White
    Write-Host "4. Click 'Add build hook'" -ForegroundColor White
    Write-Host "5. Name: 'Manual Deploy'" -ForegroundColor White
    Write-Host "6. Branch: 'main'" -ForegroundColor White
    Write-Host "7. Copy the webhook URL" -ForegroundColor White
    Write-Host "8. Paste it in this script at line 9" -ForegroundColor White
    Write-Host ""
    Write-Host "OR manually trigger deploy:" -ForegroundColor Yellow
    Write-Host "- Go to Netlify -> Deploys -> Trigger deploy -> Clear cache and deploy site" -ForegroundColor White
    exit 1
}

try {
    $response = Invoke-RestMethod -Uri $buildHookUrl -Method Post
    Write-Host "✅ Deploy triggered successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to Netlify Dashboard -> Deploys" -ForegroundColor White
    Write-Host "2. Wait for build to complete (1-2 minutes)" -ForegroundColor White
    Write-Host "3. Open website in incognito window" -ForegroundColor White
    Write-Host "4. You'll see the updated price!" -ForegroundColor White
} catch {
    Write-Host "❌ Error triggering deploy: $_" -ForegroundColor Red
}
