// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope

  function caesar(input, shift, encode = true) {
    // your solution code here
    if (!shift || shift < -25 || shift > 25) return false; //valid shift checking 
    if (typeof input !== "string") return false; //valid input checking 

    shift *= encode ? 1 : -1; //when decoding, it'll need to shift in the opposite direction 

    return input //go through the input string and map shifted characters 
    .toLowerCase()
    .split("")
    .map((character)=> toShift(character, shift))
    .join(""); 
  }

  //HELPER FUNCTIONS that are performing the math algorithms 

  function toShift(character, shift) {
    const key = "abcdefghijklmnopqrstuvwxyz".split(""); // array of alphabet for the cipher key 
    if (!character.match(/[a-z]/)) return character;   //if the current character is not a letter, it won't be transformed 
    let index = key.indexOf(character); //to find an index number from key array 
    let indexShift = index + shift; // the new index

    // using WHILE allows the code to work for any shift number 
    while (indexShift > 25) indexShift -= 26; // wrap array 
    while (indexShift < 0) indexShift +=26; // wrap array 

    return key[indexShift]; 
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
