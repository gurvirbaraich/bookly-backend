module.exports = function isDeepFalse(...variables) {
  if (variables.length < 1) {
    return true;
  }

  const output = variables.map((variable) => {
    if (typeof variable !== "object") {
      if (
        variable == undefined ||
        variable == null ||
        variable == NaN ||
        variable == false
      ) {
        return true;
      }
    }

    if (typeof variable === "object") {
      const keys = Object.keys(variable);

      if (keys.length < 1) {
        return true;
      }

      return isDeepFalse(...Object.values(variable));
    }
  });

  return output.filter((out) => out === true).length > 0 ? true : false;
};
