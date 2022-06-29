let $messages = $(".messages-content");
let serverResponse = "wala";
let idx = 0;
let chance = 0;
let fail = 0;
let vis = 0;
let chatId = 0;
let mail = 0;
let welcomeText;
let str = 0;
let textmsg = "";
let isMute = false;
// const csrf_token = document
//   .querySelector("meta[name='csrf-token']")
//   .getAttribute("content");
//   console.log(csrf_token)

/* 
UI Elements
*/
let InputMsg = document.getElementById("MSG");
let eyeSymbol = document.getElementById("eye");
const muteUnmuteElement = document.getElementById("mute-unmute");
const actionListItems = document.querySelectorAll(".action__list__item");

// function setHeaders() {
//   /* Initialise header of a request */
//   return {
//     "Content-Type": "application/json",
//     "X-CSRFToken": csrf_token,
//   };
// }

let ques = [
  "How may I help you?",
  "Are you our bank customer?",
  "Please provide your Bank account number",
  "Please provide last 4 digits of your SSN number",
  "Enter the OTP sent to the registered phone number and email",
  "In which city do you intend to buy the house?",
  "How much loan do you need?",
  "How much Down Payment are you willing to give?",
  "Please rate your credit score among five options that is, Excellent, Very Good, Good, Average and Bad?",
  "What should be the loan duration?",
  "Do you like the offer?",
  "Can I know your name please",
  "Please provide your phone number",
  "Would you like to connect to our executive",
];

if (localStorage.getItem("index") != null) {
  if (localStorage.getItem("index") != "0") {
    vis = 1;
    idx = parseInt(localStorage.getItem("index"));
    chatId = localStorage.getItem("chatId");
  }
}

/* Set up speech recognition */

let recognition;
try {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
   recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
}

recognition.onresult = (event) => {
  removeListenUI();
  const speechToText = event.results[0][0].transcript;
  InputMsg.value = speechToText;
  console.log(speechToText);
  insertMessage();
  fetchmsg(speechToText);
};

recognition.onsoundend = function () {
  // Fired when any sound — recognizable speech or not — has stopped being detected.
  removeListenUI();
  recognition.stop();
};

recognition.onerror = function (event) {
  removeListenUI();
  recognition.abort();
  console.log(event.error);
};

function listenUI() {
  /* Makes changes in UI that depicts the bot is listening */
  const audio = new Audio("./Sounds/pop-2.mp3");
  audio.play();
  document.getElementById("listening-box").classList.remove("hide");
  document.getElementById("mymsg").classList.add("hide");
}
function removeListenUI() {
  /* removes changes in UI when the bot has stopped listening */
  document.getElementById("listening-box").classList.add("hide");
  document.getElementById("mymsg").classList.remove("hide");
}

/* Event Listener to start listening when Mic is clicked */
$("#start-record-btn").on("click", function () {
  listenUI();
  recognition.start();
});

function listendom(no) {
  console.log(no);
  //console.log(document.getElementById(no))
  InputMsg.value = no.innerHTML;
  insertMessage();
}

$(window).load(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    if (idx != 0) {
      let text1 =
        "We noticed that you have an incomplete conversation with us so lets get back.";
      let text2 = ques[idx];
      let result = text1.concat(" ", text2);
      welcomeText = result;
      serverMessage(result);
    } else {
      welcomeText =
        "Hello How may I help you with the home loan related queries?";
      
    }
  }, 100);
  speechSynthesis.speak(new SpeechSynthesisUtterance("Hi hello"));
});

speechSynthesis.speak(new SpeechSynthesisUtterance(welcomeText));

function updateScrollbar() {
  /* Scrolls to the end with a new message  */
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function insertMessage() {
  /* Inserts new message in chat-box (UI) */
  let msg = $(".message-input").val();
  textmsg = msg;
  if ($.trim(msg) == "") {
    return false;
  }
  if (idx == 3) {
    let s = "x".repeat(msg.length);
    msg = s;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");

  $(".message-input").val(null);
  updateScrollbar();
  removeListenUI();
  recognition.abort();
}

document.getElementById("mymsg").onsubmit = (e) => {
  /* Event Listener triggered when message is submitted by user */
  e.preventDefault();
  insertMessage();
  fetchmsg(textmsg);
  $(".message-input").val(null);
};

/* Event listener triggered when user tries to close tab or window */
// addEventListener("beforeunload", function (event) {
//   event.preventDefault();
//   event.returnValue = "Are you sure you want to refresh?";

//   let url = "http://127.0.0.1:5000/savechat";

//   let data = { chatId: chatId };

//   fetch(url, {
//     method: "POST",
//     body: JSON.stringify(data),
//     mode: "cors",
//     headers: { "Content-Type": "application/json"},
//   });
//   localStorage.clear();
// });

function serverMessage(serverResponseMessage) {
  /* Inserts Server Response to chat-box(UI) */
  if ($(".message-input").val() != "") {
    return false;
  }

  $(".message.loading").remove();
  $(
    '<div class="message new"><figure class="avatar"><img src="https://cdn.technologyadvice.com/wp-content/uploads/2018/02/friendly-chatbot.jpg" /></figure>' +
      serverResponseMessage +
      "</div>"
  )
  .appendTo($(".mCSB_container"))
  .addClass("new");
  updateScrollbar();
}

function getText (ans, i){
    let text = "";
    let j = 0,n = ans.length;
    for (; i < n; i++) {
        if (ans[i] == ":") {
            break
        }
    }
    j = i + 2;
    for (; j < n && ans[j] != " "; j++) {
        text = text + ans[j];
    }
    return {text, j}
}

function fetchmsg(text) {
  /* Fetches Response from backend and calls serverMessage */
    $(
        '<div class="message loading new"><figure class="avatar"><img src="https://cdn.technologyadvice.com/wp-content/uploads/2018/02/friendly-chatbot.jpg" /></figure><span></span></div>'
    ).appendTo($(".mCSB_container"));
    updateScrollbar();

    let url = "http://127.0.0.1:5000/predict";

    let data = {
        MSG: text,
    };
    console.log("abc", data);
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: { "Content-Type": "application/json"},
    })
    .then((res) => res.json())
    .then((response) => {
        console.log(response);
          serverMessage(response.answer); //inserting mssg in frontend
          if (!isMute)
              speechSynthesis.speak(new SpeechSynthesisUtterance(response.answer));
    })
    .catch((error) => console.log("Error h:", error));
}

function removeFromView() {
  /* Remove Chat Box from view when clicked cross */
  let element = document.getElementById("chat-box");
  element.classList.add("invisible");
  document.getElementById("chat-icon").style.visibility = "visible";
  speechSynthesis.cancel();
}

function addToView() {
  /* Add Chat Box from view when clicked on Chat Icon */
  let element = document.getElementById("chat-box");
  if (str == 0) {
    str = 1;
    if (!isMute)
      speechSynthesis.speak(
        new SpeechSynthesisUtterance("Hello, how may I help you?")
      );
  }
  element.classList.remove("invisible");
  document.getElementById("chat-icon").style.visibility = "hidden";
}
document.getElementById("close-chat-box").addEventListener("click", removeFromView);
document.getElementById("chat-icon").addEventListener("click", addToView);

function Mask() {
  /* Change Input Type when entering SSN */
  eyeSymbol.style.display = "inline";
  InputMsg.setAttribute("type", "password");
  InputMsg.style.width = "68%";
}
function UnMask() {
  /* Undo changes made by Mask() */
  eyeSymbol.style.display = "none";
  InputMsg.setAttribute("type", "text");
  InputMsg.style.width = "80%";
}

/* Functionality to Display and Hide SSN */
eyeSymbol.addEventListener("click", toggleEye);

function toggleEye() {
  if (eyeSymbol.classList.contains("fa-eye-slash")) {
    InputMsg.setAttribute("type", "text");
    eyeSymbol.classList.remove("fa-eye-slash");
    eyeSymbol.classList.add("fa-eye");
  } else {
    InputMsg.setAttribute("type", "password");
    eyeSymbol.classList.remove("fa-eye");
    eyeSymbol.classList.add("fa-eye-slash");
  }
}

/* Function to Mute-Unmute the chat conversation */
function toggleMuteUnmuteIcon() {
  if (muteUnmuteElement.classList.contains("fa-volume-xmark")) {
    muteUnmuteElement.classList.remove("fa-volume-xmark");
    muteUnmuteElement.classList.add("fa-volume-high");
  } else {
    muteUnmuteElement.classList.remove("fa-volume-high");
    muteUnmuteElement.classList.add("fa-volume-xmark");
  }
}

function toggleMuteUnmute() {
  toggleMuteUnmuteIcon();
  if (!isMute) {
    // bot is speaking => mute it
    speechSynthesis.cancel();
  }
  isMute = !isMute;
}
muteUnmuteElement.addEventListener("click", toggleMuteUnmute);

/* Functionality of action-bar */
function handleActionItemClick(event) {
  InputMsg.value = event.target.innerHTML;
}

actionListItems.forEach((actionListItem) => {
  actionListItem.addEventListener("click", handleActionItemClick);
});
