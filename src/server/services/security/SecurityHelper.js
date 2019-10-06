
function noStack(error) {
  delete error.stack;
  error.code = error.statusCode;
  return error;
}

function errorOrFalse(error, throwError = true) {
  if (throwError) {
    throw error;
  } else {
    return false;
  }
}

module.exports = {
  noStack,
  errorOrFalse
};
