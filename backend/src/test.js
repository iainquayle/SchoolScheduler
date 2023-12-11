const {validateSafeInput} = require('./validation');

console.log(validateSafeInput("hello"));
console.log(validateSafeInput("hello;"));
