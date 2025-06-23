const songList = [
    {
        name: "เส้นบางๆ",
        artist: "INDIGO",
        src: "assets/1.mp3",
        cover: "assets/1.jpeg"
    },
    {
        name: "ซ่อนกลิ่น",
        artist: "PALMY",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Good Morning Teacher", 
        artist: "Atom ชนกันต์",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    }
]

const artistName = document.querySelector('.artist_name');
const musicName = document.querySelector('.song_name');
const fillBar = document.querySelector('.fill_bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const prog = document.querySelector('.progress_bar');
const muteButton = document.getElementById('mute');
const highButton = document.getElementById('high');
const volumeSlider = document.getElementById('volume');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    playButton.addEventListener('click', togglePlayPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    prog.addEventListener('click', seek);
    muteButton.addEventListener('click', toggleMute); 
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const progress = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${progress}%`;
    
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playButton.classList.toggle('fa-pause', playing);
    playButton.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playButton.classList.add('fa-pause');
    playButton.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.offsetWidth) * song.duration;
    song.currentTime = pos;
}

function toggleMute() {
    song.muted = !song.muted;
    muteButton.classList.toggle('active', song.muted);
}

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
    if (volumeSlider) volumeSlider.style.display = 'none'; // ซ่อนทุกครั้งที่เปลี่ยนเพลง
}

if (highButton && volumeSlider) {
    highButton.addEventListener('click', function() {
        // toggle แสดง/ซ่อน
        if (volumeSlider.style.display === 'none' || volumeSlider.style.display === '') {
            volumeSlider.style.display = 'inline-block';
        } else {
            volumeSlider.style.display = 'none';
        }
    });

    volumeSlider.addEventListener('input', function() {
        song.volume = this.value;
    });
}