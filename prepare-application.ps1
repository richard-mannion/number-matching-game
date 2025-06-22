Push-Location .\game-engine 
npm install 
npm run build 
npm link
Pop-Location
Push-Location .\matching-game 
npm install 
npm link game-engine
Pop-Location