// This file contains the JavaScript code that implements the typing practice functionality.

document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = [
        "On a sunny day at the beach, families gather to enjoy the warm sand and gentle waves. Children build sandcastles while adults relax under colorful umbrellas. The sound of laughter fills the air, and the scent of saltwater creates a refreshing atmosphere. As the sun begins to set, the sky transforms into a canvas of vibrant colors, making it a perfect end to a delightful day.",
        "In the heart of the bustling city, skyscrapers tower over the streets below. People rush to and fro, each with their own destination in mind. The aroma of street food wafts through the air, mingling with the sounds of honking cars and distant sirens. Amidst the chaos, there is a sense of energy and excitement that is uniquely urban.",
        "The forest was alive with the sounds of nature. Birds chirped melodiously from the treetops, while the rustling of leaves signaled the presence of small animals scurrying about. Sunlight filtered through the dense canopy, casting dappled shadows on the forest floor. It was a place of tranquility and beauty, untouched by the hustle and bustle of modern life.",
        "On a snowy winter's day, the world is transformed into a wonderland of white. Snowflakes drift gently from the sky, covering everything in a soft, powdery blanket. Children bundle up in warm clothes to build snowmen and have snowball fights, their laughter echoing through the crisp air. The cold is invigorating, and the beauty of the snow-covered landscape is breathtaking.",
        "In a small village nestled in the mountains, life moves at a slower pace. The villagers know each other by name, and there is a strong sense of community. The air is fresh and clean, and the scenery is stunning, with rolling hills and lush greenery as far as the eye can see. It is a place where one can truly relax and escape the stresses of everyday life.",
        "The ocean is a vast and mysterious place, teeming with life. Waves crash against the shore, their rhythmic sound both soothing and powerful. Beneath the surface, a world of wonder awaits, with colorful coral reefs and a diverse array of marine creatures. The ocean's beauty is matched only by its unpredictability, making it a source of endless fascination.",
        "In the desert, the landscape is stark and unforgiving. The sun beats down relentlessly, and the sand stretches out in all directions. Yet, there is a unique beauty to be found here, in the vastness and the solitude. The desert is a place of extremes, where life must adapt to survive, and where the night sky is filled with a breathtaking display of stars.",
        "The countryside is a place of peace and simplicity. Rolling fields of green stretch out under a wide, open sky. Farmers tend to their crops and animals, working in harmony with the land. The air is filled with the scent of fresh grass and blooming flowers, and the only sounds are the gentle rustling of leaves and the distant call of birds.",
        "In the heart of the rainforest, the air is thick with humidity and the sounds of wildlife. Towering trees create a dense canopy, blocking out much of the sunlight. The forest floor is a tangle of roots and undergrowth, teeming with life. It is a place of incredible biodiversity, where every inch is filled with the wonders of nature.",
        "On a clear night, the sky is a canvas of stars. The Milky Way stretches across the heavens, a river of light in the darkness. Constellations tell stories of ancient myths, and the occasional shooting star adds a touch of magic. It is a reminder of the vastness of the universe and the beauty that can be found in the night sky.",
        "In a bustling market, the air is filled with the sounds of vendors calling out their wares and the chatter of customers. Stalls are laden with fresh produce, handmade crafts, and a variety of goods. The aroma of spices and cooked food mingles with the scent of flowers and fresh fruit. It is a place of vibrant colors and lively energy.",
        "The mountains are a place of majesty and awe. Towering peaks rise up into the sky, their tops often shrouded in clouds. The air is crisp and cool, and the landscape is rugged and wild. Hiking trails wind through the mountains, offering breathtaking views and a sense of adventure. It is a place where one can feel truly connected to nature."
    ];

    const textToTypeElem = document.getElementById('text-to-type');
    const userInput = document.getElementById('user-input');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const timeDisplay = document.getElementById('time');
    const speedDisplay = document.getElementById('speed');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const timeTakenElem = document.getElementById('time-taken');
    const typingSpeedElem = document.getElementById('typing-speed');
    const typingRatingElem = document.getElementById('typing-rating');
    const tryAgainButton = document.getElementById('try-again-button');

    let startTime;
    let endTime;
    let timerInterval;
    let paused = false;
    let totalTime = 0;

    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(() => {
            if (!paused) {
                const currentTime = new Date();
                totalTime = (currentTime - startTime) / 1000;
                timeDisplay.innerText = totalTime.toFixed(2);
            }
        }, 100);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        const wordsTyped = textToTypeElem.innerText.split(' ').length;
        const typingSpeed = (wordsTyped / timeTaken) * 60;

        let rating;
        if (typingSpeed > 60) {
            rating = 'Excellent';
        } else if (typingSpeed > 40) {
            rating = 'Good';
        } else {
            rating = 'Needs Improvement';
        }

        timeTakenElem.innerText = `Time Taken: ${timeTaken.toFixed(2)} seconds`;
        typingSpeedElem.innerText = `Typing Speed: ${typingSpeed.toFixed(2)} WPM`;
        typingRatingElem.innerText = `Rating: ${rating}`;

        popup.style.display = 'block';
    }

    function reset() {
        userInput.value = '';
        userInput.disabled = true;
        startButton.disabled = false;
        pauseButton.disabled = true;
        timeDisplay.innerText = '0';
        speedDisplay.innerText = '0';
        totalTime = 0;
        paused = false;
        clearInterval(timerInterval);
        displayRandomParagraph();
    }

    function displayRandomParagraph() {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        textToTypeElem.innerText = paragraphs[randomIndex];
    }

    startButton.addEventListener('click', () => {
        userInput.disabled = false;
        userInput.focus();
        startButton.disabled = true;
        pauseButton.disabled = false;
        startTimer();
    });

    pauseButton.addEventListener('click', () => {
        paused = !paused;
        pauseButton.innerText = paused ? 'Resume' : 'Pause';
    });

    userInput.addEventListener('input', () => {
        if (userInput.value === textToTypeElem.innerText) {
            stopTimer();
            userInput.disabled = true;
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    tryAgainButton.addEventListener('click', () => {
        popup.style.display = 'none';
        reset();
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Display a random paragraph when the page loads
    displayRandomParagraph();
});