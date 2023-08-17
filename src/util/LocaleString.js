const LocaleString = (number) => {
  if (typeof number === "string") {
    return Number(number).toLocaleString();
  } else if (typeof number === "number") {
    return number.toLocaleString();
  }
};

export default LocaleString;
