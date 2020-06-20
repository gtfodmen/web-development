function CheckNumber(num) {
  (num > 1)
  ? prime = true
  : prime = false;
  for (i = 2; (i < num) && (prime); i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }
  if (prime) {
    return `Result: ${num} is prime number`;
  } else {
    return `Result: ${num} is not prime number`;
  }
} 

function isPrimeNumber(variable) {
  const typenumber = 'number';
  const typearray = 'object';
  if ( typeof(variable) === typenumber) {
    variable = [variable];
  }
  
  if (( typeof(variable) != typearray ) || ( variable.some(value => typeof(value) != typenumber) ) || (variable.length < 1)) {
    console.log('Проверьте введённые данные');
  } else {
    for (let number of variable) {
      console.log( CheckNumber(number) );
    } 
  }  
}