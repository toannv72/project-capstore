// src/utils/dateUtils.js
import moment from "moment";

export const DateOfBirth = (current) => {
  const minAge = 18;
  const maxAge = 100;
  const minDate = moment().subtract(maxAge, "years");
  const maxDate = moment().subtract(minAge, "years");

  return current && (current < minDate || current > maxDate);
};
