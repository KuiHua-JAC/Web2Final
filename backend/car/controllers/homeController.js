const express = require('express');
const router = express.Router();
const routeRoot = '/';

/**
GET request handler for the '/home' route.
Sends a response with a welcome message to the client.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/

router.get('/home',handleHttpHomeRequest);
function handleHttpHomeRequest(request,response){
    let welcomeString="Welcome to the car collection\n";
    welcomeString+=" \n"
    welcomeString+="use /new?Make=Blank&Model=Blank&Year=Blank and replace the blanks to add a car to the database\n"
    welcomeString+=" \n"
    welcomeString+="use /show?Make=Blank&Model=Blank&Year=Blank and replace the blanks to show a car from the database\n"
    welcomeString+=" \n"
    welcomeString+="use /showAll to show all the cars from the database\n"
    welcomeString+=" \n"
    welcomeString+="use /delete?Make=Blank&Model=Blank&Year=Blank and replace the blanks to delete a car\n"
    welcomeString+=" \n"
    welcomeString+="use /updateMake?Make=Blank&Model=Blank&Year=Blank&NewMake=Blank and replace the blanks to update the make of a specific car from the database\n"
    welcomeString+=" \n"
    welcomeString+="use /updateModel?Make=Blank&Model=Blank&Year=Blank&NewModel=Blank and replace the blanks to update the model of a specific car from the database\n"
    welcomeString+=" \n"
    welcomeString+="use /updateYear?Make=Blank&Model=Blank&Year=Blank&NewYear=Blank and replace the blanks to update the year of a specific car from the database\n"
            response.send(welcomeString);

        
    }

module.exports={router,routeRoot,handleHttpHomeRequest}