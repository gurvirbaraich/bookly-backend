function autoDefault(variable, defaultValue = []) {
  if (!!variable) {
    return variable;
  }

  return defaultValue;
}

module.exports = autoDefault;