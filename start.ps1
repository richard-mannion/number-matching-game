
$originalLocation = Get-Location
try
{
    cd matching-game 
    npm run start
}
finally{
    Set-Location $originalLocation
}