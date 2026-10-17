
const $ = (id) => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function celebrate(count = 35) {
  const effects = $("effects");
  const symbols = ["💗", "✨", "🌸", "💕", "⭐"];

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "confetti";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.animationDelay = Math.random() * 1.5 + "s";
    item.style.fontSize = 12 + Math.random() * 18 + "px";

    effects.appendChild(item);
    setTimeout(() => item.remove(), 5000);
  }
}

/* 1. Birthday date gate */


$("startBtn").addEventListener("click", () => {
  const day = $("day").value.trim().replace(/^0+/, "");
  const month = $("month").value.trim().replace(/^0+/, "");
  const year = $("year").value.trim();

  if (day === "6" && month === "11" && year === "2008") {
    $("dateError").textContent = "";
    showScreen("challenge");
  } else {
    $("dateError").textContent =
      "Oops! Try again, birthday girl. Hint: DD / MM / YYYY 💗";
  }
});


/* 2. Don't-click challenge */

let clickCount = 0;

const clickMessages = [
  "You clicked it! I literally said don't. 😂",
  "Again?! Sruthi, please behave. 😭",
  "Okay, okay... you win. You're too curious! 💗"
];

$("dontClickBtn").addEventListener("click", () => {
  clickCount++;

  $("clickMessage").textContent =
    clickMessages[Math.min(clickCount - 1, clickMessages.length - 1)];

  $("dontClickBtn").textContent =
    clickCount >= 3 ? "Fine, I give up 😂" : "Oops, I clicked again!";

  if (clickCount >= 3) {
    $("continueBtn").classList.remove("hidden");
    celebrate(12);
  }
});

$("continueBtn").addEventListener("click", () => {
  showScreen("message");
});

/* 3. Navigation buttons */

document.querySelectorAll(".nextBtn").forEach((button) => {
  button.addEventListener("click", () => {
    const nextScreen = button.dataset.next;

    if (nextScreen) {
      showScreen(nextScreen);
    }
  });
});

/* 4. Cake and candles */

$("blowBtn").addEventListener("click", () => {
  if ($("cake").classList.contains("cake-done")) return;

  $("cake").classList.add("cake-done");
  document.querySelector(".cake").classList.add("blown");

  $("cakeMessage").textContent =
    "Your wish is on its way to the universe! 🌠💗";

  $("blowBtn").classList.add("hidden");
  $("cakeContinue").classList.remove("hidden");

  celebrate(45);
});

/* 5. Birthday wishes, one by one */

const wishes = [
  {
    emoji: "🌷",
    text: "May your days be full of happiness, laughter, and little reasons to smile."
  },
  {
    emoji: "🌟",
    text: "May you always find the courage to chase your dreams and believe in yourself."
  },
  {
    emoji: "🐼",
    text: "May your life have plenty of cozy moments, peaceful naps, and adorable surprises."
  },
  {
    emoji: "💗",
    text: "May this new year of your life bring you beautiful beginnings and lovely memories."
  }
];

let wishIndex = 0;

$("wishNext").addEventListener("click", () => {
  wishIndex++;

  if (wishIndex >= wishes.length) {
    $("wishNext").classList.add("hidden");
    $("wishContinue").classList.remove("hidden");
    return;
  }

  $("wishEmoji").textContent = wishes[wishIndex].emoji;
  $("wishText").textContent = wishes[wishIndex].text;
  $("wishCount").textContent =
    `Wish ${wishIndex + 1} of ${wishes.length}`;

  $("wishCard").animate(
    [
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 450, easing: "ease-out" }
  );
});

/* 6. Open the letter */

let letterOpened = false;

$("envelope").addEventListener("click", () => {
  if (letterOpened) return;

  letterOpened = true;
  $("envelope").classList.add("open");
  $("letterHint").textContent = "A little message, just for you 💌";

  $("letterContent").classList.remove("hidden");
  $("letterContinue").classList.remove("hidden");

  celebrate(18);
});

/* 7. Secret heart */

let heartTaps = 0;

$("heartBtn").addEventListener("click", () => {
  heartTaps++;

  const messages = [
    "Sending you a little happiness! 💗",
    "And a little more... 💕",
    "Okay, a whole universe of hearts! 💖"
  ];

  $("heartMessage").textContent =
    messages[Math.min(heartTaps - 1, messages.length - 1)];

  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = ["💗", "💕", "💖", "💞"][
    Math.floor(Math.random() * 4)
  ];
  heart.style.left = Math.random() * 90 + 5 + "vw";

  $("effects").appendChild(heart);
  setTimeout(() => heart.remove(), 3500);

  if (heartTaps >= 3) {
    $("secretContinue").classList.remove("hidden");
    celebrate(15);

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }
});

/* 8. Final gift */

$("giftBtn").addEventListener("click", () => {
  $("finalMessage").classList.remove("hidden");
  $("giftBtn").textContent = "Surprise opened! 💗";
  $("giftBtn").disabled = true;

  celebrate(60);
});

/* Enter key works on the date fields */

["day", "month", "year"].forEach((id) => {
  $(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      $("startBtn").click();
    }
  });
});
