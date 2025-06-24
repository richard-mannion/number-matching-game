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

## Project Rationale

### Introduction
I assumed that the code in this repository would be reviewed as if this code was to be maintained and deployed by a team long-term.  I tried therefore, to structure things as if it was to be used like that despite this being a small project that really did not need it.

### Language Choice
The job role for which this code was built is a front end role using Next.js so I felt that it was ideal to use a language that was directly applicable.  As such I used Typescript.  

I personally like Typescript because it gives compile time assistance with coding errors and refactoring.  The typings allow you to be more explicit about the intent of code due to the use of classes, interfaces, types and methods definitions.  Specifying that the only acceptable value for a parameter is one of two possible strings or a number or a specific class, helps significantly during the development process.  At runtime, all of these guard rails fall away because the typing is not applicable, but I prefer the development benefits provided by Typescript, especially when working in a team.

### Project Structure

Although this project could simply be a single website project, I felt that understanding how to make re-usable libraries and projects is an important skill as a developer and that I should demonstrate that.  Making a library that can be used across multiple website projects is a common requirement and so I built the engine portion this way to demonstrate that capability.  This engine could also technically speaking be re-used in other UIs but that was not explicitly requested in this coding challenge.

I used npm link because of the complexity involved in make a truly re-usable library in javascript.  If this was to be a truly re-usable library, npm link does work, but it might be better to make it a proper npm package.  For this project that would have made development difficult and I would have had to choose between npm link and a local npm repository to which the library would be published to for the changes to reflect. I felt that that would be over-engineering this project and make it harder for the reviewers to review and run this work.  You can see a properly built library by me which is available to download from NPM in my unrelated Eventstore repository in Gitlab.  Using Rush is also a good option for large Javascript mono repos sharing npm packages and local libraries, but again that would have over complicated things and so I avoided that.

### Unit Tests

When writing logic that does not use a database or dynamic external resource, I find that using unit tests helps significantly with the quality of the outputted code because you are including the testing of your work into your development process.  This code did not require me to mock out any external resources but that is also an option for code with clearly defined contracts where testing permanently changes the system under test.

It could be argued that when doing unit tests you should test the lowest level methods and then test the system as a whole, but for this game I felt that that was not always necessary.  Some of the methods I tested directly because it was easier to test them that way and others I tested from the game methods themselves because it would reduce the number of tests and still give the same level of reliability of the code.

Randomisation is always a difficult concept when needing consistent test results.  I researched a simple randomisation function that gave me the ability to test randomisation reliably.

When describing tests, I generally like a Given/When/Then style of test defintions. I did do some additional nesting in some cases when I felt it added value by co-locating these tests with related scenarios. I also named the test files to match the primary user scenarios.  I feel that it helps to group tests into logical user scenarios/actions.

### Game Engine Design

The coding challenge did not imply that database usage was required and the job being applied for is primarily a frontend role so I decided to stick with a purely local JS game engine.  If tracking of game usage was required, then either the game results would have to be sent back to the server on game completion or each action could be logged via some sort of event stream like in Google Analytics or something produced by the in-house dev team.  I saw no value in the game decision making being done server side because of the simplicity of the task and because even if this was a publicly available game there is no risk to the decision making being client side, like in a game at a gambiling house. There is no proprietary logic or business logic that needs to be hidden from the end user.  Calling a server endpoint to make the game decisions seems to be over engineering the solution although that would have demonstrated my ability to do HTTP calls to a server.  I have previously done this using libraries such as AXIOS.

Because Next.js uses React I planned this GUI to be in React as well.  At the time of designing this app, I believed that the way that React does state management, a class based game engine would break down each time the state was set and retrieved from React's state since the state would be serialised and deserialised in some way, potentially losing methods.  While writing this explanation I questioned and tested that assumption and confirmed that my assumption was incorrect and a class based implementation would have worked fine.  At the time of designing this app, based on my previous assumption, I went with a design that used a current 'game state' concept that can be easily modified, stored in state and then extracted again for display.  My assumption about the useState hook in React heavily impacted my architectural design but I am still happy with the simplicity of the design that resulted.

The coding approach I used is primarily a functional coding style. In Javascript, objects are passed into functions in a way that have a net effect of acting by reference. I decided to mutate the state in the methods rather than try and make a whole new mutated state in the method and then return it.  That can be done but because the state has sub objects that would also have the 'by reference' issue, I decided that for this use case, it would be inefficient to honour a truly functional coding philosophy.  One way of doing that would have been to serialise the game state to JSON, deserialise it, mutate it, and then return it or to pass the values into method or constructor that new'd up every object.

In React, lists of items where each item is not uniquely identified by a key, causes excessive re-paints.  As such it was ideal for the game state to identify each card uniquely.  The engine therefore defines a unique ID for each card even though that is not expressly required for the game engine itself to function.

Because the game engine is designed as a 'game state' that is mutated by methods, I named the methods for the user actions involved.  I feel that this makes the code more understandable and intuitive to use.  Code that sounds like the domain it is describing is generally easier to understand because the code and the business's language sound the same.

Because the methods in the game are so simple, I co-located the methods in a single file.  I also felt that the method names were quite self explanatory and so method definitions through comments were not required.

I only exported the methods from the game engine library that were required by the GUI to operate to hide away complexity in coding the website.

### React Design

Next.js creates a lot of scaffolding that is not required for this scenario so I went with the simplest React website possible. Making a Next.js website and then stripping out the unused content seemed unnecessary.  I also did not think that I needed server endpoints which Next.js would have provided.  If that is required I can migrate the game logic to a server and communicate over HTTP for each game action.  The GUI code would essentially be the same except that the actions would instead be async calls to an endpoint where the logic would be applied and a JSON packet of the game state would be returned.  The game state would then have to be deserialised back into Javascript objects that could then be pushed into the React state.  The game and logic would be the same but there would be extra network calls.  

I did not design out a large website with a menu system since only a single game was required.

I stuck with a design that would work on any device, from a mobile phone up to a desktop computer.  I did this because of the prevalance of mobile device usage in web portals and I felt that this was also applicable to Camplify.  

I did not end up having to do media queries in my css to make this possible as a simple flexbox layout was sufficient.  I styled the items to be generally appealing although I did not go to the nth degree with styling the buttons. Some elements of the game controls could be better layed out on the lowest resolution, including the removal of the vertical line after the score but I felt it looked good enough in most resolutions. 

There was no requirement to limit the highest number card available in the game so I left that up to the user, but at very high numbers that can cause the browser tab to hang.

### Execution
I was not sure if this code would be executed on a Windows or Linux machine so I added the documention for both.  I was also unsure if the reviewers of this code would have docker installed so I did not make a docker implementation although that would have removed the need for the person running the code to have the correct version of Node.  I created scripts to automate the setup, build and tear down of the project because it would make the use by the reviewers easier.  The inclusion on NPM link can be annoying so I tried to abstract that away. Automation is required for CI/CD pipelines and this demonstrates, to a very limited degree, my ability to do automated actions via scripts.