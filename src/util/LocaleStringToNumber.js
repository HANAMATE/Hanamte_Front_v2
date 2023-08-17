const LocaleStringToNumber = (number) => {
  return parseInt(number.replace(/,/g, ""), 10);
};

export default LocaleStringToNumber;
