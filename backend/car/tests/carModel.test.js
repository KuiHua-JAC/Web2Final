const { DatabaseError } = require("../../error/DatabaseError.js");
const { InvalidInputError } = require("../../error/InvalidInputError.js");
const { MongoMemoryServer } = require("mongodb-memory-server");
const carModel = require("../carModel.js");
const logger = require("../../logger.js");
require("dotenv").config();

jest.setTimeout(5000);

const carData = [
    {
      make:"Audi",
      model:"R8",
      year:2019,
      trim:"Performance",
      color:"red"

    },
    {
        make:"Honda",
        model:"Civic",
        year:2022,
        trim:"Touring",
        color:"black"
    },
    {
        make:"Acura",
        model:"TL",
        year:2014,
        trim:"A-spec",
        color:"silver"
    },
    {
        make:"Ford",
        model:"F-150",
        year:2016,
        trim:"XL",
        color:"blue"
    },
    {
        make:"Tesla",
        model:"Model X",
        year:2022,
        trim:"Plaid",
        color:"white"
    },
    {
        make:"Toyota",
        model:"Rav4",
        year:2017,
        trim:"LE",
        color:"brown"
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

const generatecarData = () =>
  carData.splice(Math.floor(Math.random() * carData.length), 1)[0];


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