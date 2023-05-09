const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const { DatabaseError } = require("./error/DatabaseError.js");
const logger = require("./logger.js");

var db;
var carReviewCollection, userCollection, carCollection;
var client;
/**
 * Kui Hua's code
 * Initializes a database if not already existing then connects to it. Depending on the reset flag, the existing collection will either be used or dropped and recreated.
 * @param {string} dbName The name of the database to connect to/initialize if not already existing
 * @param {string} url The address of the database to connect to
 * @throws {DatabaseError} if any error occurs during initialization/connection
 */
async function initialize(dbName, url) {
  try {
    client = new MongoClient(url); // store connected client for use while the app is running
    await client.connect();
    logger.info("Connected to MongoDb");
    db = client.db(dbName); // connects to the mongo database

    carReviewCollection = await createCollection("carReview");
    userCollection = await createCollection("users");
    carCollection = await createCollection("cars");
  } catch (e) {
    logger.error("Error while initializing database: " + e.message);
    throw new DatabaseError(`Error while initializing database: ${e.message}`);
  }
}

/**
 * Kui Hua's code
 *  */
function getCarReviewCollection() {
  return carReviewCollection;
}

/**
 * Kui Hua's code
 *  */
async function createCollection(collectionName, resetFlag = false) {
  // Check to see if the pokemons collection exists
  collectionCursor = await db.listCollections({
    name: collectionName,
  });
  collectionArray = await collectionCursor.toArray();

  //Resets the database if flag is true. Error might happen if there is a collection with the wrong name
  if (collectionArray.length > 0 && resetFlag)
    await db.collection(collectionName).drop();

  if (collectionArray.length == 0) {
    // collation specifying case-insensitive collection
    const collation = { locale: "en", strength: 1 };
    // No match was found, so create new collection
    await db.createCollection(collectionName, {
      collation: collation,
    });
  }

  return db.collection(collectionName); // Returns the collection to have convenient access to it
}

/**
 * Closes the database connection
 */
async function close() {
  try {
    await client.close();
    logger.info("MongoDb connection closed");
  } catch (e) {
    logger.warn(e.message);
  }
}

module.exports = {
  initialize,
  getCarReviewCollection,
  close,
};
