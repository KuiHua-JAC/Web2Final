const validator = require("validator");
const { InvalidInputError } = require("../error/InvalidInputError.js");

/**
 * Validate that the user information are valid such as not empty email and a name with only letters
 * Remarks: Will not return true or false, but will throw an excception if the user is invalid
 *
 * @param {string} email email of the user
 * @param {string} password password of the user
 * @param {string} firstName firstname of the user
 * @param {string} lastName lastname of the user
 * @param {string} userName username of the user
 * @param {boolean} isAdmin is the user an admin?
 * @throws An error if the user is invalid
 */
function validUser(email, password, firstName, lastName, userName, isAdmin) {
  isValidPassword(password);
  if (!email) throw new InvalidInputError("The email cannot be empty");
  else if (
    !firstName ||
    !validator.isAlpha(firstName) ||
    !lastName ||
    !validator.isAlpha(lastName)
  )
    throw new InvalidInputError(
      "The name cannot be empty and must only be letters"
    );
  else if (!userName)
    throw new InvalidInputError("The username cannot be empty");
  else if (!typeof isAdmin == Boolean)
    throw new InvalidInputError("isAdmin needs to be a bool");
}

/**
 * Check if an username is valid. Will not return true or false,
 * but rater will throw if the username is not valid
 *
 * @param {String} username username to check the validity of
 * @throws An error if the username is invalid
 */
function validUsername(username) {
  if (!username) throw new InvalidInputError("The username cannot be empty");
}

/**
 * Checks if the given email is valid.
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  if (!validator.isEmail(email))
    throw new InvalidInputError("The email is not valid");
}

/**
 * Checks if the given password is valid.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
function isValidPassword(password) {
  // Define the password criteria
  const minLength = 8; // Minimum password length
  const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
  const hasNumber = /[0-9]/.test(password); // At least one digit

  // Check if the password meets the criteria
  if (password.length < minLength) {
    throw new InvalidInputError("Password is too short"); // Password is too short
  }

  if (!(hasUppercase && hasLowercase && hasNumber)) {
    throw new InvalidInputError(
      "Password doesn't meet complexity requirements"
    ); // Password doesn't meet complexity requirements
  }

  return true; // Password is valid
}

module.exports = {
  isValid: validUser,
  isValidUsername: validUsername,
  isValidEmail: isValidEmail,
  isValidPassword: isValidPassword,
};
