const db = require('./sql-db');

//TODO: need to make a validation that allows for spaces, no quotes though and only select special characters
//as well need to make validate user have built in injection protection

exports.INVALID = -1;
exports.ADMIN = 1;
exports.USER = 0;

exports.validateUser = async (token) => {
  out = false;
  if (!this.validateInput(token.UserID) || !this.validateInput(token.Password)) {
    return out;
  }
  await db.query(
    `SELECT UserID FROM Users WHERE UserID = ? AND Password = ?`,
    [token.UserID, token.Password],
    (err, result) => {
      if (result.length > 0) {
        console.log('User validated');
        out = true;
      } else {
        console.log('Invalid user');
      }
  });
  return out;
}

exports.validateAdmin = async (token) => {
  out = false;
  if (!this.validateInput(token.UserID) || !this.validateInput(token.Password)) {
    return out;
  }
  await db.query(
    `SELECT Admin FROM Users WHERE UserID = ? AND Password = ?`,
    [token.UserID, token.Password],
    (err, result) => {
      if (result.length > 0) {
        console.log('Admin validated');
        out = result[0].Admin == 1;
      } else {
        console.log('Invalid admin');
      }
  });
  return out;
}

exports.validateInputSpaced = (data) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (!exports.validateInputSpaced(data[i])) {
        return false;
      }
    }
    return true;
  } else {
    return /^[a-zA-Z0-9\s]+$/.test(data);
  }
}

//characters allowed are alphanumeric, _, ., and - 
exports.validateInput = (data) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (!exports.validateInput(data[i])) {
        return false;
      }
    }
    return true;
  } else {
    return /[\w|_|\.|-]+$/.test(data);
  }
}

exports.validateEmailPattern = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

