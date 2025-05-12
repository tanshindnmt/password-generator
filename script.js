const resultEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('copy');

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const messageEl = document.getElementById('status-message');

    if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
        resultEl.value = '';
        messageEl.textContent = '';
        return;
    }

    // Random scramble duration between 500ms - 1500ms
    const scrambleDuration = Math.floor(Math.random() * 1000) + 500;

    messageEl.textContent = 'Finding the best password...';

    let scrambleInterval;
    let scrambleTime = 0;
    scrambleInterval = setInterval(() => {
        resultEl.value = randomScramble(length);
        scrambleTime += 100;
        if (scrambleTime >= scrambleDuration) {
            clearInterval(scrambleInterval);
            resultEl.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
            messageEl.textContent = 'Done!';

            // Add shake animation
            resultEl.classList.add('shake');

            // Remove shake after animation completes
            setTimeout(() => {
                resultEl.classList.remove('shake');
            }, 500);
        }
    }, 100);
});


function randomScramble(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]=<>/,.';
    let scramble = '';
    for (let i = 0; i < length; i++) {
        scramble += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return scramble;
}


copyEl.addEventListener('click', () => {
    const password = resultEl.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
});

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
const modeToggle = document.getElementById('mode-toggle');

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        modeToggle.textContent = '🌙';
    } else {
        modeToggle.textContent = '☀️';
    }
});
