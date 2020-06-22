const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//*First bring in all DOM elements
//*Second create variable called songs and its an arr of our song titles
//*Third keep track of song, initially load song details into DOM variables
//*Fourth add playBtn eventListener to check status of song within music-container div classList 'play'
//*Fifth create pauseSong and playSong functions in if stmt within playBtn eventListener

//Song titles
const songs = ['weekend', 'path-of-the-fireflies', 'luminoiz-sunlight'];

//Keep track of song 
let songIndex = 0;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `img/music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


//Event Listeners
//when we click on  play button we want to check if song is playing, if it is want to pause, if not want to play it
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});