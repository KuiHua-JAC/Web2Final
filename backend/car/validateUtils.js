const validator = require("validator");
let date = new Date();
const MINYEAR = 1886;
const MAXYEAR = date.getFullYear() + 1;

/**
Checks if the given car object is valid by checking its make, model, and year.
@param {string} make - The make of the car.
@param {string} model - The model of the car.
@param {number} year - The year the car was manufactured.
@returns {boolean} - Returns true if the car is valid, false otherwise.
*/
function isValidCar(make, model, year) {
  if (!isValidMake(make)) {
    throw new Error("Invalid make"); // TODO give more precise error instances (check Kui Hua's for example) where you throw like "invalidinput" or something. Also return true, that
    // way there is feedback given back to the user. Make sure to also udpate the documentation. After fixing all of this, do the same for the other methods below.
  }
  if (!isValidModel(model)) {
    throw new Error("Invalid model");
  }
  if (!isValidYear(year)) {
    throw new Error("Invalid year");
  }
}

/**
Checks if the given make is valid by checking if it is not empty and contains only alphabets.
@param {string} make - The make of the car.
@returns {boolean} - Returns true if the make is valid, false otherwise.
*/

function isValidMake(make) {
  if (!make || !validator.isAlpha(make)) {
    return false;
  } else {
    return true;
  }
}

/**
Checks if the given model is valid by checking if it is not empty and its length is between 1 and 50 characters.
@param {string} model - The model of the car.
@returns {boolean} - Returns true if the model is valid, false otherwise.
*/
function isValidModel(model) {
  if (!model || !validator.isLength(model, { min: 1, max: 50 })) {
    return false;
  } else {
    return true;
  }
}

/**
Checks if the given year is valid by checking if it is not empty, is an integer, and its value is between 1886 and the current year plus 1.
@param {number} year - The year the car was manufactured.
@returns {boolean} - Returns true if the year is valid, false otherwise.
*/
function isValidYear(year) {
  if (!year || !validator.isInt(year) || year < MINYEAR || year > MAXYEAR) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isValidCar, isValidModel, isValidYear, isValidMake };
