// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const typingText = document.getElementById('typingText');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Text for typing animation
const typingStrings = [
  'Full Stack Developer',
  'Java Specialist',
  'Spring Boot Expert',
  'REST API Developer',
  'Problem Solver'
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initScrollAnimations();
  initSkillBars();
  initSmoothScrolling();
  
  // Add event listeners
  menuToggle.addEventListener('click', toggleMobileMenu);
  themeToggle.addEventListener('click', toggleTheme);
  backToTop.addEventListener('click', scrollToTop);
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Initialize project cards with hover effects
  initProjectCards();
  
  // Show back to top button on scroll
  window.addEventListener('scroll', handleScroll);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Theme Toggle
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Typing Effect
function initTypingEffect() {
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentString = typingStrings[stringIndex];
    
    if (isDeleting) {
      typingText.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentString.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      stringIndex = (stringIndex + 1) % typingStrings.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing after a brief delay
  setTimeout(type, 1000);
}

// Skill Bars Animation
function initSkillBars() {
  skillProgressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = '0%';
    
    // Animate when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = `${width}%`;
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(bar);
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Back to Top
function handleScroll() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Update active nav link
  updateActiveNavLink();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Update Active Nav Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('nav').offsetHeight;
    
    if (window.scrollY >= (sectionTop - headerHeight - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Project Cards Interaction
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Contact Form Submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Validate form
  if (!formData.name || !formData.email || !formData.message) {
    showFormError('Please fill in all required fields');
    return;
  }
  
  if (!isValidEmail(formData.email)) {
    showFormError('Please enter a valid email address');
    return;
  }
  
  // In a real implementation, you would send this to a server
  console.log('Form submitted:', formData);
  
  // Show success message
  showFormSuccess('Message sent successfully! I\'ll get back to you soon.');
  
  // Reset form
  contactForm.reset();
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormSuccess(message) {
  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = `<i class="fas fa-check"></i> ${message}`;
  submitBtn.style.background = '#10b981';
  submitBtn.disabled = true;
  
  // Reset button after 5 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    submitBtn.disabled = false;
  }, 5000);
}

function showFormError(message) {
  // Create error message element if it doesn't exist
  let errorEl = document.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.style.cssText = 'color: #ef4444; margin-top: 10px; font-size: 14px;';
    contactForm.appendChild(errorEl);
  }
  
  errorEl.textContent = message;
  
  // Remove error after 5 seconds
  setTimeout(() => {
    errorEl.textContent = '';
  }, 5000);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    toggleMobileMenu();
  }
  
  // Toggle theme with Ctrl/Cmd + T
  if ((e.ctrlKey || e.metaKey) && e.key === 't') {
    e.preventDefault();
    toggleTheme();
  }
});

// Add loading animation for images (if any)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const circles = document.querySelectorAll('.bg-circle');
  
  circles.forEach((circle, index) => {
    const speed = 0.2 + (index * 0.1);
    const yPos = -(scrolled * speed);
    circle.style.transform = `translateY(${yPos}px)`;
  });
});

// Performance optimization: Lazy load animations
let hasScrolled = false;
window.addEventListener('scroll', () => {
  if (!hasScrolled) {
    hasScrolled = true;
    initScrollAnimations();
  }
}, { once: true });
