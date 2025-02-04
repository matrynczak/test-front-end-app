# TEST FRONT APP FOR QA CANDIDATES INTERVIEWS 

Project has been built for the purposes of interview of candidates for QA roles in Sportsbook channel.

# Prerequisites 
Project needs to be run on Node v20. 
You can use NVM to switch to proper version. 

  MacOS/Linux:
### `nvm use`

  Windows:
### `nvm use 20`

## Installing and running application

To install all dependencies:

### `npm install`

After installation you can run app using:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running with Docker

You can run the app using docker-compose. 
To do this, from the root app folder run: 

### `docker-compose up`

This will run app on [http://localhost:3000](http://localhost:3000) like via manual installation and starting the application.


===============================================================

# EXERCISES FOR CANDIDATES

Note: Page reload is restoring sports list to starting state. 

1. Login using "Auto-login" button and assert user is logged in.

2. Remove second sport from list and assert item has been removed. 

3. Assert 'Football' has 3 competitions and second competition attributes are: 
 - name : 'Spanish La Liga'
 - id: 'C_2'

4. Add sport without any competition and assert item has been added to list with correct content on proper position (new sport is added as last)

5. Add sport with 2 competitions and assert item has been added to list with correct content on proper position (new sport is added as last)

6. Try to add sport with id=1 and assert form doesn't allow to add sport with id of already existing sport.