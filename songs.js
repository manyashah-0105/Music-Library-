const BASE = "";

const songList = [
  { title: "Kesariya",              category: "Hindi",    file: "https://github.com/manyashah-0105/Music-Library-/blob/main/Kesariya%20-%20Brahm%C4%81stra%20Ranbir%20Kapoor%20Alia%20Bhatt%20Pritam%20Arijit%20Singh%20Amitabh%20Bhattacharya%204K.mp3" },
  { title: "Tu khub mane game che", category: "Gujarati", file: "https://github.com/manyashah-0105/Music-Library-/blob/main/Tu%20Khub%20Mane%20Game%20Che%20Mara%20Valah%20Prabhu%20Flute%20Chronicle%20Jainam%20Varia.mp3" },
  { title: "Khalasi",               category: "Gujarati", file: "https://github.com/manyashah-0105/Music-Library-/blob/main/Coke%20Studio%20Bharat%20Khalasi%20Aditya%20Gadhvi%20x%20Achint.mp3" },
  { title: "Booma Boom",            category: "Hindi",    file: "https://github.com/manyashah-0105/Music-Library-/blob/main/Booma%20Boom%20(From%20Lagan%20Laagii%20Re%20).mp3" },
  { title: "Chaleya",               category: "Hindi",    file: "https://github.com/manyashah-0105/Music-Library-/blob/main/JAWAN%20Chaleya%20(Hindi)%20Shah%20Rukh%20Khan%20Nayanthara%20Atlee%20Anirudh%20Arijit%20S%2C%20Shilpa%20R%20Kumaar.mp3" }
].map((s, i) => {
  const url = BASE + encodeURIComponent(s.file);
  return { id: i, ...s, url, src: url, path: url, link: url, audio: url, liked: false };
});

const songs = songList;
const tracks = songList;
const playlist = songList;
const songsData = songList;
