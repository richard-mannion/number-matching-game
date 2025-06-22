
Push-Location  .\matching-game 
npm unlink game-engine
Pop-Location
Push-Location .\game-engine 
npm unlink game-engine
npm rm --global game-engine
Pop-Location