document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const splash = document.querySelector('#splash');
    const loading = document.querySelector('#splash .loading');
    const startButton = document.querySelector('#splash .start-button');

    const creditsToggle = document.querySelector('#splash .show-credits');
    const creditsList = document.querySelector('#splash .credits-list');

    const emitEvent = (eventName, listeners) => {
        listeners.forEach((listener) => {
            const el = document.querySelector(listener);
            el.emit(eventName);
        })
    };

    const emitMediaEvent = (eventType, listeners) => {
        listeners.forEach((listener) => {
            const el = document.querySelector(listener);
            el.components.sound[eventType]();
        })
    };

    const activateSoundsForTouch = () => {
    	const sounds = document.querySelectorAll('a-sound')
        sounds.forEach((soundEl) => {
            soundEl.components.sound.playSound();
            soundEl.components.sound.stopSound();
        })
    };

    var fuse = document.querySelector('#fuse-cursor');
    var fuseProgress = document.querySelector('#fuse-progress');

    scene.addEventListener('loaded', function (e) {
        setTimeout(() => {
            loading.style.display = 'none';
            splash.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
            startButton.style.opacity = 1;
            creditsToggle.style.opacity = 1;
        }, 50);
    });

    creditsToggle.addEventListener('click', function (e) {
    	e.preventDefault();

    	var display = creditsList.style.display === 'none'
            || creditsList.style.display === '' ? 'block' : 'none';
        
        creditsList.style.display = display;

        return false;
    });

    fuse.addEventListener('fusing', function (e) {
        fuseProgress.emit('fusing');
    });

    startButton.addEventListener('click', function (e) {
        activateSoundsForTouch();
        splash.style.display = 'none';
        emitEvent('scene-started', ['#main-camera', '#lisette-2', '#lisette-1', '#sphere-1', '#sphere-0', '#opening-text', '#planet', '#shuttle-light', '#shuttle-light', '#shuttle', '#shuttle']);
    });

    document.querySelector('#sphere-1').addEventListener('click', function (e) {
        emitEvent('sphere-1-clicked', ['#lisette-2']);
        emitMediaEvent('stopSound', ['#lisette-1']);
    });

    document.querySelector('#sphere-0').addEventListener('click', function (e) {
        emitEvent('sphere-0-clicked', ['#lisette-1', '#text-t', '#text-t', '#text-l-1', '#text-l-1', '#text-u', '#text-u', '#text-a-2', '#text-a-2', '#text-s-1', '#text-s-1', '#text-s', '#text-s', '#text-a-1', '#text-a-1', '#text-l', '#text-l', '#text-a', '#text-a', '#text-b', '#text-b', '#text-r', '#text-r', '#text-e', '#text-e', '#text-v', '#text-v']);
    });
});