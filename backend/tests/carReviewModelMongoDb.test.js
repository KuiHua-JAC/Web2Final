const { InvalidInputError } = require("../models/InvalidInputError");
const { DatabaseError } = require("../models/DatabaseError");
const { MongoMemoryServer } = require("mongodb-memory-server");
const model = require("../models/carReviewModelMongoDb");
const db = "carReview_db_test";
const logger = require("../logger");
require("dotenv").config();

jest.setTimeout(5000);
/* Data to be used to generate random car reviews for testing*/
const carReviewData = [
  {
    title: "Toyota Highlander 2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 1,
  },
  {
    title: "Toyota Highlander Limited 2019",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 5,
  },
  {
    title: "Audi A4 Komfort",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 5,
  },
  {
    title: "Audi RSQ8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 5,
  },
  {
    title: "Audi e-Tron",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 5,
  },
  {
    title: "Audi s6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    score: 5,
  },
];

let mongod;

beforeAll(async () => {
  // This will create a new instance of "MongoMemoryServer" and automatically start it
  mongod = await MongoMemoryServer.create();
  logger.info("Mock Database started");
});

afterAll(async () => {
  await mongod.stop(); // Stop the MongoMemoryServer
  logger.info("Mock Database stopped");
});

/** Since a carReview can only be added to the DB once, we have to splice from the array. */
const generatecarReviewData = () =>
  carReviewData.splice(Math.floor(Math.random() * carReviewData.length), 1)[0];

/**  Runs before each test to make sure that the database is empty but ready */
beforeEach(async () => {
  try {
    const url = mongod.getUri();
    await model.initialize(db, true, url);
  } catch (err) {
    logger.error(err.message);
  }
});

afterEach(async () => {
  try {
    await model.close();
  } catch (err) {
    logger.error(err.message);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SUCCESS TEST CASES (the tests work individually, but when together, they fail since there's no connection)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Can add a car review to DB", async () => {
  const { title, description, score } = generatecarReviewData();
  await model.addCarReview(title, description, score);

  // Gets the data from the database
  const cursor = await model.getCollection().find();
  const results = await cursor.toArray();

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(1);

  expect(results[0].title.toLowerCase() == title.toLowerCase()).toBe(true);
  expect(
    results[0].description.toLowerCase() == description.toLowerCase()
  ).toBe(true);
  expect(results[0].score == score).toBe(true);
});

test("Can read a car review in DB", async () => {
  const { title, description, score } = generatecarReviewData();

  // Inserts the car review in the database
  await model.getCollection().insertOne({
    title: title,
    description: description,
    score: score,
  });

  // Gets the data from the database
  const carReview = await model.getSingleCarReviewByScore(score);

  expect(carReview.title.toLowerCase() == title.toLowerCase()).toBe(true);
  expect(carReview.description.toLowerCase() == description.toLowerCase()).toBe(
    true
  );
  expect(carReview.score == score).toBe(true);
});

test("Can update a car review in DB", async () => {
  const { title, description, score } = generatecarReviewData();
  const newScore = 3;

  // Inserts the car review in the database
  const collection = model.getCollection();

  await collection.insertOne({
    title: title,
    description: description,
    score: score,
  });

  // Changes the car review's score to the new score
  await model.updateOneCarReview(title, newScore);

  // Gets the data from the database
  const cursor = await model.getCollection().find();
  const results = await cursor.toArray();

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(1);

  expect(results[0].title.toLowerCase() == title.toLowerCase()).toBe(true);
  expect(
    results[0].description.toLowerCase() == description.toLowerCase()
  ).toBe(true);
  expect(results[0].score == newScore).toBe(true);
});

test("Can delete a car review from DB", async () => {
  const { title, description, score } = generatecarReviewData();

  // Inserts the car review in the database
  await model.getCollection().insertOne({
    title: title,
    description: description,
    score: score,
  });

  // Deletes the car review from the database
  await model.deleteOneCarReview(title);

  // Gets the data from the database
  const cursor = await model.getCollection().find();
  const results = await cursor.toArray();

  // Checks if there is an array of data that matches in length with the data sent in
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBe(0);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FAILURE TEST CASES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("Adding an empty title review to the database should fail and throw an error", async () => {
  try {
    await model.addCarReview(" ", "description", 4);
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding an empty description review to the database should fail and throw an error", async () => {
  try {
    await model.addCarReview("title", " ", 4);
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding a score review outside of bounds (positive) to the database should fail and throw an error", async () => {
  try {
    await model.addCarReview("title", "description", 409);
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding a score review outside of bounds (negative) to the database should fail and throw an error", async () => {
  try {
    await model.addCarReview("title", "description", -409);
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Adding a score review outside of bounds (negative) to the database should fail and throw an error", async () => {
  try {
    await model.addCarReview("title", "description", -409);
  } catch (error) {
    expect(error instanceof InvalidInputError).toBe(true);
  }
});

test("Trying to delete a review with a title that doesn't have the same capitalization in database should not throw an error", async () => {
  let errorFlag = false;
  try {
    await model.addCarReview("Toyota Highlander 2022", "description", 4);
    await model.deleteOneCarReview("Toyota HIGHLANDER 2022");
  } catch (error) {
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(false);
});

test("Trying to delete a review with a title that doesn't exist in database should throw an error", async () => {
  let errorFlag = false;
  try {
    await model.deleteOneCarReview("Toyota HIGHLANDER 2022");
  } catch (error) {
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});

test("Trying to update a review with a title that doesn't exist in database should  throw an error", async () => {
  let errorFlag = false;
  try {
    await model.updateOneCarReview("Toyota HIGHLANDER 2022", 3);
  } catch (error) {
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});

test("Trying to update a review with an invalid title in database should throw an error", async () => {
  let errorFlag = false;
  try {
    await model.updateOneCarReview("", 3);
  } catch (error) {
    if (error instanceof InvalidInputError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});

test("Trying to update a review with an invalid score in database should throw an error", async () => {
  let errorFlag = false;
  try {
    await model.updateOneCarReview("Toyota HIGHLANDER 2022", 333333333);
  } catch (error) {
    if (error instanceof InvalidInputError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});

test("Trying to delete a review with an invalid title in database should  throw an error", async () => {
  let errorFlag = false;
  try {
    await model.deleteOneCarReview("Toyota HIGHLANDER 2022");
  } catch (error) {
    if (error instanceof DatabaseError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});

test("Trying to read a review with an invalid score in database should  throw an error", async () => {
  let errorFlag = false;
  try {
    await model.getSingleCarReviewByScore(34);
  } catch (error) {
    if (error instanceof InvalidInputError) errorFlag = true;
  }
  expect(errorFlag).toBe(true);
});
