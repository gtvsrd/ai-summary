import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/watch?v=" + videoId
  console.log("Realizando o download do vídeo: " + videoId)

  ytdl(videoId, {quality: "lowestaudio", filter: "audioonly"})
  .on(
    "info", 
    (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      console.log(seconds)
  })
  .on("end", () => {
    console.log("Download do vídeo finalizado")
  })
  .on("error", (error) => {
    console.log(
      "Não foi possível fazer o download do  vídeo. detalhes do erro: ", error
    )
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
}