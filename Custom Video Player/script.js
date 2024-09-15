// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = player.querySelector('.fullscreen');

// Build our functions
function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateBtn(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange(){
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
function full(){
    if(!document.fullscreenElement){
        if(video.requestFullscreen){
            video.requestFullscreen();
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        }
    }
}
// hook up the event listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateBtn);
video.addEventListener('pause',updateBtn);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRange));
ranges.forEach(range => range.addEventListener('mousemove',handleRange));
let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',()=> mousedown = false);
fullScreenBtn.addEventListener('click',full);