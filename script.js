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

const container = document.querySelector('.h');
        
function getAuroraColor(i) {
    const colors = [
    // Almost black-blue
    {
      r: 3,
      g: 6,
      b: 20
  },
  // Very deep navy
  {
      r: 5,
      g: 10,
      b: 35
  },
  // Dark cosmic blue
  {
      r: 8,
      g: 15,
      b: 55
  },
  // Deep midnight blue
  {
      r: 12,
      g: 25,
      b: 75
  }
  ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

const numberOfAuroraElements = isMobile ? 20 : 50;

for (let i = 1; i <= numberOfAuroraElements; i++) {
    const circle = document.createElement('div');
    circle.className = 'c';
    
    const color = getAuroraColor(i);
    
    circle.style.cssText = `
        border: 2px solid rgba(255,255,255,0.08);
        border-radius: 400px;
        position: absolute;
        margin: auto;
        box-shadow: 3px 0px rgba(${color.r},${color.g},${color.b},${-(i/40)}), 
                   6px -5px rgba(${color.r-20},${color.g+30},${color.b-20},${-(i/40)});
        width: ${i * 12}px;
        height: ${i}px;
        right: ${i}px;
        bottom: ${i * 15}px;
        filter: blur(${i/3 + 8}px);
        transform-origin: ${i * 4}px ${i * 2}px;
        animation: spin 3s ${i/10}s linear infinite;
        background: rgba(${color.r}, ${color.g}, ${color.b}, ${1 - (i/80)});
        mix-blend-mode: screen;
    `;
    
    container.appendChild(circle);
}

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