//Aymeric Code

const uuid = require ('uuid');

//This object stores the users sessions
const sessions = []

//Each session contains the username of the user and the time at which it expires
//This object can be extended to store additional protected session infromation
class Session {
    constructor (username, expiresAt) {
        this.username = username
        this.expiresAt - expiresAt
    }
    
    //used to determine if the session has expired
    isExpired() {
        this.expiresAt < (new Date())
    }
}

function createSession(username, numMinutes) {
    //Generate a random UUID as the sessionId
    const sessionId = uuid.v4();

    //Set the expiry time as numMinutes (in milliseconds) after the current time
    const expiresAt = new Date(Date.now() + numMinutes * 60000);

    //Create a session object containing information about the user and expiry time
    const thisSession = new Session(username, expiresAt);

    //Add the session information to the sessions map, using sessionId as the key
    sessions[sessionId] = thisSession;

    return sessionId;
}

function getSession(sessionID) {
    return sessions[sessionID]
}

function deleteSession(sessionId) {
    delete sessions[sessionId]
}

module.exports = {Session, createSession, getSession, deleteSession};