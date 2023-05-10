// Kui Hua's code
////////////////////////////////
const {
  getCarReviewCollection,
  getCarCollection,
  getUserCollection,
} = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");
const MIN_SCORE = 0,
  MAX_SCORE = 5;

/**
 * Adds a new document to the collection, which is a car review that contains a title, description and score. A car and a username is associated with it, to make
 * sure that a valid user is posting the post, and about a relevent car.
 * @param {string} userName is the name of the user that is posting the post.
 * @param {string} title is the title of the review (car model being reviewed)
 * @param {string} description is the review of the car
 * @param {object} car is the object representation of the car getting reviewed.
 * @param {string} type is the type of car post being added
 * @param {int} score represents the score of the car being reviewed
 * @return the review object if successful, otherwise
 * @throws {DatabaseError,InvalidInputError} if the document could not be added or if the input is invalid (duplicate title or non existing car/type)
 */
async function addCarReview(userName, title, description, score, car, type) {
  validateUtils.isValid(title, description, score, MIN_SCORE, MAX_SCORE);

  // Makes sure there is no duplicate title in the database already
  if (await getCarReviewCollection().findOne({ title: title }))
    throw new InvalidInputError(
      "Cannot add post: Title already in the database"
    );

  if (await !getUserCollection().findOne({ username: userName }))
    // Make sure the user exists in the database
    throw new DatabaseError("Cannot post a review without being a valid user");

  // Make sure the car exists in the database
  if (
    await !getCarCollection().findOne({
      make: car.make,
      model: car.model,
      year: car.year,
    })
  )
    throw new DatabaseError("Cannot post a review of a non-existing car");

  let carToAdd = getCarReviewCollection().insertOne({
    title: title,
    description: description,
    score: score,
    username: userName,
    car: car,
    type: type,
  });

  if (!carToAdd)
    throw new DatabaseError("Database error: Could not add the car review");
  return { title: title, description: description, score: score };
}

/**
 * Gets one car review that matches the given score.
 * @param {number} score - The score of the car review.
 * @returns {object} - The car review document (which can be used as an object to access the fields).
 * @throws {InvalidInputError} - If the score given is out of range.
 * @throws {DatabaseError} - If the document could not be found.
 */
async function getSingleCarReview(title) {
  try {
    if (validator.isEmpty(titleOfUpdate, { ignore_whitespace: true }))
      //Makes sure the title is not empty
      throw new InvalidInputError("Car review title must not be empty");

    let carDocument = await getCarReviewCollection().findOne({ title: title });
    if (!carDocument) throw new DatabaseError("Could not find the car review");

    return carDocument;
  } catch (e) {
    logger.warn("Error while trying to get a car review" + e.message);
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for getting a car with title ${title}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while getting a car with title ${title}: ${e.message}`
      );
    else throw e;
  }
}

/**
 * Gets all the pokemons from the database
 * @returns An arrray of objects containing all the pokemons of the database
 * @throws {DatabaseError} if there is no cars in the database
 */
async function getAllCarReviews() {
  let carCollectionArray = await getCarReviewCollection().find().toArray();
  if (carCollectionArray.length == 0)
    throw new DatabaseError("No car reviews were found");
  return carCollectionArray;
}

/**
 * Updates the first matched car review in the database with new properties.
 * @param {string} titleOfUpdate - The title of the car review to update.
 * @param {number} newScore - The new score of the car review.
 * @param {string} newDescription - The new description of the car review.
 * @param {string} newTitle - The new title of the car review.
 * @returns {boolean} - True if the update was successful.
 * @throws {DatabaseError,InvalidInputError} if the update was not successful or if the input was invalid
 */
async function updateOneCarReview(
  titleOfUpdate,
  newScore,
  newDescription,
  newTitle
) {
  try {
    if (validator.isEmpty(titleOfUpdate, { ignore_whitespace: true }))
      //Makes sure the title is not empty
      throw new InvalidInputError("Car review title must not be empty");

    validateUtils.isValid(
      newTitle,
      newDescription,
      newScore,
      MIN_SCORE,
      MAX_SCORE
    );

    // Makes sure there is no duplicate title in the database already
    if (await getCarReviewCollection().findOne({ title: title }))
      throw new InvalidInputError(
        "Cannot edit post title: Title already in the database"
      );

    // Updates one car review score based on the title of the review
    let updatedDocument = await getCarReviewCollection().updateOne(
      { title: titleOfUpdate },
      {
        $set: { score: newScore, title: newTitle, description: newDescription },
      }
    );

    // Checks if there is a car that has been updated. Throws an error if it didn't
    if (updatedDocument.matchedCount == 0)
      throw new DatabaseError(`Update ${titleOfUpdate} failed.`);

    return true;
  } catch (e) {
    logger.warn(
      `Error while trying to update a car review with ${titleOfUpdate} of new score ${newScore}` +
        e.message
    );
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for updating car ${titleOfUpdate} to new score ${newScore}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while updating car ${titleOfUpdate} to new score ${newScore}: ${e.message}`
      );
    else throw e;
  }
}

/**
 * Deletes the first car review that matches input
 * @param {string} titleToDelete is the title of the car review to be deleted
 * @return {boolean} true if the car review was deleted successfully
 * @throws {DatabaseError,InvalidInputError}} if the car review was not deleted successfully or if the input was invalid
 */
async function deleteOneCarReview(titleToDelete) {
  try {
    if (validator.isEmpty(titleToDelete, { ignore_whitespace: true }))
      //Makes sure the title is not empty
      throw new InvalidInputError("Car review title must not be empty");
    let carDelete = await getCarReviewCollection().deleteOne({
      title: titleToDelete,
    });

    // Means no car reviews were deleted
    if (carDelete.deletedCount == 0)
      throw new DatabaseError(`Delete ${titleToDelete} failed.`);
    return true;
  } catch (e) {
    logger.warn(`Error while deleting ${titleToDelete}: ${e.message}`);
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for deleting car ${titleToDelete}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while deleting car ${titleToDelete}: ${e.message}`
      );
    else throw e;
  }
}

module.exports = {
  addCarReview,
  updateOneCarReview,
  getSingleCarReview,
  deleteOneCarReview,
  getAllCarReviews,
};
