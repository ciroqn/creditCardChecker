// Note the functions are peppered with log statements for readability. PROJECT ONGOING...

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];
const mystery6 = [8, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, mystery6];

// Function to validate credit cards. The original credit card number/array is not mutated, but separated into two arrays to be tested by Luhn:
const validateCred = arr => {
  let luhnAlgArr = [];
  let toBeDoubled = [];
  // create new array:
  for (let i = arr.length-1; i >= 0; i-=2) {
    luhnAlgArr.push(arr[i]);
  }
  console.log('Combine this:');
  console.log(luhnAlgArr);
  console.log('\n');
  for (let i = arr.length-2; i >= 0; i-=2) {
    toBeDoubled.push(arr[i]);
  }
  let doubledArr = toBeDoubled.map(num => {
    return 2*num;
  });
  for (let i = 0; i < doubledArr.length; i++) {
    if (doubledArr[i] > 9) {
      doubledArr[i] -= 9;
    }
  };
  console.log('\n');
  console.log('...with this:');
  console.log(doubledArr);
  console.log('\n');
  // Combine luhnAlgArr and doubledArr:
  let finalArr = [...luhnAlgArr, ...doubledArr];
  console.log(finalArr);
  let sum = finalArr.reduce((currentValue, accumulator) => {
    return currentValue + accumulator;
  });
  if (sum % 10 === 0) {
    return 'This card is valid.';
  } else {
    return 'This card is invalid.';
  }
};

// Finding invalid cards using the batch array. More efficient than checking one-by-one:
const findInvalidCards = nestedArr => {
  let nestedInvalidCards = [];
  for (let i = 0; i < nestedArr.length; i++) {
    console.log(nestedArr[i]);
    let result = validateCred(nestedArr[i]);
    if (result === 'This card is invalid.') {
      nestedInvalidCards.push(nestedArr[i]);
    }
  };
  return nestedInvalidCards;
};

// This function returns an array of banks that have issued invalid credit card numbers. The array only includes each bank once, rather than inlcuding one bank 
// more than once. The function also provides the user with the number of instances that the source of the invalid CC is unkown.
const idInvalidCardCompanies = nestedArr => {
  let invalidSource = [];
  let counter = 0;
  for (let i = 0; i < nestedArr.length; i++) {
    let companyId = nestedArr[i][0];
    console.log(companyId);
    if (companyId === 3) {
      if (!invalidSource.includes('Amex')) {
        invalidSource.push('Amex');
      }
    } else if (companyId === 4) {
      if (!invalidSource.includes('Visa')) {
        invalidSource.push('Visa');
      }
    } else if (companyId === 5) {
      if (!invalidSource.includes('Mastercard')) {
        invalidSource.push('Mastercard');
    }
    }
   else if (companyId === 6) {
      if (!invalidSource.includes('Discover')) {
        invalidSource.push('Discover');
      }
   } else if (companyId < 3 || companyId > 6) {
     counter++;
   }
  }
  const grammarTernary = (counter > 1) ? "were ":"was ";
  console.log("There " + grammarTernary  + counter + " instance(s) of 'source of invalid card unknown'");
  return invalidSource;
};

// If array has 'string numbers' and needs to be converted to type 'number' using parseInt() function:
const convertStringToNums = arr => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
  }
  return arr;
};


