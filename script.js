const words = [
    "abandon", "beacon", "candy", "dove", "eagle", "flame", "grape", "happy", "ice", "jungle",
    "kingdom", "lunar", "mango", "noble", "ocean", "petal", "quest", "river", "shadow", "train",
    "umbrella", "vivid", "whale", "basket", "yellow", "zebra", "angel", "brave", "crane", "dusk",
    "enigma", "frost", "glow", "honey", "index", "juice", "knight", "lunar", "magic", "night",
    "oasis", "pearl", "quill", "rose", "scent", "tiger", "unity", "vortex", "wind", "xray",
    "yogurt", "zoned", "atlas", "bliss", "cider", "dawn", "epoch", "flame", "gauge", "heaven",
    "irony", "jolly", "koala", "lamb", "mint", "neon", "opal", "plum", "quartz", "ruby",
    "sunset", "tango", "urban", "vogue", "wave", "xerox", "yearn", "zephyr", "aqua", "bold",
    "crisp", "dove", "edge", "forge", "grace", "hush", "ink", "jade", "kite", "leaf",
    "mist", "navy", "oak", "pale", "quilted", "rare", "stone", "tone", "urban", "vibes",
    "wisp", "yacht", "zeal", "arc", "blaze", "core", "dust", "echo", "flint", "gaze",
    "halo", "iron", "june", "kale", "lime", "moss", "nest", "ore", "peach", "quail",
    "ridge", "snow", "tide", "use", "vow", "window", "xmas", "yoga", "zoo", "amber",
    "breeze", "clover", "drift", "enjoy", "flame", "grin", "hatch", "icicle", "jazz", "knack",
    "latch", "mocha", "nail", "open", "pale", "quiz", "rust", "sail", "tide", "ugly",
    "vowed", "wool", "xenon", "yawned", "zone", "awe", "belt", "charm", "dome", "elixir",
    "fawn", "gala", "hop", "inc", "june", "knot", "lump", "moon", "noon", "opal",
    "pier", "quiver", "ride", "stare", "twin", "unit", "vase", "wax", "yolk", "zoom",
    "arrow", "brick", "cloud", "dune", "eagle", "frost", "grip", "haze", "ignite", "jacket",
    "lure", "mesh", "nest", "ogre", "puff", "quilt", "rave", "swoop", "track", "urge",
    "view", "windy", "yell", "zen", "bolt", "clip", "deep", "echo", "flare", "gaze",
    "heron", "iris", "jolt", "key", "lily", "mint", "nook", "olive", "plow", "quill",
    "rust", "sage", "tick", "uniform", "vibe", "whip", "yarn", "zoomed", "art", "blow",
    "core", "dove", "eagle", "foam", "gloom", "hand", "ice", "joke", "knee", "loaf",
    "melt", "note", "open", "pale", "quill", "roar", "slug", "tear", "urge", "blank",
    "wait", "yawn", "zinc"
]; //list of words to be used in the typing test

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped = ''; //stores all the characters typed by the user
let currentCharIndex = 0; //index of the current character to be typed
let errors = 0; //number of typing errors
let longText = generateLongText(); //generate the long text once
let timeLeft = 60;
let timerInterval;
let typingStarted = false; //flag to check if typing has started

// Shuffle the words array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { //starting from the end of the array, we increment down until we reach 0
        const j = Math.floor(Math.random() * (i + 1)); //get a random index from 0 to i and turn that random number into a whole number
        [array[i], array[j]] = [array[j], array[i]]; //swap elements at index i and j using destructuring assignment
    }
    return array;
}

// Combine shuffled words into one long string with spaces
function generateLongText() {
    const shuffledWords = shuffleArray([...words]); //create a copy of the words array and shuffle it
    return shuffledWords.join(' '); //join the words into a single string with spaces
}

// Start countdown timer
function startTimer() {
    if (!typingStarted) {
        typingStarted = true; //set the flag to true to indicate typing has started
        timerInterval = setInterval(() => {
            timeLeft--; //decrement the time left
            timerElement.textContent = `Time left: ${timeLeft}s`; //update the timer display
            if (timeLeft <= 0) {
                clearInterval(timerInterval); //stop the timer
                endTest();
            }
        }, 1000);
    }
}

// End the typing test and show final score
function endTest() {
    timerElement.textContent = 'Time is up!';
    finalScoreElement.textContent = `Final WPM: ${calculateWPM()}`;
    textContainer.style.display = 'none'; //hide the text container
    tryAgainButton.style.display = 'block'; //show the try again button
}

// Calculate words per minute with error adjustment
function calculateWPM() {
    const wordsTyped = totalTyped.trim().split(/\s+/).length; //count the number of words typed
    const baseWPM = Math.round((wordsTyped / 60) * 60);
    const adjustedWPM = Math.max(baseWPM - errors, 0);
    return adjustedWPM;
}

// Handle typing over the displayed text and scrolling
document.addEventListener('keydown', (e) => { //listen for keydown events
    startTimer(); //start the timer on the first key press

    if (e.key === 'Backspace') { //if the backspace key is pressed
        if (totalTyped.length > 0) { //if there are characters to delete
            currentCharIndex = Math.max(currentCharIndex - 1, 0); //move back one character index, but not below 0
            totalTyped = totalTyped.slice(0, -1); //remove the last character from totalTyped
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { //if a regular character key is pressed
        totalTyped += e.key; //add the typed character to totalTyped
        currentCharIndex++; //move to the next character index
    }

    const textArray = longText.split(''); //split the long text into an array of characters
    textContainer.innerText = ''; //clear the text container

    errors = 0; //reset errors for this render

    for (let i = 0; i < textArray.length; i++) { //loop through each character in the text}
        const span = document.createElement('span'); //create a span element for each character
        
        if (i < totalTyped.length) { //if the character has been typed
            if (totalTyped[i] === textArray[i]) { //if the typed character matches the original
                span.classList.add('correct'); //mark it as correct
            } else {
                span.classList.add('error'); //mark it as an error
                errors++; //increment the error count
            }
        }

        span.textContent = textArray[i]; //set the span's text to the character
        textContainer.appendChild(span); //add the span to the text container
    }

    // Scroll the container only after 20 characters
    if (totalTyped.length >= 20) { 
        const scrollAmount = (totalTyped.length - 20) * 14;
        textContainer.scrollLeft = scrollAmount; //scroll the text container horizontally
    }
});

// Reset the test 
function resetTest() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    finalScoreElement.textContent = '';
    textContainer.style.display = 'block';
    tryAgainButton.style.display = 'none';
    totalTyped = '';
    typingStarted = false;
    currentCharIndex = 0;
    errors = 0;
    textContainer.scrollLeft = 0;
    longText = generateLongText();
    init();
}

// Initialize the test
function init() {
    if (isMobileDevice()) {
        showMobileMessage();
    } else {
        textContainer.textContent = longText;
        timerElement.textContent = `Time left: ${timeLeft}s`;
    }
}

// Try again button listener
tryAgainButton.addEventListener('click', resetTest);

// Detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

// Show message for mobile users
function showMobileMessage() {
    textContainer.textContent = 'This typing test is designed for desktop use only';
}

// Startup
init();