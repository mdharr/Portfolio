function debounce(func, wait) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const menuEle = document.querySelector('#menu');
const menuItems = document.querySelectorAll('#menu li a');

function toggleMobileMenu() {
  menuEle.classList.toggle("active");
}

function closeMobileMenu() {
  if (menuEle.classList.contains("active")) {
      menuEle.classList.toggle("active");
  }
}

menuItems.forEach(item => item.addEventListener('click', closeMobileMenu));

window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 768) {
      menuEle.classList.remove('active');
  }
}, 250));

const video = document.getElementById('bgVideo');
if (video) {
  video.playbackRate = 1;
  
  // Use requestAnimationFrame for smooth transition
  // let brightnessTransition;
  // video.addEventListener('timeupdate', () => {
  //     if (brightnessTransition) cancelAnimationFrame(brightnessTransition);
      
  //     brightnessTransition = requestAnimationFrame(() => {
  //         const timeLeft = video.duration - video.currentTime;
  //         video.style.filter = `brightness(${timeLeft < 2 ? 0.3 : 1})`;
  //     });
  // });
}

function animateFavicon() {
  const favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) return;

  const frames = [
      'imgs/favicon-1.svg',
      'imgs/favicon-2.svg',
      'imgs/favicon-1.svg'
  ];
  let currentFrame = 0;
  
  setInterval(() => {
      favicon.href = frames[currentFrame];
      currentFrame = (currentFrame + 1) % frames.length;
  }, 500);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      const target = entry.target;
      const sectionId = target.classList.contains('animated-text') ? null : target.closest('section')?.id;
      
      if (entry.isIntersecting) {
          target.classList.add('visible');
          if (sectionId) document.getElementById(sectionId)?.classList.add('visible');
      } else if (isScrollingUp && !entry.isIntersecting) {
          target.classList.remove('visible');
          if (sectionId) document.getElementById(sectionId)?.classList.remove('visible');
      }
  });
}, {
  threshold: 0,
  rootMargin: '0px'
});

let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
let isScrollingUp = false;
let scrollTimeout;

window.addEventListener('scroll', debounce(() => {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  isScrollingUp = currentScrollTop < lastScrollTop;
  lastScrollTop = currentScrollTop;
}, 16));

document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          if (!video) return;
          
          if (!entry.isIntersecting) {
              video.pause();
              video.removeAttribute('src');
          } else {
              video.src = video.dataset.src || video.src;
          }
      });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
      const video = card.querySelector('video');
      if (video) {
          video.dataset.src = video.src;
          video.removeAttribute('src');
          
          card.addEventListener('mouseenter', () => {
              if (!video.src) video.src = video.dataset.src;
              video.loop = true;
              video.play().catch(() => {});
          });

          card.addEventListener('mouseleave', () => {
              video.pause();
              video.currentTime = 0;
          });

          videoObserver.observe(card);
      }
  });
});

const shipImg = document.querySelector('#shipImg');
if (shipImg) {
  let currentScale = 1;
  const scaleStep = 0.005;
  const maxScale = 3;
  const minScale = 1;
  let lastScrollPos = window.pageYOffset;

  window.addEventListener('scroll', debounce(() => {
      requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset;
          
          if (scrollPos === 0) {
              currentScale = 1;
          } else if (scrollPos > lastScrollPos) {
              currentScale = Math.min(currentScale + scaleStep, maxScale);
          } else {
              currentScale = Math.max(currentScale - scaleStep, minScale);
          }
          
          shipImg.style.transform = `scale(${currentScale})`;
          lastScrollPos = scrollPos;
      });
  }, 16));
}

document.addEventListener('DOMContentLoaded', () => {
  animateFavicon();
  
  const elementsToObserve = [
      document.querySelector('.animated-text'),
      document.querySelector('#skills h2'),
      document.querySelector('#education h2'),
      document.querySelector('#projects h2')
  ].filter(Boolean);

  elementsToObserve.forEach(element => observer.observe(element));
});