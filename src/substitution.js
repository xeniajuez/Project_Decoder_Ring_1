// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope
  //********************************** MAIN ***************************************

  function substitution(input, alphabet, encode = true) {
    // your solution code here
    try {
      workingAlphabet(alphabet);
      const alphaKey = "abcdefghijklmnopqrstuvwxyz".split("");
      const codeKey = alphabet.toLowerCase().split("");
      return input
        .toLowerCase() //ignore case
        .split(" ") //seperates the input string into an array of words
        .map(
          (word) =>
            encode
              ? createWord(word, alphaKey, codeKey) // if encoding, we're going from base alphabet to coded alphabet
              : createWord(word, codeKey, alphaKey) // else, we're going from coded to base
        )
        .join(" "); //joins the array of words back into an output string
    } catch (error) {
      //console.log(`${error}`); //uncomment this to print the error to our console for debugging
      return false; //if any words throw an error, return false
    }
  }

  //*********************************** HELPER FUNCTIONS ************************************* 

  //this iterates by word, ensuring spaces are preserved
  function createWord(word, fromKey, toKey) {
    return word
      .split("") //seperates the string(word) into an array of letters
      .map((letter) => toMap(letter, fromKey, toKey)) 
      .join(""); //joins the array of letters back into a string(word)
  }

//this finds a provided character on fromKey array, 
//then maps the input to the same index on the toKey array
  function toMap(input, fromKey, toKey) {
    const index = fromKey.indexOf(input); //finds the index of the matching character in the fromKey
    if (index === -1)
      throw new Error(`${input} not found in the provided alphabet!`);     //throw new Error() if character not found 
    return toKey[index]; 
  }

  //this ensures provided alphabet is valid
  function workingAlphabet(alphabet) {
    //Alphabet must be a string and have 26 characters 
    if (typeof alphabet !== "string")
      throw new Error(`Alphabet must be a string, and cannot be undefined!`);
    if (alphabet.length !== 26)
      throw new Error(`Alphabet must be exactly 26 characters long!`);

    //check for reused characters
    for (let char of alphabet)
      if (alphabet.indexOf(char) !== alphabet.lastIndexOf(char))
        throw new Error(`Alphabet cannot have repeated characters!`);
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
