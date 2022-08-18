const wMax = 400

const init = () => {
    media = document.getElementById('media');
    play = document.getElementById('play');
    mute = document.getElementById('mute');
    bar = document.getElementById('bar');
    progress = document.getElementById('progress');
    valume = document.getElementById('valume');

    play.addEventListener('click', push);
    media.addEventListener('click', push);
    mute.addEventListener('click', muted);
    bar.addEventListener('click', move);
    valume.addEventListener('input', level);
    valume.value = media.volume;
}

function level() {
    media.volume = valume.value;
}

function move(e) {
    if (!media.ended) {
        let mouseX = e.pageX - bar.offsetLeft;
        progress.style.width = mouseX +'px';
        let newTime = mouseX * media.duration / wMax;
        media.currentTime = newTime;
    }
}

function muted() {
    if (media.muted) {
        media.muted = false;
        mute.style.textDecoration = 'none';
        mute.style.color = '#000';
    } else {
        media.muted = true;
        mute.style.textDecoration = "line-through";
        mute.style.color = '#999';
    }
}
function push() {
    if (!media.paused && !media.ended) {
        media.pause();
        play.value = 'Воспроизвести';
        clearInterval(loop);
         }
    else
        {
        media.play();
        play.value = 'Остановить'
        loop = setInterval(statusbar, 1000);
            }
}
    function statusbar() {
        
        if (!media.ended) {
            let size = media.currentTime * wMax / media.duration;
            progress.style.width = `${size}px`;
        } else
        {
            clearInterval(loop);
            play.value = 'Воспроизвести';
            progress.style.width = `0px`;
            }
    
    }
addEventListener('load', init);