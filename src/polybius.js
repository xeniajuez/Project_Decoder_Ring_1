// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // you can add any code you want within this function scope

  // *************** MAIN *******************

  function polybius(input, encode = true) {
    // your solution code here
    // here are 2 matrices with dev functions used instead of hardcording the keys

    const keys = {
      alphaKey: createKey("alpha"), 
      coordKey: createKey("coord"), 
    }; 

    const output = input 
    .split(" ")
    .map((word) => toIterateWord(word, encode, keys))
    .join(" "); 
    
    // to ensure if any words resolved to boolean false, to return only false 
    return output.includes(false) ? false : output; 
  }

  //******************** HELPER FUNCTIONS *******************

  //to handle iteration differences between encoding and decoding
  function toIterateWord(word, encode, { alphaKey, coordKey }) {
    
    // ****** ENCODING ********* 

    if (encode)
    return word 
    .toLowerCase()
    .split("")
    .map((letter)=> toMapMatrix(letter, alphaKey, coordKey))
    .join(""); 


    // ********** DECODING ******** 

    if (word.length % 2 !== 0) return false; 
    // if it's trying to decode an odd-length word, it will output false 

    //iterate by each code, which is made of 2 characters 
    let output = "" ; 
    for (let char = 0; char < word.length; char += 2){
      const col = word[char]; 
      const row = word[char + 1]; 
      const code = `${col}${row}`; 
      output += toMapMatrix(code, coordKey, alphaKey);
    }
    
    return output; 
  }

  //to find the coodinate on fromKey that matches the inputted character
  //returns the value of toKey at the same coordinate 

  function toMapMatrix(input, fromKey, toKey){
    const coordinate = matchCoordinates(input, fromKey); 
    // finds matching coordinate in the fromKey 
    if(!coordinate) return false; //if there isn't a match on fromKey, return false(invalid)
    const row = coordinate[0]; //row is frist element 
    const col = coordinate[1]; //col is second element 
    return toKey[row][col]; //to map 
  }

  //return the array of coordinates that match the input using a 2D indexAt method
  function matchCoordinates(input, key){
    if (input === "i" || input === "j") input = "(i/j)"; // if input is i or j, it'll be treated (i/j)
    for (let row = 0; row < 5; row++)
    for (let col = 0; col < 5; col++){
    if (key[row][col] === input) return [row, col]; 
  }
  return false; // if there is not a match, return false 
}


//******************* DEV FUNCTIONS ******************* 
//************ CREATES ENCRYPTION KEY MATRICES ************** 

function createKey(type = "alpha", size = 5) {
  //matrix for the specified type and size -- to use as an encryption key
  const grid = [];
  for (let row = 0; row < size; row++) {
    const thisRow = [];
    for (let col = 0; col < size; col++) {
      type === "alpha"
        ? thisRow.push(alphaIndex(row, col, size))
        : thisRow.push(coordIndex(row, col));
    }
    grid.push(thisRow);
  }
  return grid;
}
//resolves row and col into a 1d numberline, then add 97 to make it charcode lowercase alpha
function alphaIndex(row, col, size) {
  const number = row * size + col; //row# * sizeOfMatrix + col# = numberline starting a 0
  let charCode = number + 97; //Add 97 to start from charCode "a"
  if (charCode === 105) return "(i/j)"; // i and j are merged
  const shift = charCode > 105 ? 1 : 0; //if our letter comes after "i/j", shift by 1 to account for merge
  return String.fromCharCode(charCode + shift);
}
//resolves row and col into `${col}${row}` where both start at 1 instead of zero
function coordIndex(row, col) {
  return `${col + 1}${row + 1}`;
}

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
