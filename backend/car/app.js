const express = require('express');
const app = express();

const controllers = ['homeController', 'carController','errorController']

app.use(express.json());

/**
 * Loops through the array of controller names and attaches their routes to the app.
 * @param {string} controllerName - The name of the controller.
 * @throws {Error} Throws an error if there is an issue with importing the controller.
 */
controllers.forEach((controllerName)=>{
    try{
        const controllerRoutes = require('./controllers/'+ controllerName);
        app.use(controllerRoutes.routeRoot,controllerRoutes.router);
    }catch(error){
        console.log(error);
        throw error;
    }
})

module.exports = app;