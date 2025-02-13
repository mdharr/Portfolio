function debounce(func, wait) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const isMobile = window.innerWidth <= 768;

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
}, 250), { passive: true });

const video = document.getElementById('bgVideo');
if (video) {
    video.playbackRate = 0.75;
    if (isMobile) {
        video.setAttribute('playsinline', '');
        video.muted = true;
    }
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
    
    const interval = isMobile ? 750 : 500;
    
    setInterval(() => {
        favicon.href = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
    }, interval);
}

let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
let isScrollingUp = false;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
            isScrollingUp = currentScrollTop < lastScrollTop;
            lastScrollTop = currentScrollTop;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

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

// const shipImg = document.querySelector('#shipImg');
// if (shipImg) {
//   let currentScale = 1;
//   const scaleStep = 0.001;
//   const maxScale = 1.5;
//   const minScale = 1;
//   let lastScrollPos = window.pageYOffset;

//   window.addEventListener('scroll', debounce(() => {
//       requestAnimationFrame(() => {
//           const scrollPos = window.pageYOffset;
          
//           if (scrollPos === 0) {
//               currentScale = 1;
//           } else if (scrollPos > lastScrollPos) {
//               currentScale = Math.min(currentScale + scaleStep, maxScale);
//           } else {
//               currentScale = Math.max(currentScale - scaleStep, minScale);
//           }
          
//           shipImg.style.transform = `scale(${currentScale})`;
//           lastScrollPos = scrollPos;
//       });
//   }, 16));
// }

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      const target = entry.target;
      
      if (target.id === 'map-container' && entry.isIntersecting) {
          const mapUrl = target.getAttribute('data-map-url');
          const iframe = document.createElement('iframe');
          iframe.src = mapUrl;
          iframe.title = "Google Map";
          target.innerHTML = '';
          target.appendChild(iframe);
          target.classList.add('loaded');
          observer.unobserve(target);
          return;
      }
      
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

var canvas = document.getElementById("canvas");
canvas.setAttribute('mixedBlendMode', 'screen');
var ctx = canvas.getContext("2d");
var w, h;
var nt = 0;
var noise = new SimplexNoise();

const colors = [
    'rgb(3, 6, 20)',
    'rgb(5, 10, 35)',
    'rgb(8, 15, 55)',
    'rgb(12, 25, 75)'
];

function resizer() {
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = "blur(30px)";
}
resizer();
window.onresize = () => resizer();

function drawWave(n) {
    nt += 0.002;
    for(let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 30;
        ctx.strokeStyle = colors[i % colors.length];
        
        for(let x = 0; x < w; x += 30) {
            var y = noise.noise3D(x/800, 0.3 * i, nt) * 100;
            if (x === 0) {
                ctx.moveTo(x, y + (h/2));
            } else {
                ctx.lineTo(x, y + (h/2));
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
}

function render() {
    ctx.fillStyle = "rgb(3, 6, 20)";
    ctx.fillRect(0, 0, w, h);
    drawWave(4);
    requestAnimationFrame(render);
}
render();

document.addEventListener('DOMContentLoaded', () => {
    animateFavicon();
    
    const elementsToObserve = [
        document.querySelector('.animated-text'),
        document.querySelector('#skills h2'),
        document.querySelector('#education h2'),
        document.querySelector('#projects h2'),
        document.querySelector('#destinations h2'),
        document.querySelector('#map-container'),
    ].filter(Boolean);
  
    elementsToObserve.forEach(element => observer.observe(element));
});