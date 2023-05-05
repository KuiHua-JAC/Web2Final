const express = require('express');
const router = express.Router();
const routeRoot = '/';
/**
 * Middleware function that sends a 404 status code.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
  router.get('*',handleHttpError);

function handleHttpError(request,response){
    
            response.sendStatus(404);

        
    }

module.exports={router,routeRoot,handleHttpError}

