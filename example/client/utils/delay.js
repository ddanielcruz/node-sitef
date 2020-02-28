module.exports = milliseconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
};
