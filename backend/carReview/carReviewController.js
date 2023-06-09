// Kui Hua's code
////////////////////////////////
const model = require("./carReviewModel.js");
const express = require("express");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const router = express.Router();
const routeRoot = "/";
const logger = require("../logger.js");
const {authenticateUser, RefreshSession} = require("../session/sessionController.js");

// CREATE
/**
 * Method that handles post request to add a new car review to the database based on the request body received to then provide an appropriate response
 * @param {object} request: Expect a post request expecting a body with 3 parameters: title,description,score
 * @param {object} response" Send 200 on successful add, 400 on input error and 500 on database related error
 */
router.post("/reviews", async (request, response) => {
  // Takes the title,description,score in the request body JSON
  const { title, description, score, username, type, car } = request.body;
  try {
    RefreshSession(request, response);

    let carReview = await model.addCarReview(
      username,
      title,
      description,
      score,
      car,
      type
    );
    response.status(200);

    // Sends a response to confirm that the car review has been added
    response.send(carReview);
  } catch (err) {
    logger.error("Create new car review failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Adding a car review failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Adding a car review failed." + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Adding a car review failed. Unexpected error occured" + err.message,
      });
    }
  }
});

// READ ONE
/**
 * Method that handles get request to read a car review by the score specified in the request parameters to then provide an appropriate response
 * @param {object} request: Expect a post request expecting a parameter of: score
 * @param {object} response" Send 200 on successful read, 400 on input error and 500 on database related error
 */
router.get("/reviews/:title", async (request, response) => {
  let title = request.params.title;

  try {
    RefreshSession(request, response);

    let carReview = await model.getSingleCarReview(title);
    response.status(200);

    // Sends a successful read with the car review found for the given score
    response.send(carReview);
  } catch (err) {
    logger.error("Get a car review failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting a car review failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send("Getting a car review failed." + err.message);
    } else {
      response.status(500);
      response.send({
        errorMessage: "Getting a car review failed. (Unexpected)" + err.message,
      });
    }
  }
});

// READ ALL
/**
 * Method that handles get request to read all car reviews to then provide an appropriate response
 * @param {object} request: Expect a post request without any parameters
 * @param {object} response" Send 200 on successful read all, 400 on input error and 500 on database related error
 */
router.get("/reviews", async (request, response) => {
  try {
    RefreshSession(request, response);

    let carReviewArray = await model.getAllCarReviews();
    response.status(200).send(carReviewArray);;
    return;
  } catch (err) {
    logger.error("Get all car review failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting all car review failed." + err.message,
      });
      return;
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Getting all car review failed." + err.message,
      });
      return;
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Getting all car review failed. Unexpected error occured" +
          err.message,
      });
      return;
    }
  }
});

// UPDATE ONE
/**
 * Method that handles put request to update a car review's score to then provide an appropriate response
 * @param {object} request: Expect a post request with one parameter: title and a body with the new score
 * @param {object} response" Send 200 on successful put, 400 on input error and 500 on database related error
 */
router.put("/reviews/:title", async (request, response) => {
  const title = request.params.title;

  // Takes the score in the request body JSON
  const { newTitle, score, description } = request.body;
  try {
    RefreshSession(request, response);

    if (await model.updateOneCarReview(title, score, description, newTitle)) {
      response.status(200);
      response.send({ message: "Car review updated successfully" });
    }
    // Means that the update did not happen/failed
    else {
      response.status(500);
      response.send({
        errorMessage: "Update car review failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update car review failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update car review failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update car review failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update car review failed. Unexpected error occured " + err.message,
      });
    }
  }
});

// DELETE ONE
/**
 * Method that handles delete request to delete a car review to then provide an appropriate response
 * @param {object} request: Expect a post request with one parameter: title of the car review to delete
 * @param {object} response" Send 200 on successful delete, 400 on input error and 500 on database related error
 */
router.delete("/reviews/:title", async (request, response) => {
  let title = request.params.title;

  try {
    RefreshSession(request, response);

    if (await model.deleteOneCarReview(title)) {
      response.status(200);
      response.send({ message: "Car review deleted successfully" });
    }
    // Means that the update did not happen/failed
    else {
      response.status(500);
      response.send({
        errorMessage: "Deleting car review failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Deleting car review failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Deleting car review failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Deleting car review failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Deleting car review failed. Unexpected error occured " + err.message,
      });
    }
  }
});

module.exports = {
  router,
  routeRoot,
};
