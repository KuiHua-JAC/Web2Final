const express = require("express");
const router = express.Router();
const routeRoot = "/";
const model = require("./carModelMongoDb.js");
const logger = require("../logger.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");

/**
Handles HTTP GET requests to the '/new' endpoint to add a new car to the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.post("/new", handleHttpNewRequest);
async function handleHttpNewRequest(request, response) {
  try {
    let newCar = {
      make: request.query.Make,
      model: request.query.Model,
      year: request.query.Year,
    };
    await model.addCar(newCar.make, newCar.model, newCar.year);
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
router.get("/show", handleHttpShowRequest);
async function handleHttpShowRequest(request, response) {
  try {
    let foundCar = await model.getSingleCar(
      request.params.Make,
      request.params.Model,
      request.params.Year
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
      response.send("Getting a car failed." + err.message);
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
    let carArray = await model.getAllCars();
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
router.delete("/delete", handleHttpDeleteRequest);
async function handleHttpDeleteRequest(request, response) {
  try {
    let deleteCar = {
      make: request.params.Make,
      model: request.params.Model,
      year: request.params.Year,
    };

    if (await model.deleteSingleCar(deleteCar)) {
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
router.put("/updateMake", handleHttpUpdateMakeRequest);
async function handleHttpUpdateMakeRequest(request, response) {
  let updateCar = {
    make: request.params.Make,
    model: request.params.Model,
    year: request.params.Year,
  };
  const { newMake } = request.body;
  try {
    if (await model.updateCarMake(updateCar, newMake)) {
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
router.put("/updateModel", handleHttpUpdateModelRequest);
async function handleHttpUpdateModelRequest(request, response) {
  let updateCar = {
    make: request.params.Make,
    model: request.params.Model,
    year: request.params.Year,
  };
  const { newModel } = request.body;
  try {
    if (await model.updateCarModel(updateCar, newModel)) {
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
router.put("/updateYear", handleHttpUpdateYearRequest);
async function handleHttpUpdateYearRequest(request, response) {
  let updateCar = {
    make: request.params.Make,
    model: request.params.Model,
    year: request.params.Year,
  };
  const { newYear } = request.body;
  try {
    if (await model.updateCarYear(updateCar, newYear)) {
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
