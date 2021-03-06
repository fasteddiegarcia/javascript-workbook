'use strict'


// Write a JavaScript program to display the current day and time.
function CurrentDateTime() {
  return new Date();
}
console.log(CurrentDateTime());



// Write a JavaScript program to convert a number to a string.
function NumberToString(num) {
  return num.toString();
}
console.log(NumberToString(37));



// Write a JavaScript program to convert a string to the number.
function StringToNumber(nummer) {
  return parseInt(nummer);
}
console.log(StringToNumber(23));



// Write a JavaScript program that takes in different datatypes and prints out whether they are a:
// Boolean
// Null
// Undefined
// Number
// NaN
// String
function ReturnType(someData) {
  return typeof someData;
}
console.log(ReturnType(9));



// Write a JavaScript program that adds 2 numbers together.
function Addem(num1, num2) {
  return num1 + num2;
}
console.log(Addem(4,5));



// Write a JavaScript program that runs only when 2 things are true.
function TwoTrue(x,y) {
  if (x && y) {
    return "Yeah! Both things are true!";
  }
}
console.log(TwoTrue(true,true));



// Write a JavaScript program that runs when 1 of 2 things are true.
function OnlyOneisTrue(z,a) {
  if (z || a) {
    return "Booyah! Only one thing is true!";
  }
}
console.log(OnlyOneisTrue(true,false));



// Write a JavaScript program that runs when both things are not true.
function NoneTrue(b,c) {
  if (!b && !c) {
    console.log("Neither statement evaluates to true!");
  }
}
console.log(NoneTrue(false, false));
