# Update Railway CLIENT_URL to new Vercel deployment

Write-Host "Updating Railway CLIENT_URL..." -ForegroundColor Cyan

railway variables --set "CLIENT_URL=https://maasai-beadwork-ecommerce-ffr3hoqgt-eth002s-projects.vercel.app"

Write-Host "`n✅ CLIENT_URL updated!" -ForegroundColor Green
Write-Host "Railway will automatically redeploy" -ForegroundColor Yellow
