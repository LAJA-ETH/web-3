import validator from 'validator';
var format = require('date-format');


export const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(str);
    return true;
  }
  return false;
};

export const isEmpty = (obj) => {
  return obj === null || Object.keys(obj).length === 0 || obj.length === 0;
}

export const displayDate = (date) => {
  return format('yyyy:MM:dd hh:mm', new Date(date));
}

export const isEmail = (data) => {
  return validator.isEmail(data);
}

export const getDays = (date1, date2) => {
  let date_1 = new Date(date1);
  let date_2 = new Date(date2);
  let difference = date_1.getTime() - date_2.getTime();
  let totalDays = Math. ceil(difference / (1000 * 3600 * 24));
  return totalDays;
}