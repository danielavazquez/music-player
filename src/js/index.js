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
//*Sixth create prevSong and nextSong eventListeners as well as functions that will trigger with click event
//*Seventh create time/song update eventListener with updateProgress function
//*Eighth when song ends make it play next one

//Song titles
const songs = ['weekend', 'path-of-the-fireflies', 'lumi-sunlight'];

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

//Previous song
//if its the first song and click back button want to go to the last song
//if song index is less than 0, then set song index to the last song. Songs.length is 3 so subtract 1 from length
function prevSong() {
  songIndex--; //take our song index and decrease by 1

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]); //loadSong and pass in songs arr with current song index after pressing prev button

  playSong();
}

//Next song
//songs.length so project is scalable
function nextSong() {
  songIndex++; //take our song index and increase by 1

  if (songIndex > songs.length - 1) { //if song index is greater than the length of the array 3-1 = 2
    songIndex = 0;
  }

  loadSong(songs[songIndex]); //loadSong and pass in songs arr with current song index after pressing prev button

  playSong();
}

//Update progress bar
//event parament part of an eventListener, can get duration and current time from source element
//const { duration, currentTime } = e.srcElement  console.log(duration, currentTime);
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  progressPercent = (currentTime / duration) * 100 //percentage of song that's been played
  progress.style.width = `${progressPercent}%`
}

//Set progress bar
function setProgress(e) {
  const width = this.clientWidth; //this takes width of progress bar also gives you a number
  const clickX = e.offsetX; //when you click it gives you a numerical position 45, 120, 210 etc...
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
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

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time/song update
audio.addEventListener('timeupdate', updateProgress)

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Song ends
//nextSong function leverage from change song eventListener
audio.addEventListener('ended', nextSong);