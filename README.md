# Number Matching Game

# Linux

## Simple Start
Navigate to the repository root and runn the following to build and ad the prerequisites:

`./prepare-application.sh`

Then to start the application run:

`./start.sh`

A web page will open in your default browser and you can play the game.

Please note that for ease of development, this project used `npm link` which means that you will idealy clean up the symlinks afterwards by running:

`./cleanu-up.sh`

## Starting Manually

1. Navigate to the game engine folder
2. Install the npm packages
3. Build it
4. Define a symlink.  
5. Navigate to the website folder
6. Install the npm packages
7. Set up the symlink to the game-engine project
8. Start the game 

```bash
cd game-engine
npm install
npm run build
npm link
cd ../matching-game 
npm install 
npm link game-engine
npm run start
```

### Cleanup

if you wish to clean up manually, you will need to run the following in each project folder after completion

`npm unlink game-engine`