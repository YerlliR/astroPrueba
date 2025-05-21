const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
	if (window.scrollY > 50) {
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

// animacion de hacer scroll
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