const { getCarReviewCollection } = require("../dbConnection.js");
const { DatabaseError } = require("../error/DatabaseError.js");
const { InvalidInputError } = require("../error/InvalidInputError.js");
const validateUtils = require("./validateUtils.js");
const validator = require("validator");
const logger = require("../logger.js");
const MIN_SCORE = 0,
  MAX_SCORE = 5;

/**
 * Adds a new document to the collection, which is a car review that contains a title, description and score.
 * @param {string} title is the title of the review (car model being reviewed)
 * @param {string} description is the review of the car
 * @param {int} score represents the score of the car being reviewed
 * @return the review object if successful, otherwise
 * @throws {DatabaseError,InvalidInputError} if the document could not be added or if the input is invalid
 */
async function addCarReview(title, description, score) {
  validateUtils.isValid(title, description, score, MIN_SCORE, MAX_SCORE);
  let carToAdd = getCarReviewCollection().insertOne({
    title: title,
    description: description,
    score: score,
  });

  if (!carToAdd)
    throw new DatabaseError("Database error: Could not add the car review");
  return { title: title, description: description, score: score };
}

/**
 * Gets one car review that matches the given score
 * @param {int} score is the score review of the car
 * @returns the car document (which can be used as an object to access the fields)
 * @throws {DatabaseError,InvalidInputError} if the document could not be found or if the score given is out of range
 */
async function getSingleCarReviewByScore(score) {
  try {
    if (score < MIN_SCORE || score > MAX_SCORE)
      throw new InvalidInputError(
        `Score must be between ${MIN_SCORE} and ${MAX_SCORE}`
      );

    let carDocument = await getCarReviewCollection().findOne({ score: score });
    if (!carDocument) throw new DatabaseError("Could not find the car review");

    return carDocument;
  } catch (e) {
    logger.warn("Error while trying to get a car review" + e.message);
    if (e instanceof InvalidInputError)
      throw new InvalidInputError(
        `Invalid input for getting a car with score ${score}: ${e.message}`
      );
    if (e instanceof DatabaseError)
      throw new DatabaseError(
        `Database error while getting a car with score ${score}: ${e.message}`
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
  let carCollectionArray = await getCarReviewCollection.find().toArray();
  if (carCollectionArray.length == 0)
    throw new DatabaseError("No car reviews were found");
  return carCollectionArray;
}

/**
 * Updates the first matched car review in the database with a new score
 * @param {string} titleOfUpdate is the title of the car review to update
 * @param {string} newScore is the new score of the car review
 * @returns {boolean} true if the update was successful
 * @throws {DatabaseError,InvalidInputError} if the update was not successful or if the input was invalid
 */
async function updateOneCarReview(titleOfUpdate, newScore) {
  try {
    if (validator.isEmpty(titleOfUpdate, { ignore_whitespace: true }))
      //Makes sure the title is not empty
      throw new InvalidInputError("Car review title must not be empty");

    //Makes sure the score is within the limits
    if (newScore < MIN_SCORE || newScore > MAX_SCORE)
      throw new InvalidInputError(
        `A valid number between ${MIN_SCORE} and ${MAX_SCORE} must be used for a score `
      );

    // Updates one car review score based on the title of the review
    let updatedDocument = await getCarReviewCollection().updateOne(
      { title: titleOfUpdate },
      { $set: { score: newScore } }
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

/**
 * Returns the collection connection so it can be used externally
 * @returns The car review collection
 */
function getCollection() {
  return getCarReviewCollection;
}

module.exports = {
  addCarReview,
  updateOneCarReview,
  getSingleCarReviewByScore,
  deleteOneCarReview,
  getAllCarReviews,
  getCollection,
};