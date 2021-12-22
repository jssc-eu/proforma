export default (event) => {
  const { email, bank } = event;

  return { // everyting is optional
    bank,
    email,
  };
};
