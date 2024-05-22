import { data } from "./data.js";

let questionsData = [];
questionsData = data;

const questionDiv = document.querySelector(".question");
const rep1Div = document.getElementById("rep1");
const rep2Div = document.getElementById("rep2");
const rep3Div = document.getElementById("rep3");
const rep4Div = document.getElementById("rep4");
const repDivs = document.querySelectorAll(".rep");
const submitButton = document.getElementById("submit");
const nextButton = document.querySelector(".next");
const answerDiv = document.querySelector(".answer");
// const scoreDiv = document.querySelector(".score > span");
const questionIndexDiv = document.querySelector(".questionindex");
const resultButton = document.querySelector(".result");
const repList = document.querySelector("ul");
const replayButton = document.querySelector(".replay");

let goodcolor;
let wrongcolor;

let targetID;
let index = 0;
let questionList = 1;
let score = 0;
let x;
let y;

let playerName;
let totalScore = score;
let correctAnswers = 0;
let gameTime = 0;

// Le player a raison ou tort ?
let player;

// Check s'il existe une réponse selectionnée
let answerSelected = false;

// DIV de réponse selectionnée (#rep1, #rep2...)
let selectDiv;

// Empêche le joueur de jouer avec les div après validation
let submitted = false;

function init() {
  displayQuestion();
  targetDiv();
}

init();

// Display questions
function displayQuestion() {
  questionDiv.innerHTML = `${questionsData[index].question}`;
  rep1Div.innerHTML = `${questionsData[index].rep1}`;
  rep2Div.innerHTML = `${questionsData[index].rep2}`;
  rep3Div.innerHTML = `${questionsData[index].rep3}`;
  rep4Div.innerHTML = `${questionsData[index].rep4}`;
}

// Target DIV
function targetDiv() {
  repDivs.forEach((repDiv) => {
    repDiv.addEventListener("click", (e) => {
      if (!submitted) {
        if (selectDiv) {
          selectDiv.style = "";
        }
        targetID = e.target.id;
        answerDiv.innerHTML = ``;
        answerSelected = true;
        selectDiv = document.getElementById(`${targetID}`);
        selectDiv.style = "background-color: #255b6b; color: #ffffff";
      }
    });
  });
}

// Check si la réponse est juste ou non
function check() {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (answerSelected == false) {
      answerDiv.innerHTML = "Il faut choisir une réponse !";
      return;
    } else {
      submitted = true;
      if (targetID == questionsData[index].good) {
        player = true;
        answerDiv.innerHTML = "Bonne réponse !";
        score = score + 1;
        tadah();
      } else {
        player = false;
        answerDiv.innerHTML = "Mauvaise réponse !";
        score = score + 0;
        tadah();
      }
    }
  });
}

check();

function tadah() {
  index++;
  questionList++;
  if (player == false) {
    wrongcolor = document.getElementById(`${targetID}`);
    goodcolor = document.getElementById(`${questionsData[index - 1].good}`);
    wrongcolor.style =
      "background-color: #8f3939; color: #ffffff; border: 1px solid #8f3939";
    goodcolor.style =
      "background-color: #3d6e45; color: #ffffff; border: 1px solid #3d6e45";
    submitButton.style.display = "none";
    nextButton.style.display = "flex";
  } else {
    goodcolor = document.getElementById(`${questionsData[index - 1].good}`);
    goodcolor.style =
      "background-color: #3d6e45; color: #ffffff; border: 1px solid #3d6e45";
  }
  submitButton.style.display = "none";
  nextButton.style.display = "flex";
  if (index + 1 >= questionsData.length + 1) {
    nextButton.style.display = "none";
    resultButton.style.display = "flex";
    final();
  } else {
    nextQuestion();
  }
}

function nextQuestion() {
  nextButton.addEventListener("click", () => {
    submitted = false;
    if (wrongcolor) {
      goodcolor.style = "";
      wrongcolor.style = "";
    }
    if (goodcolor) {
      goodcolor.style = "";
    }
    wrongcolor = null;
    goodcolor = null;
    submitButton.style.display = "flex";
    nextButton.style.display = "none";
    displayQuestion();
    targetDiv();
    update();
  });
}

// Update score, index, nouvelle question...
function update() {
  questionIndexDiv.innerHTML = `
  ${questionList} / ${questionsData.length} questions
  `;
  answerDiv.innerHTML = "";
  selectDiv.style = "";
  answerSelected = false;
}

function final() {
  resultButton.addEventListener("click", () => {
    repList.style.display = "none";
    answerDiv.innerHTML = "";
    questionDiv.style = `font-size: 60px;`;
    questionDiv.innerHTML = `Score : ${score}`;
    resultButton.style.display = "none";
    y = questionsData.length;
    x = score;
    let w = y - x;
    console.log(y);
    questionIndexDiv.innerHTML = `${w} mauvaise(s) réponse(s) / ${y} questions`;
    replayButton.style.display = "flex";
    replay();
  });

  playerName = document.getElementById("playerName").value || "Joueur anonyme";
  y = questionsData.length; // Assurez-vous que ceci est un nombre
  x = score; // Assurez-vous que ceci est un nombre
  console.log(y);
  console.log(x);

  correctAnswers = parseInt(y, 10) - parseInt(x, 10);
  console.log(correctAnswers + "cooooorect");
  console.log("Player Name:", playerName);
  console.log("Correct Answers:", correctAnswers);
  console.log("Game Time:", gameTime);
  console.log("Total Score:", score);

  fetch("https://tiffanydurr.github.io/Gamex/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerName: playerName,
      correctAnswers: correctAnswers,
      gameTime: gameTime,
      totalScore: score,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function replay() {
  replayButton.addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("load", () => {
  fetch("https://tiffanydurr.github.io/Gamex/allScores")
    .then((response) => response.json())
    .then((data) => {
      // Trier les scores par totalScore en ordre décroissant et prendre les 15 premiers
      const topScores = data
        .sort((a, b) => parseInt(b.totalScore, 10) - parseInt(a.totalScore, 10))
        .slice(0, 15);
      const allScoresDiv = document.getElementById("allScores");
      allScoresDiv.innerHTML = topScores
        .map(
          (post) => `
            <div>
              Joueur : ${post.playerName}, Score : ${post.totalScore}, Temps : ${post.gameTime}, Réponses correctes : ${post.correctAnswers}
            </div>
          `
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
