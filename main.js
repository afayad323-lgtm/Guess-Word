//setting game name
let gameName = 'Guess The Word';
document.title = gameName;
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Created By Ahmed Fayad &copy`;

//setting game option
let numberTries = 6;
let numberLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

//manage words
let wordToGuess = "";
const words = ['create', 'update','delete','master','branch','mainly','malika','school','elzero'];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector('.message');

//manage hint
document.querySelector('.hint span').innerHTML = numberOfHints;
const hintBtn = document.querySelector('.hint');
hintBtn.addEventListener('click', getHint);


function generateInput(){
    const inputContainer = document.querySelector('.inputs');

    //create main div
    for (let i=1; i<= numberTries; i++){
        const tryDiv = document.createElement('div');
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) {
            tryDiv.classList.add('disapled-inputs')
        }


        // create inputs
        for  (let j=1;j<=numberLetters;j++){
            const input = document.createElement('input');
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
            input.classList.add(`try-${i}-input`);

        }

        inputContainer.appendChild(tryDiv);

    }
            inputContainer.children[0].children[1].focus();


            //disapled inputs
            const inputsDisapled = document.querySelectorAll('.disapled-inputs input');
            inputsDisapled.forEach((input) => (input.disabled = true)) 

            //navigation 
            const inputs = document.querySelectorAll('input');

            inputs.forEach((input, index) => {
                input.addEventListener('input',function(){
                    this.value = this.value.toUpperCase();
                    const nextInput = inputs[index + 1];
                    if (nextInput) nextInput.focus();
                });

                input.addEventListener('keydown', function(event){
                    const currentIndex = Array.from(inputs).indexOf(event.target) // this
                    if (event.key === 'ArrowRight'){
                        const nextInput = currentIndex + 1;
                        if (nextInput < inputs.length) inputs[nextInput].focus();
                    }
                    if (event.key === 'ArrowLeft'){
                        const previousInput = currentIndex - 1;
                        if (previousInput >= 0) inputs[previousInput].focus();
                    }
                });

            });

}
// console.log(wordToGuess)

const guessBtn = document.querySelector('.check');
guessBtn.addEventListener('click', handleGuess);
function handleGuess(){
    let successGuess = true;
    for (let i = 1; i<= numberLetters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];

        //game logic
        if (letter === actualLetter) {
            inputField.classList.add('yes-in-place')
        }else if(wordToGuess.includes(letter) && letter !== '') {
            inputField.classList.add('not-in-place');
            successGuess = false;
        }else{
            inputField.classList.add('not');
            successGuess = false;
        }


    }

    //check if user win or lose
    if (successGuess){
        messageArea.innerHTML = `You win after ${currentTry} try, the word is <span>${wordToGuess}</span>`;
        if (numberOfHints === 2) {
        messageArea.innerHTML = `You win after ${currentTry} try,<p>Without use hint</p> the word is <span>${wordToGuess}</span>`;

        }

        let allTries = document.querySelectorAll('.inputs > div');
        allTries.forEach((tryDiv)=> tryDiv.classList.add('disapled-inputs'));
        guessBtn.disabled = true;
        hintBtn.disabled = true;
        


    }else{

        document.querySelector(`.try-${currentTry}`).classList.add('disapled-inputs');
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry}-input`);
        currentTryInputs.forEach((input)=>(input.disabled = true));
        currentTry++;
        
        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry}-input`);
        nextTryInputs.forEach((input)=>(input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if (el){
            document.querySelector(`.try-${currentTry}`).classList.remove('disapled-inputs');
            el.children[1].focus();

        }else{
            hintBtn.disabled = true;
            guessBtn.disabled = true;
            messageArea.innerHTML = `Game Over, the word is <span>${wordToGuess}</span>`
        }





    }
}

function getHint(){
    if (numberOfHints > 0){
        numberOfHints--;
        document.querySelector('.hint span').innerHTML = numberOfHints;
    }
    if (numberOfHints === 0){
        hintBtn.disabled = true;
    }

    const enabledInputs = document.querySelectorAll('input:not([disabled])');
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input)=> input.value === '');

        
    if(emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1){
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }

        
    }
}
function handleBackSpace(event){
    if (event.key === 'Backspace'){
        const inputs = document.querySelectorAll('input:not([disabled])');
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = '';
            prevInput.value = '';
            prevInput.focus();
        }
    }
}

document.addEventListener('keydown', handleBackSpace);

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click',function(){
    window.location.reload();
} )


window.onload = function(){
    generateInput();
}
