module.exports = function (email) {
  const emailRegex =
    /([a-z]+[a-z0-9]*[_\.]?[a-z0-9]+)@(([a-z0-9]+\.)*[a-z0-9]{2,}\.)+[a-z]{2,}/gm;

  return emailRegex.test(email);
};
