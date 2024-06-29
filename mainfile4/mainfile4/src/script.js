// Get elements
const voiceMenuBtn = document.getElementById("voice-menu-btn");
const menuCategories = document.getElementById("menu-categories");
const voiceOrderBtn = document.getElementById("voice-order-btn");
const orderInput = document.getElementById("order-input");
const submitOrderBtn = document.getElementById("submit-order-btn");
const healthSuggestionsSection = document.getElementById("health-suggestions-section");
const voiceHealthBtn = document.getElementById("voice-health-btn");
const healthSuggestionsInput = document.getElementById("health-suggestions-input");
const submitHealthSuggestionsBtn = document.getElementById("submit-health-suggestions-btn");
const confirmationDialog = document.getElementById("confirmation-dialog");
const preparationAnimation = document.getElementById("preparation-animation");
const voiceFeedbackBtn = document.getElementById("voice-feedback-btn");
const feedbackInput = document.getElementById("feedback-input");
const submitFeedbackBtn = document.getElementById("submit-feedback-btn");
const clickSound = document.getElementById("click-sound");
const orderAgainDialog = document.getElementById("order-again-dialog");
const speakerIcon = document.getElementById("speaker-icon");

// Define sample menu items with images and categories
const menu = {
    "Indian Cuisine": [
        { name: "Butter Chicken", img: "https://castleinthemountains.com/wp-content/uploads/2021/03/Low-Carb-Butter-Chicken-FI.jpg" },
        { name: "Paneer Tikka", img: "https://carveyourcraving.com/wp-content/uploads/2021/10/paneer-tikka-skewers.jpg" },
        { name: "Biryani", img: "https://saihomefood.in/cdn/shop/products/n7.jpg?v=1572348312" },
        { name: "Naan", img: "https://media.istockphoto.com/id/1150376593/photo/bread-tandoori-indian-cuisine.jpg?s=612x612&w=0&k=20&c=GGT5LN7G4zLhJTEnP_KcyvYuayi8f1nJcvQwvmj0rCM=" }
    ],
    "Desserts": [
        { name: "Chocolate Cake", img: "https://www.cakeplaza.in/cdn/shop/products/ChocoCreammakebyCakeplaza_512x.jpg?v=1608190513" },
        { name: "Ice Cream", img: "https://www.sugarhero.com/wp-content/uploads/2023/07/doughnut-ice-cream-sundae-square-1-featured-image.jpg" },
        { name: "Gulab Jamun", img: "https://www.cookwithkushi.com/wp-content/uploads/2023/07/easy-juicy-gulab-jamun-500x500.jpg" },
        { name: "Mysore Pak", img: "https://agronfoodprocessing.com/wp-content/uploads/2023/07/mysore-pak.jpg" }
    ],
    "Drinks": [
        { name: "Mango Lassi", img: "https://sandhyahariharan.co.uk/wp-content/uploads/2020/04/mango-lassi-1-of-1.jpg" },
        { name: "Coke", img: "https://5.imimg.com/data5/SELLER/Default/2022/9/RI/RZ/QZ/47977595/300-ml-paper-coke-glasses.jpg" },
        { name: "Lemonade", img: "https://www.foodiecrush.com/wp-content/uploads/2022/06/Lemonade-foodiecrush.com-9-1.jpg" },
        { name: "Water", img: "https://t3.ftcdn.net/jpg/00/54/32/92/360_F_54329215_8eREZJ3AgexSoESRZO35AgnmUfUaGaOF.jpg" }
    ]
};
// Web Speech API setup for voice recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    orderInput.value = transcript;
};

// Play click sound function
const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
};

// Voice menu button
voiceMenuBtn.addEventListener("click", () => {
    playClickSound();
    // List menu categories
    menuCategories.innerHTML = ""; // Clear previous items
    Object.keys(menu).forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "menu-category";
        categoryDiv.innerHTML = `<h3>${category}</h3><div class="menu-items"></div>`;

        menu[category].forEach(item => {
            const card = document.createElement("div");
            card.className = "menu-item";
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
                <div class="item-controls">
                    <button class="add-btn">+</button>
                    <button class="minus-btn">-</button>
                </div>
            `;
            card.querySelector(".add-btn").addEventListener("click", () => {
                const currentOrder = orderInput.value;
                orderInput.value = currentOrder + (currentOrder ? ", " : "") + item.name;
            });
            card.querySelector(".minus-btn").addEventListener("click", () => {
                const currentOrder = orderInput.value.split(",").map(i => i.trim());
                const itemIndex = currentOrder.indexOf(item.name);
                if (itemIndex > -1) {
                    currentOrder.splice(itemIndex, 1);
                    orderInput.value = currentOrder.join(", ");
                }
            });
            categoryDiv.querySelector(".menu-items").appendChild(card);
        });
        menuCategories.appendChild(categoryDiv);
    });
    menuCategories.classList.remove("hidden");
    document.getElementById("order-section").classList.remove("hidden");
});

// Voice order button
voiceOrderBtn.addEventListener("click", () => {
    playClickSound();
    recognition.start();
});

// Submit order button
submitOrderBtn.addEventListener("click", () => {
    playClickSound();
    const orderText = orderInput.value;

    // Show health suggestions section
    healthSuggestionsSection.classList.remove("hidden");
});

// Voice health preferences button
voiceHealthBtn.addEventListener("click", () => {
    playClickSound();
    recognition.start();
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        healthSuggestionsInput.value = transcript;
    };
});

// Submit health suggestions button
submitHealthSuggestionsBtn.addEventListener("click", () => {
    playClickSound();
    const healthSuggestionsText = healthSuggestionsInput.value;
    console.log("Health Preferences submitted:", healthSuggestionsText);
    alert("Thank you for providing your health preferences!");
    healthSuggestionsSection.classList.add("hidden");
    confirmationDialog.classList.remove("hidden");
});

// Confirmation buttons
document.getElementById("confirm-yes").addEventListener("click", () => {
    playClickSound();
    confirmationDialog.classList.add("hidden");
    preparationAnimation.classList.remove("hidden");
    setTimeout(() => {
        preparationAnimation.classList.add("hidden");
        orderAgainDialog.classList.remove("hidden");
    }, 5000); // Simulate preparation time
});

document.getElementById("confirm-no").addEventListener("click", () => {
    playClickSound();
    confirmationDialog.classList.add("hidden");
    document.getElementById("order-section").classList.remove("hidden");
});

// Order again buttons
document.getElementById("order-again-yes").addEventListener("click", () => {
    playClickSound();
    orderAgainDialog.classList.add("hidden");
    document.getElementById("order-section").classList.remove("hidden");
});

document.getElementById("order-again-no").addEventListener("click", () => {
    playClickSound();
    orderAgainDialog.classList.add("hidden");
    document.getElementById("feedback-section").classList.remove("hidden");
});

// Voice feedback button
voiceFeedbackBtn.addEventListener("click", () => {
    playClickSound();
    recognition.start();
});

// Submit feedback button
submitFeedbackBtn.addEventListener("click", () => {
    playClickSound();
    const feedbackText = feedbackInput.value;
    console.log("Feedback submitted:", feedbackText);
    alert("Thank you for your feedback!");
});

// Speaker icon click
const readPageContent = () => {
    const utterance = new SpeechSynthesisUtterance(document.body.innerText);
    window.speechSynthesis.speak(utterance);
};

speakerIcon.addEventListener("click", readPageContent);

// Add speaker icon to dynamically created content
const addSpeakerIconToDialogs = () => {
    const dialogs = document.querySelectorAll('.dialog');
    dialogs.forEach(dialog => {
        if (!dialog.querySelector('.icon-button')) {
            const iconButton = document.createElement('button');
            iconButton.className = 'icon-button';
            iconButton.innerHTML = '<img src="speaker-icon.png" alt="Speaker Icon">';
            iconButton.addEventListener('click', readPageContent);
            dialog.appendChild(iconButton);
        }
    });
};

document.addEventListener('DOMContentLoaded', addSpeakerIconToDialogs);
