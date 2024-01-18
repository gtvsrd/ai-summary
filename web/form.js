import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")

form.addEventListener("submit", async (event) => {
  content.classList.add("placeholder")
  event.preventDefault()

  const videoURL = input.value
  console.log("URL do vídeo: ", videoURL)
  if (!videoURL.includes("youtube.com") && !videoURL.includes("youtu.be")) {
    return (content.textContent = "A URL inserida não é do YouTube")
  } else if (videoURL.includes("shorts")) {
    return (content.textContent =
      "Não é possível fazer download de Shorts no momento")
  }
  if (videoURL.includes("youtube.com")) {
    const [_, params] = videoURL.split("=")
    let [videoID] = params.split("&")

    console.log(params)
    console.log(videoID)

    content.textContent = "Obtendo o texto do áudio..."
    const transcription = await server.get("/summary/" + videoID)

    content.textContent = transcription.data.result
    const summary = await server.post("/summary", {
      text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
  } else if (videoURL.includes("youtu.be")) {
    const [_, params] = videoURL.split(".be/")
    let [videoID] = params.split("?")

    console.log(params)
    console.log(videoID)

    content.textContent = "Obtendo o texto do áudio..."
    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Realizando o resumo..."
    const summary = await server.post("/summary", {
      text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
  }
})
