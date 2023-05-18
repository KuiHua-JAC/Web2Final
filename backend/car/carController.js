const express = require("express");
const router = express.Router();
const routeRoot = "/";
const carModel = require("./carModel.js");
const logger = require("../logger.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");

// TODO maybe have a local database taht would contain all the makes of each cars, so that no random brand could be added?
/**
Handles HTTP POST requests to the '/cars' endpoint to add a new car to the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.post("/cars", handleHttpNewRequest);
async function handleHttpNewRequest(request, response) {
  try {
    const { make, model, year, description, image } = request.body;
    let newCar = await carModel.addCar(make, model, year, description, image);
    response.status(200);
    response.send(newCar);
  } catch (err) {
    logger.error("Adding a new car failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Adding a car failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Adding a car failed." + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Adding a car failed. Unexpected error occured" + err.message,
      });
    }
  }
}

/**
Handles HTTP GET requests to the '/cars/:make/:model/:year' endpoint to find a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/cars/:make/:model/:year", handleHttpShowRequest);
async function handleHttpShowRequest(request, response) {
  try {
    let foundCar = await carModel.getSingleCar(
      request.params.make,
      request.params.model,
      request.params.year
    );
    response.status(200);
    response.send(foundCar);
  } catch (err) {
    logger.error("Getting a car failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting a car failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({ errorMessage: "Getting a car failed." + err.message });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Getting a car failed. (Unexpected)" + err.message,
      });
    }
  }
}

/**
Handles HTTP GET requests to the '/cars' endpoint to find all cars in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/cars", handleHttpShowAllRequest);
async function handleHttpShowAllRequest(request, response) {
  try {
    let carArray = await carModel.getAllCars();
    response.status(200);
    response.send(carArray);
  } catch (err) {
    logger.error("Get all the cars failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting all the cars failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Getting all the cars failed." + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Getting all the cars failed. Unexpected error occured" + err.message,
      });
    }
  }
}

/**
Handles HTTP GET requests to the '/cars/:make/:model/:year' endpoint to delete a single car from the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.delete("/cars/:make/:model/:year", handleHttpDeleteRequest);
async function handleHttpDeleteRequest(request, response) {
  try {
    let deleteCar = {
      make: request.params.make,
      model: request.params.model,
      year: request.params.year,
    };

    if (await carModel.deleteSingleCar(deleteCar)) {
      response.status(200);
      response.send({ message: "The car has been successfully deleted" });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Deleting car failed: " + err.message,
      });
    }
  } catch(err) {
    logger.error("Deleting car failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Deleting car failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Deleting car failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Deleting car failed. Unexpected error occured " + err.message,
      });
    }
  }
}

/**
Handles HTTP PUT requests to the '/cars/:make/:model/:year' endpoint to update a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/cars/:make/:model/:year", handleHttpUpdateRequest);
async function handleHttpUpdateRequest(request, response) {
  let updateCar = {
    make: request.params.make,
    model: request.params.model,
    year: request.params.year,
  };
  let { make, model, year, description,image } = request.body;

  let updatedCar = {
    make:make,
    model:model,
    year:year,
    description:description,
    image:image
  }

  try {
    if (await carModel.updateCar(updateCar, updatedCar)) {
      response.status(200);
      response.send({
        message: "The car has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating car failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update car failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update car failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update car failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update car failed. Unexpected error occured " + err.message,
      });
    }
  }
}

module.exports = {
  router,
  routeRoot,
};
