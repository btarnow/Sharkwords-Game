const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

const CLASSES = {
  letterGuess: 'letter-guess',
};

const numWrong = 0;

// Loop over the letters in `word` and create divs.
// The divs should be appended to the section with id="word-container".
//
// Use the following template string to create each div:
// `<div class="letter-box ${letter}"></div>`
//
const createDivsForChars = (word) => {

  const wordContainer = document.querySelector('#word-container');

  for (let i=0; i < word.length; i++) {
    const letterInWord = word[i];
    const charDiv = document.createElement('div');
    charDiv.classList.add('letter-box');
    charDiv.classList.add(letterInWord);
    wordContainer.append(charDiv);
  }
  
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons".
function generateLetterButtons() {
  const lettersContainer = document.querySelector('#letter-buttons');

  for (let i = 0; i < ALPHABET.length; i++) {
    const letter = ALPHABET[i];

    const button = document.createElement('button');
    button.innerHTML = letter.toUpperCase();
    button.classList.add(CLASSES.letterGuess);
    button.dataset.letter = letter;
    lettersContainer.append(button);
  }
}

function setupGuessHandlers(word, successTracker) {
  const guessHandler = function guessHandler(clickEvent) {
    const clickedLetterEl = clickEvent.currentTarget;
    clickedLetterEl.setAttribute('disabled', true);

    const letterGuess = clickedLetterEl.dataset.letter;
    processGuess(letterGuess, word, successTracker);
  }

  const guessButtons = document.querySelectorAll('.' + CLASSES.letterGuess);
  for (let i = 0; i < guessButtons.length; i++) {
    guessButtons[i].addEventListener('click', guessHandler);
  }
}


const processGuess = (letter, word, successTracker) => {
  if (word.includes(letter)) {
    // reveal letters & increment success counter
    letterDivs = document.querySelectorAll(`.${letter}`);
    for (i=0; i < letterDivs.length; i++) {
      letterDivs[i].innerHTML = letter;
      successTracker.numFound += 1;
    }

    //  Check for victory by seeing if all of the letters in word are accounted for
    if (successTracker.numFound === successTracker.numToFind) {
      alert('Victory!\n🎉🎉🎉🎉\nRefresh to reset :)');
    }
  } else {
    numWrong += 1;
  }
    // have the letter appear in the divs for the word lines in as many spots as it is in 
  // if the letter is NOT in the word 
    // increment the numWrong by 1 (which changes the image too)
};

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  const word = 'hello';
  const successTracker = {
    numFound: 0,
    numToFind: word.length
  };

  createDivsForChars(word);

  generateLetterButtons();
  setupGuessHandlers(word, successTracker);

  // in the next lab, you will be adding functionality to handle when
  // someone clicks on a letter
})();