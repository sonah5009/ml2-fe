// 변수 생성
let userMessages = [];
let assistantMessages = [];
let myDateTime = ""; // date + hour
function start() {
  const date = document.querySelector("#date").value;
  const hour = document.querySelector("#hour").value;
  if (date == "") {
    alert("Please select a birth date");
    return;
  }

  myDateTime = date + hour;
  document.querySelector("#intro").style.display = "none";
  document.querySelector("#chat").style.display = "block";
  console.log(myDateTime);
}

async function sendMessage() {
  // display the loading icon
  document.getElementById("loader").style.display = "block";
  //사용자의 메시지 가져옴
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;

  //채팅 말풍선에 사용자의 메시지 출력
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user-bubble";
  userBubble.textContent = message;
  document.getElementById("fortuneResponse").appendChild(userBubble);

  //Push
  userMessages.push(messageInput.value);

  //init the input fields
  messageInput.value = "";

  // send the messages to backend server and then print response
  try {
    const response = await fetch("http://localhost:3000/fortuneTell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myDateTime: myDateTime,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();

    // Hide loading icon
    document.getElementById("loader").style.display = "none";

    //Push
    assistantMessages.push(data.assistant);
    console.log("Response:", data);

    // print response on the screen
    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot-bubble";
    botBubble.textContent = data.assistant;
    document.getElementById("fortuneResponse").appendChild(botBubble);
  } catch (error) {
    console.error("Error:", error);
  }
}
