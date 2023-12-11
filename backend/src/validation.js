const db = require('./sql-db');

exports.INVALID = -1;
exports.ADMIN = 1;
exports.USER = 0;

exports.validateCredentials = (userid, password) => {
  db.query(
    `SELECT Admin FROM Users WHERE UserID = ? AND Password = ?`,
    [userid, password],
    (err, result) => {
      if (err) {
        console.error('Error validating credentials:', err);
        return exports.INVALID;
      }

      if (result.length > 0) {
        console.log('Credentials validated');
        return result[0].Admin;
      } else {
        console.log('Invalid credentials');
        return exports.INVALID;
      }
  });
}

//characters allowed are alphanumeric, _, ., and - 
exports.validateSafeInput = (data) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (!exports.validateSafeInput(data[i])) {
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

