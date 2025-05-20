// Preloader
window.addEventListener('load', function() {
	setTimeout(function() {
		document.getElementById('preloader').style.opacity = '0';
		setTimeout(function() {
			document.getElementById('preloader').style.display = 'none';
		}, 500);
	}, 1500);
});

// Header scroll effect
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
	if (window.scrollY > 100) {
		header.classList.add('scrolled');
		backToTop.classList.add('active');
	} else {
		header.classList.remove('scrolled');
		backToTop.classList.remove('active');
	}
	
	// Activate nav links based on scroll position
	const scrollPosition = window.scrollY;
	
	document.querySelectorAll('section').forEach(section => {
		const sectionTop = section.offsetTop - 100;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute('id');
		
		if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
			document.querySelectorAll('.nav-link').forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${sectionId}`) {
					link.classList.add('active');
				}
			});
		}
	});
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', function() {
	navMenu.classList.toggle('active');
	this.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
	if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
		navMenu.classList.remove('active');
		mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
	}
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		
		if (this.getAttribute('href') === '#') return;
		
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 80,
				behavior: 'smooth'
			});
			
			// Close mobile menu if open
			if (navMenu.classList.contains('active')) {
				navMenu.classList.remove('active');
				mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
			}
		}
	});
});

// Products tabs
const productsTabs = document.querySelectorAll('.products-tab');
const productCards = document.querySelectorAll('.product-card');

productsTabs.forEach(tab => {
	tab.addEventListener('click', function() {
		// Remove active class from all tabs
		productsTabs.forEach(t => t.classList.remove('active'));
		
		// Add active class to clicked tab
		this.classList.add('active');
		
		// Get target category
		const target = this.getAttribute('data-target');
		
		// Show/hide product cards based on category
		productCards.forEach(card => {
			if (target === 'all' || card.getAttribute('data-category') === target) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	});
});

// Testimonial slider
const testimonialDots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialDots.forEach(dot => {
	dot.addEventListener('click', function() {
		const index = this.getAttribute('data-index');
		
		// Hide all testimonials
		testimonialCards.forEach(card => {
			card.style.display = 'none';
		});
		
		// Show selected testimonial
		testimonialCards[index].style.display = 'block';
		
		// Update dots state
		testimonialDots.forEach(d => {
			d.classList.remove('active');
		});
		this.classList.add('active');
	});
});

// Auto rotate testimonials
let currentTestimonialIndex = 0;

function rotateTestimonials() {
	currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
	
	// Hide all testimonials
	testimonialCards.forEach(card => {
		card.style.display = 'none';
	});
	
	// Show current testimonial
	testimonialCards[currentTestimonialIndex].style.display = 'block';
	
	// Update dots
	testimonialDots.forEach(dot => {
		dot.classList.remove('active');
	});
	testimonialDots[currentTestimonialIndex].classList.add('active');
}

// Rotate testimonials every 5 seconds
setInterval(rotateTestimonials, 5000);

// Counter animation
const counterItems = document.querySelectorAll('.counter-value');

function startCounter() {
	counterItems.forEach(counter => {
		const target = +counter.getAttribute('data-count');
		const duration = 2000; // 2 seconds
		const stepTime = 20;
		const totalSteps = duration / stepTime;
		const stepSize = target / totalSteps;
		let current = 0;
		let timer;
		
		timer = setInterval(() => {
			current += stepSize;
			counter.textContent = Math.floor(current);
			
			if (current >= target) {
				counter.textContent = target;
				clearInterval(timer);
			}
		}, stepTime);
	});
}

// Check if element is in viewport
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

// Counter section
const counterSection = document.querySelector('.counter-section');
let counterStarted = false;

function checkCounters() {
	if (isInViewport(counterSection) && !counterStarted) {
		startCounter();
		counterStarted = true;
	}
}

// Code animation in hero section
function createCodeLine() {
	const codeAnimation = document.getElementById('codeAnimation');
	const line = document.createElement('div');
	line.className = 'code-line';
	
	// Array of code snippets
	const codeSnippets = [
		"function optimizeProcess() { /* ... */ }",
		"const efficiency = calculateMetrics(data);",
		"if(isPublicAdministration) { implement(solutions); }",
		"class DigitalTransformation { /* ... */ }",
		"await fetchCitizenData();",
		"export default AdminPortal;",
		"const [isAuthenticated, setAuth] = useState(false);",
		"public static void main(String[] args) { }",
		"import { AdminModule } from './admin';",
		"@Component({ selector: 'app-root' })",
		"<Router><Route path='/dashboard' /></Router>",
		"SELECT * FROM citizens WHERE region = 'Valencia';",
		"try { processDocument(file); } catch(e) { }",
		"new Promise((resolve, reject) => { })",
		"const API_URL = process.env.BASE_URL;",
		"git commit -m 'Enhanced admin dashboard'",
		"docker-compose up -d"
	];
	
	// Get random code snippet
	const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
	line.textContent = randomSnippet;
	
	// Random position, speed and size
	const startPosition = Math.random() * 100;
	const speed = 10 + Math.random() * 20;
	const fontSize = 12 + Math.floor(Math.random() * 4);
	
	line.style.left = `${startPosition}%`;
	line.style.animationDuration = `${speed}s`;
	line.style.fontSize = `${fontSize}px`;
	
	codeAnimation.appendChild(line);
	
	// Remove line after animation completes
	setTimeout(() => {
		line.remove();
	}, speed * 1000);
}

// Create code lines at random intervals
setInterval(createCodeLine, 300);

// Modal functionality
const demoModal = document.getElementById('demoModal');
const modalClose = document.getElementById('modalClose');

// Open modal from any button with data-modal="demo"
document.querySelectorAll('[data-modal="demo"]').forEach(button => {
	button.addEventListener('click', function(e) {
		e.preventDefault();
		demoModal.classList.add('active');
	});
});

// Close modal
modalClose.addEventListener('click', function() {
	demoModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
	if (e.target === demoModal) {
		demoModal.classList.remove('active');
	}
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
	contactForm.addEventListener('submit', function(e) {
		e.preventDefault();
		
		// Simple validation
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const subject = document.getElementById('subject').value;
		const message = document.getElementById('message').value;
		
		if (!name || !email || !subject || !message) {
			alert('Por favor, complete todos los campos.');
			return;
		}
		
		// Here you would add your AJAX code to submit the form
		
		// Simulate successful submission
		alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
		contactForm.reset();
	});
}

// Demo form submission
const demoForm = document.getElementById('demoForm');

if (demoForm) {
	demoForm.addEventListener('submit', function(e) {
		e.preventDefault();
		
		// Simulate successful submission
		alert('¡Gracias por tu interés! Un asesor se pondrá en contacto contigo pronto para agendar tu demostración personalizada.');
		demoForm.reset();
		demoModal.classList.remove('active');
	});
}

// AOS initialization for animations on scroll
document.addEventListener('DOMContentLoaded', function() {
	// Initialize all elements with data-aos attribute
	const elementsWithAOS = document.querySelectorAll('[data-aos]');
	
	elementsWithAOS.forEach(element => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const delay = element.getAttribute('data-aos-delay') || 0;
					setTimeout(() => {
						element.classList.add('aos-animate');
					}, delay);
					observer.unobserve(element);
				}
			});
		}, { threshold: 0.1 });
		
		observer.observe(element);
	});
	
	// Start the counter if counter section is in view at load time
	checkCounters();
	
	// Initialize testimonials
	testimonialCards[0].style.display = 'block';
	testimonialDots[0].classList.add('active');
});

// Check counters and elements with AOS on scroll
window.addEventListener('scroll', function() {
	checkCounters();
});