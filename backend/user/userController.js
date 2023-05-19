////Aymeric Code
const express = require("express");
const router = express.Router();
const routeRoot = "/";
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("./userModel.js");
const logger = require("../logger.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");


async function checkCredentials(username, password) {
  const user = await userModel.getSingleUserByUsername(username);
  const encryptedPassword = user.password;

  return await bcrypt.compare(password, encryptedPassword);
}

async function handleHttpregisterUser(request, response) {
  try {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const isAdmin = request.body.isAdmin ? request.body.isAdmin : false;

    if (username && password && email && firstName && lastName) {
      if (validator.isEmail(email)) {
          if (validator.isStrongPassword(password)) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await userModel.addUser(email, hashedPassword, firstName, lastName, username, isAdmin); //already checking if username is unique in addUser
            response.status(200);
            response.send({ success: true });
            return;
          } else {
            console.log("Unsucceful registration: Password not strong enough.");
            response.status(400);
            response.send({ errorMessage: "Password not strong enough." });
            return;
          }
      } else {
        console.log("Unsucceful registration: Invalid email.")
        response.status(400);
        response.send({ errorMessage: "Invalid email" });
        return;
      }
    } else { 
      console.log("Unsucceful registration: Empty username, email, name or password."); 
      response.status(400);
      response.send({ errorMessage: "Empty username, email, name or password." });
      return;
    }
  } catch (error) { 
    console.log("Unsucceful registration: " + error);
    response.status(400);
    response.send({ errorMessage: "Unsucceful registration: " + error });
    return;
  }

  response.send({ success: false })
}

/**
Handles HTTP POST requests to the '/user' endpoint to add/register a new user to the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.post("/user", handleHttpregisterUser);

/**

Handles HTTP GET requests to the '/show' endpoint to find a single user in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/user/:username", handleHttpShowRequest);
async function handleHttpShowRequest(request, response) {
  try {
    let foundUser = await userModel.getSingleUserByUsername(
      request.params.username
    );
    response.status(200);
    response.send(foundUser);
  } catch (err) {
    logger.error("Getting a user failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting a user failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({ errorMessage: "Getting a user failed." + err.message });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Getting a user failed. (Unexpected)" + err.message,
      });
    }
  }
}
/**

Handles HTTP GET requests to the '/showAll' endpoint to find all users in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.get("/user", handleHttpShowAllRequest);
async function handleHttpShowAllRequest(request, response) {
  try {
    let userArray = await userModel.getAllUsers();
    response.status(200);
    response.send(userArray);
  } catch (err) {
    logger.error("Get all users failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Getting all users failed." + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Getting all users failed." + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Getting all users failed. Unexpected error occurred" + err.message,
      });
    }
  }
}
/**

Handles HTTP DELETE requests to the '/delete' endpoint to delete a single user from the database.

@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.delete("/delete/:username", handleHttpDeleteRequest);
async function handleHttpDeleteRequest(request, response) {
  try {
    if (await userModel.deleteSingleUser(request.params.username)) {
      response.status(200);
      response.send({ message: "The user has been successfully deleted" });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Deleting user failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Deleting user failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Deleting user failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Deleting user failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Deleting user failed. Unexpected error occurred " + err.message,
      });
    }
  }
}

/**

Handles HTTP PUT requests to the '/updateName' endpoint to update the name of a single user in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/updateName/:username", handleHttpUpdateNameRequest);
async function handleHttpUpdateNameRequest(request, response) {
  const { newName: newUsername } = request.body;
  try {
    if (await userModel.updateUserName(request.params.userName, newUsername)) {
      response.status(200);
      response.send({
        message: "The user's name has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating user name failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update user name failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update user name failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update user name failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update user name failed. Unexpected error occurred " + err.message,
      });
    }
  }
}
/**

Handles HTTP PUT requests to the '/updateEmail' endpoint to update the email of a single user in the database.
@param {Object} request - The HTTP request object.
@param {Object} response - The HTTP response object.
*/
router.put("/updateEmail/:username", handleHttpUpdateEmailRequest);
async function handleHttpUpdateEmailRequest(request, response) {
  const { newEmail } = request.body;
  try {
    if (await userModel.updateUserEmail(request.params.username, newEmail)) {
      response.status(200);
      response.send({
        message: "The user's email has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating user email failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update user email failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update user email failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update user email failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update user email failed. Unexpected error occurred " + err.message,
      });
    }
  }
}

//TODO add secrutity and ask to provide current password and check if it is valid
/**
 * Handles HTTP PUT requests to the '/updatePassword' endpoint to update the password of a single user in the database.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
router.put("/updatePassword/:username", handleHttpUpdatePasswordRequest);
async function handleHttpUpdatePasswordRequest(request, response) {
  const { newPassword } = request.body;
  try {
    if (
      await userModel.updateUserPassword(request.params.username, newPassword)
    ) {
      response.status(200);
      response.send({
        message: "The user's password has been successfully updated",
      });
    } else {
      response.status(500);
      response.send({
        errorMessage: "Updating user password failed: " + err.message,
      });
    }
  } catch (err) {
    logger.error("Update user password failed: " + err);
    if (err instanceof DatabaseError) {
      response.status(500);
      response.send({
        errorMessage: "Update user password failed: " + err.message,
      });
    } else if (err instanceof InvalidInputError) {
      response.status(400);
      response.send({
        errorMessage: "Update user password failed: " + err.message,
      });
    } else {
      response.status(500);
      response.send({
        errorMessage:
          "Update user password failed. Unexpected error occurred " +
          err.message,
      });
    }
  }
}

module.exports = {
  handleHttpNewRequest: handleHttpregisterUser,
  handleHttpDeleteRequest,
  handleHttpShowAllRequest,
  handleHttpShowRequest,
  handleHttpUpdateNameRequest,
  handleHttpUpdateEmailRequest,
  handleHttpUpdatePasswordRequest,
  router,
  routeRoot,
  checkCredentials
};
