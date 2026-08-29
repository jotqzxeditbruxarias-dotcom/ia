const form = document.getElementById("form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");

const API_URL = "COLOQUE_AQUI_A_URL_DO_SEU_BACKEND";

function addMessage(text, type) {

  const message = document.createElement("div");

  message.className = "message " + type;

  message.textContent = text;

  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  addMessage("Pensando...", "ai");

  try {

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: text
      })

    });

    if (!response.ok) {
      throw new Error("Erro no servidor");
    }

    const data = await response.json();

    const messages = document.querySelectorAll(".ai");

    messages[messages.length - 1].textContent =
      data.reply || "Não recebi uma resposta.";

  } catch (error) {

    const messages = document.querySelectorAll(".ai");

    messages[messages.length - 1].textContent =
      "Não consegui conectar ao Silva AI.";

    console.error(error);
  }

});
