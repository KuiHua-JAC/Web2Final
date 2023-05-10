///Aymeric Code

const { getUserCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");

/**
 * Adds a new document to the collection, which is a user that contains an email, password, first name, last name, username and isAdmin.
 * @param {string} email is the email of the user
 * @param {string} password is the password of the user
 * @param {string} firstName is the first name of the user
 * @param {string} lastName is the last name of the user
 * @param {string} username is the username of the user
 * @param {boolean} isAdmin is the user an admin?
 * @return the user object if successful, otherwise
 * @throws {DatabaseError,InvalidInputError} if the document could not be added or if the input is invalid
 * @throws {InvalidInputError} if there is an invalid input
 */
async function addUser(
  email,
  password,
  firstName,
  lastName,
  username,
  isAdmin
) {
  validateUtils.isValid(
    email,
    password,
    firstName,
    lastName,
    username,
    isAdmin
  ); //no need to throw errors here as the method is already throwing errors if there is bad input

  //Valid username, but we dont want duplicate. Check if already in database.
  //Cannot check in the validateUtils.js file as this require a database connection
  if (!((await getUserCollection().findOne({ username: username })) == null))
    throw new InvalidInputError(
      "The user " + username + " is already in the database"
    );

  const newUser = {
    email: email,
    password: password,
    firstname: firstName,
    lastname: lastName,
    username: username,
    isadmin: isAdmin,
  };

  try {
    await getUserCollection().insertOne(newUser);

    return newUser;
  } catch (error) {
    throw new DatabaseError(
      "There was an error while inserting the data in the database: " +
        error.message
    );
  }
}

/**
 * Retrieves a single user document from the database based on the user's email.
 * @param {string} email - The email of the user.
 * @throws {Error} If no user document is found.
 * @throws {DatabaseError} If there is an error getting the user document.
 */
async function getSingleUserByEmail(email) {
  try {
    const user = await getUserCollection().findOne({ email: email });

    if (!user) {
      throw new Error("No user found");
    }
    return user;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error getting user");
  }
}

/**
 * Gets the info of a given user
 *
 * @param {string} username username of the user to get the info of
 * @returns the user object
 */
async function getSingleUserByUsername(username) {
  try {
    let user = await getUserCollection().findOne({ username: username });

    if (!user) {
      throw new Error("No user found");
    }
    return user;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error getting user");
  }
}

/**
 * Gets all users from the database.
 * @returns {Promise<Array>} - An array of all users in the database.
 * @throws {DatabaseError} - If an error occurs while getting the users from the database.
 */
async function getAllUsers() {
  try {
    const users = await getUserCollection().find({}).toArray();
    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error getting users");
  }
}

/**
 * Deletes a single user from the database.
 * @param {Object} username - The user to be deleted from the database.
 * @throws {DatabaseError} - If an error occurs while deleting the user from the database.
 * @returns true if the operation was succefull
 */
async function deleteSingleUser(username) {
  try {
    const result = await getUserCollection().deleteOne({ username: username });

    if (result.deletedCount === 0) {
      throw new Error("No user found with the given username");
    }

    return true;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error deleting user");
  }
}

/**
 * Updates the Username of a single user in the database.
 * @param {String} oldUsername - Old Username of the user to update.
 * @param {string} newusername - The new username of the user.
 * @throws {DatabaseError} - If an error occurs while updating the user in the database.
 * @returns true if the operation was succefull
 */
async function updateUserame(oldUsername, newusername) {
  validateUtils.isValidUsername(newUsername); //will throw if username is invalid

  //Valid username, but we dont want duplicate. Check if already in database
  if (!((await getUserCollection().findOne({ username: newUsername })) == null))
    throw new InvalidInputError(
      "The user " + newUsername + " is already in the database"
    );

  try {
    // Update the user's username
    const result = await getUserCollection().updateOne(
      { username: oldUsername },
      { $set: { username: newUsername } }
    );
    if (result.modifiedCount === 0) {
      throw new InvalidInputError(
        "User not found or username is the same as the current one"
      );
    }

    return result.modifiedCount;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the user");
  }
}

/**
 * Updates the email of a single user in the database.
 * @param {String} username - The username to be updated in the database.
 * @param {string} email - The new email of the user.
 * @throws {DatabaseError} - If an error occurs while updating the user in the database.
 */
async function updateUserEmail(username, email) {
  validateUtils.isValidEmail(email);
  try {
    // Update the user's username
    const result = await getUserCollection().updateOne(
      { username: username },
      { $set: { email: email } }
    );
    if (result.modifiedCount === 0) {
      throw new InvalidInputError(
        "User not found or username is the same as the current one"
      );
    }

    return result.modifiedCount;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the user");
  }
}

/**
 * Updates the password of a single user in the database.
 * @param {string} username - The user to be updated in the database.
 * @param {string} password - The new password of the user.
 * @throws {DatabaseError} - If an error occurs while updating the user in the database.
 */
async function updateUserPassword(username, password) {
  validateUtils.isValidPassword(password);

  try {
    // Update the user's username
    const result = await getUserCollection().updateOne(
      { username: username },
      { $set: { password: password } }
    );

    return true;
  } catch (err) {
    logger.fatal(err.message);
    throw new DatabaseError("Error updating the user");
  }
}

module.exports = {
  addUser,
  getSingleUserByEmail,
  getAllUsers,
  deleteSingleUser,
  getSingleUserByUsername,
  updateUserEmail,
  updateUserPassword,
  updateUserame,
};
