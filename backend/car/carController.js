const express = require("express");
const router = express.Router();
const routeRoot = "/";
const carModel = require("./carModel.js");
const logger = require("../logger.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");

// TODO update all the documentation to make sure that every endpoint is handled properly
// TODO maybe have a local database taht would contain all the makes of each cars, so that no random brand could be added?
/**
Handles HTTP GET requests to the '/new' endpoint to add a new car to the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.post("/car", handleHttpNewRequest);
async function handleHttpNewRequest(request, response) {
  try {
    const { make, model, year } = request.body;
    let newCar = await carModel.addCar(make, model, year);
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
Handles HTTP GET requests to the '/show' endpoint to find a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/show/:make/:model/:year", handleHttpShowRequest);
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
Handles HTTP GET requests to the '/showAll' endpoint to find all cars in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/showAll", handleHttpShowAllRequest);
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
Handles HTTP GET requests to the '/delete' endpoint to delete a single car from the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.delete("/delete/:make/:model/:year", handleHttpDeleteRequest);
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
  } catch (err) {
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
Handles HTTP GET requests to the '/updateMake' endpoint to update the make of a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/updateMake/:make/:model/:year", handleHttpUpdateMakeRequest);
async function handleHttpUpdateMakeRequest(request, response) {
  let updateCar = {
    make: request.params.make,
    model: request.params.model,
    year: request.params.year,
  };
  const { newMake } = request.body; // TODO make this a rquest parameter
  try {
    if (await carModel.updateCarMake(updateCar, newMake)) {
      response.status(200);
      response.send({
        message: "The car's make has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating car make failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update car make failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update car make failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update car make failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update car make failed. Unexpected error occured " + err.message,
      });
    }
  }
}

/**
Handles HTTP GET requests to the '/updateModel' endpoint to update the model of a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/updateModel/:make/:model/:year", handleHttpUpdateModelRequest);
async function handleHttpUpdateModelRequest(request, response) {
  let updateCar = {
    make: request.params.Make,
    model: request.params.Model,
    year: request.params.Year,
  };
  const { newModel } = request.body;
  try {
    if (await carModel.updateCarModel(updateCar, newModel)) {
      response.status(200);
      response.send({
        message: "The car's model has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating car model failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update car model failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update car model failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update car model failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update car model failed. Unexpected error occured " + err.message,
      });
    }
  }
}

/**
Handles HTTP GET requests to the '/updateYear' endpoint to update the year of a single car in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/updateYear/:make/:model/:year", handleHttpUpdateYearRequest);
async function handleHttpUpdateYearRequest(request, response) {
  let updateCar = {
    make: request.params.Make,
    model: request.params.Model,
    year: request.params.Year,
  };
  const { newYear } = request.body;
  try {
    if (await carModel.updateCarYear(updateCar, newYear)) {
      response.status(200);
      response.send({
        message: "The car's year has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating car year failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update car year failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update car year failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update car year failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update car year failed. Unexpected error occured " + err.message,
      });
    }
  }
}

module.exports = {
  handleHttpNewRequest,
  handleHttpDeleteRequest,
  handleHttpShowAllRequest,
  handleHttpShowRequest,
  handleHttpUpdateMakeRequest,
  handleHttpUpdateModelRequest,
  handleHttpUpdateYearRequest,
  router,
  routeRoot,
};
