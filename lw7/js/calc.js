const typenumber = 'number';
const typestring = 'string';
const endOfSearch = 'the end of the search';
const searchOperation = 'search for operation';
const searchOperands = 'search for operands';
let numberOfOperands = 0;

function calc(string) {
  if ( typeof(string) === typestring ) {
    if ( string.split('(').length != string.split(')').length ) {
      console.log('Число открывающих скобок не совпадает с числом закрывающих!');
    } else {
      let expression = createExpressionArray(string);
      for(i = 0; i < expression.length; i++) {
        if ( isNumber(expression[i]) ) {
          expression[i] = Number(expression[i]);
        }
      }
      let result = doesIteration(expression); 
      if (result != null) {
        console.log('Результат: ');
        console.log(result);
      } else {
        console.log('Проверьте правильность введённых данных');
      }
    }
  } else {
    console.log('Введите выражение в кавычках');
  }
}

function doesIteration(expression) {
  let error = false;
  let newExpression = [];
  let runningState = null;
  let operation = null;
  let operand1 = null;
  let operand2 = null;
  let parenthesis = false;
  numberOfOperands = 0;
  let i = 0;

  error = !isOperation(expression[i])
  if (!error) {
    operation = expression[i];
    expression.shift();
    runningState = searchOperands;
    goToMaximumNesting();
    i += 1;
    if (runningState === endOfSearch) {
      chekingCloseParenthesis(expression[i], parenthesis, error);
      calculation(operation, operand1, operand2, newExpression);
      createNewExpression(newExpression, expression, i);
    } else {
      error = true;
    }
    if ((!error) && (newExpression.length > 1)) {
      result = doesIteration(newExpression);
    } else if (!error) {
        return newExpression[0];
    } else {
      return null;
    } 
    return result;
  }

  function goToMaximumNesting() {
    for (i; i < expression.length; i++) {
      if (runningState === searchOperands) {
        isOperands(expression[i]);
        if (runningState === endOfSearch) {
          break;
        }
      } else if (runningState === searchOperation ) {
        if ( isOperation(expression[i]) ) {
          operation = expression[i];
          runningState = searchOperands;
        } else {
          error = true;
        }
      } 
    }
  }

  function isOperands(symbol) {
    if (symbol === '(') {
      pushingNewExpression(parenthesis, newExpression, symbol, operation, operand1)
      runningState = searchOperation; 
    } else if ((numberOfOperands === 0) && ( typeof(symbol) === typenumber)) {
      operand1 = symbol;
      numberOfOperands = 1;
    } else if ((numberOfOperands === 1) && ( typeof(symbol) === typenumber)) {
      operand2 = symbol;
      numberOfOperands = 0;
      runningState = endOfSearch;
    } else {
      error = true;
    }
  }
}

function pushingNewExpression(parenthesis, newExpression, symbol, operation, operand1) {
  if (parenthesis) {
    newExpression.push(symbol);
  } else {
    parenthesis = true;
  }
  if (operation != null) {
    newExpression.push(operation);
    operation = null;
  }
  if (operand1 != null) {
    newExpression.push(operand1);
    operand1 = null;
    numberOfOperands = 0;
  }
}

function isOperation(symbol) {
    return ((symbol === '*') || (symbol === '/') || (symbol === '-') || (symbol === '+')) 
  }

function chekingCloseParenthesis(symbol, parenthesis, error) {
  if (parenthesis) {
    if (symbol != ')') {
      error = true;
    }
  }
}

function createNewExpression(newExpression, expression, i) {
  i += 1;
  for (i; i < expression.length; i++) {
    newExpression.push(expression[i]);
  }
}

function calculation(operation, a, b, newExpression) {
  if (operation === '+') {
    newExpression.push(a + b);
  } else if (operation === '-') {
    newExpression.push(a - b);  
  } else if (operation === '*') {
    newExpression.push(a * b);  
  } else if (operation === '/') {
    newExpression.push(a / b);  
  }
}

function isNumber(n) { 
  return !isNaN(n); 
}

function createExpressionArray(string) {
  string = string.replace(/\(/g, ' ( ');
  string = string.replace(/\)/g, ' ) ');
  string = string.replace(/\s+/g, ' ').trim();
  return string.split(' ');
}