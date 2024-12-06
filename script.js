function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

// Configure GSAP
gsap.config({
    nullTargetWarn: false
});

// Custom ease for animations
const easeInOutExpo = "0.87, 0, 0.13, 1";
const easeOutExpo = "0.16, 1, 0.3, 1";
const easeInExpo = "0.7, 0, 0.84, 0";


// function animateLogo() {

//     var tl = gsap.timeline({
//         repeat: -1
//     });
    
//     var tlRight = gsap.timeline({
//         repeat: -1
//     });

//     CustomEase.create("easeInOutExpo", easeInOutExpo);

//     tl.to(".circle-left", {
//         x: 6,
//         y: 0,
//         z: 0,
//         duration: 2,
//         ease: "easeInOutExpo"
//     }).to(".circle-left", {
//         x: 0,
//         y: 0,
//         z: 0,
//         duration: 2,
//         ease: "easeInOutExpo"
//     });

//     tlRight.to(".circle-right", {
//         x: -6,
//         y: 0,
//         z: 0,
//         duration: 2,
//         ease: "easeInOutExpo"
//     }).to(".circle-right", {
//         x: 0,
//         y: 0,
//         z: 0,
//         duration: 2,
//         ease: "easeInOutExpo"
//     });
// }

// window.addEventListener("load", function() {
//     animateLogo();
// });

const video = document.getElementById('bgVideo');
video.playbackRate = 1;

video.addEventListener('timeupdate', function() {
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft < 2) {
        video.style.filter = 'brightness(0.3)';
        video.style.transition = 'filter 2s';
    } else {
        video.style.filter = 'brightness(1)';
        video.style.transition = 'filter 2s';
    }
});

function animateFavicon() {
    const favicon = document.querySelector('link[rel="icon"]');
    const frames = [
        'imgs/favicon-1.svg',
        'imgs/favicon-2.svg',
        'imgs/favicon-1.svg'
    ];
    let currentFrame = 0;

    setInterval(() => {
        favicon.href = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
    }, 100);
}

window.addEventListener('DOMContentLoaded', animateFavicon);

let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
let isScrollingUp = false;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  isScrollingUp = currentScrollTop < lastScrollTop;
  lastScrollTop = currentScrollTop;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('animated-text')) {
        entry.target.classList.add('visible');
      } else {
        const sectionId = entry.target.closest('section').id;
        document.getElementById(sectionId).classList.add('visible');
      }
    } else if (isScrollingUp && !entry.isIntersecting) {
      if (entry.target.classList.contains('animated-text')) {
        entry.target.classList.remove('visible');
      } else {
        const sectionId = entry.target.closest('section').id;
        document.getElementById(sectionId).classList.remove('visible');
      }
    }
  });
}, {
  threshold: 0,
  rootMargin: '0px'
});

const animatedText = document.querySelector('.animated-text');
const skillsH2 = document.querySelector('#skills h2');
const educationH2 = document.querySelector('#education h2');
const projectsH2 = document.querySelector('#projects h2');

observer.observe(animatedText);
observer.observe(skillsH2);
observer.observe(educationH2);
observer.observe(projectsH2);