// script.js - Código JavaScript corregido para todas las páginas

// ===== PARTICLES.JS CONFIGURACIÓN DIRECTA =====
document.addEventListener('DOMContentLoaded', function() {
  // Configuración directa de particles.js sin archivo JSON
  if (typeof particlesJS !== 'undefined') {
    // Configuración para todos los elementos particles
    const particlesConfig = {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { 
          enable: true, 
          distance: 150, 
          color: "#ffffff", 
          opacity: 0.4, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "none", 
          random: false, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      },
      retina_detect: true
    };

    // Aplicar a todos los elementos particles
    const particlesElements = ['particles-js', 'particles-js-contact', 'particles-js-projects'];
    
    particlesElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        particlesJS(id, particlesConfig);
        console.log(`Particles.js initialized for: ${id}`);
      }
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.querySelector('.navbar-custom');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
    
    // Aplicar inicialmente si ya se ha scrolleado
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    }
  }

  // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Solo aplicar a enlaces que no sean dropdown de Bootstrap
      if (this.parentElement.classList.contains('dropdown-item')) return;
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '#!') return;
      
      // Si es un enlace interno
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== ANIMACIÓN DE ELEMENTOS AL SCROLL =====
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .service-img, img, .animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  // Ejecutar una vez al cargar la página
  animateOnScroll();

  // ===== TOOLTIPS DE BOOTSTRAP =====
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // ===== AJUSTE DE ESPACIADO PARA NAVBAR FIJO =====
  function adjustNavbarSpacing() {
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');
    
    if (navbar && mainContent) {
      const navbarHeight = navbar.offsetHeight;
      mainContent.style.paddingTop = navbarHeight + 'px';
    }
  }

  // Ejecutar al cargar y al redimensionar
  adjustNavbarSpacing();
  window.addEventListener('resize', adjustNavbarSpacing);

  // ===== FORMULARIO DE CONTACTO (si existe) =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const alertBox = document.getElementById('formAlert');
      
      if (alertBox) {
        alertBox.classList.remove('d-none', 'alert-danger');
        alertBox.classList.add('alert', 'alert-success');
        alertBox.innerHTML = '<i class="fas fa-check-circle me-2"></i> ¡Mensaje enviado con éxito! Te contactaremos pronto.';
        this.reset();
        
        // Scroll suave a la alerta
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});

// ===== FUNCIÓN PARA CARGAR PARTICLES.JS DINÁMICAMENTE SI ES NECESARIO =====
function loadParticlesJS(callback) {
  if (typeof particlesJS === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  } else {
    callback();
  }
}