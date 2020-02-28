module.exports = error => {
  const message = error.message || `Erro desconhecido (${error.name}).`;
  console.log(message, "\n");
};
