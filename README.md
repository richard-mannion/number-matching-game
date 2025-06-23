# Number Matching Game

# Environment Setup

To run this game, you will need to have the lts version of node.js and npm installed on your system.  The easiest way to do this is to install it via NVM.  This will also allow you to swap back to your original version of node if you have a different version for your other projects.

1. Install NVM
2. Install the lts version of node

## Download Instructions

| Operating System | URL |
| -- | -- |
| Linux | https://github.com/nvm-sh/nvm |
| Windows | https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows |


# Running the Game

## Linux

### Simple Start
Navigate to the repository root and run the following to build and add the prerequisites:

`./prepare-application.sh`

Then to start the application run:

`./start.sh`

A web page will open in your default browser and you can play the game.

Please note that for ease of development, this project used `npm link`, which means that you will ideally clean up the symlinks afterwards by running:

`./cleanu-up.sh`

### Starting Manually

1. Navigate to the game engine folder
2. Install the npm packages
3. Build it
4. Define a symlink 
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

#### Cleanup

If you wish to clean up manually, you will need to run npm unlink in each project folder after completion and remove the link from the global npm repository.

```PowerShell
npm unlink game-engine
npm rm --global game-engine
```

## Windows

### Simple Start
Navigate to the repository root and run the following to build and add the prerequisites:

`.\prepare-application.ps1`

Then to start the application run:

`.\start.ps1`

A web page will open in your default browser and you can play the game.

Please note that for ease of development, this project used `npm link`, which means that you will ideally clean up the symlinks afterwards by running:

`.\cleanu-up.sh`

### Starting Manually

1. Navigate to the game engine folder
2. Install the npm packages
3. Build it
4. Define a symlink 
5. Navigate to the website folder
6. Install the npm packages
7. Set up the symlink to the game-engine project
8. Start the game 

```PowerShell
cd game-engine
npm install
npm run build
npm link
cd ../matching-game 
npm install 
npm link game-engine
npm run start
```

#### Cleanup

If you wish to clean up manually, you will need to run npm unlink in each project folder after completion and remove the link from the global npm repository.


```PowerShell
npm unlink game-engine
npm rm --global game-engine
```