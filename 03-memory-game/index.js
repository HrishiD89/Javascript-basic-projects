const grid = document.querySelector("#grid");
const moves = document.querySelector("#moves");
const score = document.querySelector("#score");
const dice = document.querySelector("#dice");

let scoreCount = 0;
let movesLeft = 20;
let firstCard = null; 
let secondCard = null; 
let lockBoard = false; 



const images = [
    { id: "image1", img: "https://picsum.photos/id/101/200/200", quantity: 2 },
    { id: "image2", img: "https://picsum.photos/id/102/200/200", quantity: 2 },
    { id: "image3", img: "https://picsum.photos/id/103/200/200", quantity: 2 },
    { id: "image4", img: "https://picsum.photos/id/104/200/200", quantity: 2 },
    { id: "image5", img: "https://picsum.photos/id/115/200/200", quantity: 2 },
    { id: "image6", img: "https://picsum.photos/id/106/200/200", quantity: 2 },
    { id: "image7", img: "https://picsum.photos/id/107/200/200", quantity: 2 },
    { id: "image8", img: "https://picsum.photos/id/108/200/200", quantity: 2 },
    { id: "image9", img: "https://picsum.photos/id/109/200/200", quantity: 2 },
    { id: "image10", img: "https://picsum.photos/id/110/200/200", quantity: 2 },
    { id: "image11", img: "https://picsum.photos/id/111/200/200", quantity: 2 },
    { id: "image12", img: "https://picsum.photos/id/112/200/200", quantity: 2 },
    { id: "image13", img: "https://picsum.photos/id/113/200/200", quantity: 2 },
    { id: "image14", img: "https://picsum.photos/id/114/200/200", quantity: 2 },
];




// Generate cards dynamically based on the images array
function createCards() {

    moves.innerHTML = movesLeft;

    const cardsArray = [];
    images.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
            cardsArray.push(`
                <div class="cards" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.id}">
                </div>
            `);
        }
    });

    // Shuffle cards initially
    cardsArray.sort(() => Math.random() - 0.5);

    // Add cards to the grid
    grid.innerHTML = cardsArray.join("");

    // Attach click events to dynamically created cards
    const cards = document.querySelectorAll(".cards");
    cards.forEach(card => {
        card.addEventListener("click", handleCardClick);

        // Briefly show cards, then hide
        setTimeout(() => {
            card.children[0].style.visibility = "hidden";
        }, 8000);
    });
}

// Handle card click logic
function handleCardClick() {
    if (lockBoard || this === firstCard) return; 

    this.children[0].style.visibility = "visible"; // Show the card image

    if (!firstCard) {
        // First card selected
        firstCard = this;
        return;
    }

    // Second card selected
    secondCard = this;
    checkForMatch();
}

// Check if two selected cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {
        // Match found
        disableCards();
        updateScore();
    } else {
        // No match
        unflipCards();
        updateMoves();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard.style.backgroundColor = "#44da538f";
    secondCard.style.backgroundColor = "#44da538f";
    // Keep matched cards visible
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.children[0].style.visibility = "hidden";
        secondCard.children[0].style.visibility = "hidden";
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        resetBoard();
    }, 1000); // Delay for flipping back the cards
}

// Reset board state after each round
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Update the score
function updateScore() {
    scoreCount += 1;
    score.textContent = scoreCount;

    // Check if the game is won
    if (scoreCount === images.length) {
        setTimeout(() => alert("You won!"), 500);
    }
}

// Update moves left
function updateMoves() {
    movesLeft -= 1;
    moves.textContent = movesLeft;

    // Check if the game is lost
    if (movesLeft === 0) {
        setTimeout(() => alert("Game over!"), 500);
        resetGame();
    }
}

// Shuffle cards on dice click
function shuffleCards() {
    createCards(); // Recreate and shuffle cards
    resetGameState(); // Reset game state
}

// Reset the game state
function resetGame() {
    createCards();
    resetGameState();
}

// Reset score, moves, and board
function resetGameState() {
    scoreCount = 0;
    movesLeft = 20;
    score.textContent = scoreCount;
    moves.textContent = movesLeft;
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Initialize game
createCards();

dice.addEventListener("click", shuffleCards);
