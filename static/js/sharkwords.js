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
  'pirate',
  'hello',
];

const CLASSES = {
  letterGuess: 'letter-guess',
};

function generateRandomWord(wordsArray) {
  const randomIndex = Math.floor((Math.random()*wordsArray.length));
  const randomWord = wordsArray[randomIndex];
  return randomWord;
}


let numWrong = 0;

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

    let isWin;

    //  Check for victory by seeing if all of the letters in word are accounted for
    if (successTracker.numFound === successTracker.numToFind) {
      isWin = true;
      endGame(word, isWin);
    }
  } else {
    numWrong += 1;

    // Update user by incrementing image`
    const imgEl = document.querySelector('#shark-img img');
    imgEl.setAttribute('src', `/static/images/guess${numWrong}.png`);

    // End game if out of guesses
    if (numWrong === 5) {
      isWin = false;
      endGame(word, isWin);
    }
  }
};

function endGame(word, isWin) {
  const endGameMsgDiv = document.querySelector('#letter-buttons');

  const msgTitle = isWin ? 'Victory 🎉🎉🎉' : 'Shark Attack 🦈';
  const msgBody = isWin ? `You found the word ${word}` : `Womp. Womp. Maybe next time. Your word was <em>${word}.</em>`;

  endGameMsgDiv.innerHTML = `
    <div>
        <h3>${msgTitle}</h3>
        <p class="msgBody">${msgBody}</p>
        <a class="msgBody" href="/sharkwords">Click here to play again</a>
    </div>
  `;

  if (isWin === false) {
    const wordContainer = document.querySelector('#word-container');
    wordContainer.innerHTML = "";
  }
}

// For comparison if you're bored
function pirateEndGame(word, isWin) {
  const guessableLetters = document.getElementById('letter-buttons');

  guessableLetters.innerHTML = '';
  guessableLetters.insertAdjacentHTML('afterend', `
    <div>
      <h3>${isWin ? 'Huzahh 🎉' : 'Shark attack!'}</h3>
      <p>${isWin ? (
        `You correctly guessed the sharks favorite word: <em>${word}</em>! You continue to be welcome in their waters 🦈`
      ) : (
        `This shark is displeased you don't know it's favorite word: <em>${word}</em>. They no longer welcome you in their waters 😢`
      )}</p>
      <p>
        ${isWin ? (
          `Uh oh, another shark appeared demanding you say it's favorite word! <a href="/sharkwords">Start Guessing!</a>`
        ) : (
          `Look another shark, maybe you'll have better luck with them! <a href="/sharkwords">Approach the shark!</a>`
        )}
      </p>
    </div>
  `);
}

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  
  const word = generateRandomWord(WORDS);
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