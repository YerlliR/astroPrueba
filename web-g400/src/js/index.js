window.addEventListener('scroll', function() {
		const header = document.querySelector('header');
		header.classList.toggle('sticky', window.scrollY > 0);
	});

	// Mobile Menu Toggle
	const menuToggle = document.querySelector('.mobile-menu-toggle');
	const navLinks = document.querySelector('.nav-links');

	if(menuToggle) {
		menuToggle.addEventListener('click', function() {
			navLinks.classList.toggle('active');
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			
			if(navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');
			}
			
			const target = document.querySelector(this.getAttribute('href'));
			if(target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	document.addEventListener('DOMContentLoaded', function() {

		if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
			return; // No aplicamos cursor personalizado en dispositivos táctil
		}
		
		const cursor = document.createElement('div');
		cursor.className = 'custom-cursor';
		document.body.appendChild(cursor);
		
		const follower = document.createElement('div');
		follower.className = 'custom-cursor-follower';
		document.body.appendChild(follower);
		
		// Mostrar los cursores personalizados
		cursor.style.display = 'block';
		follower.style.display = 'block';
		
		// Ocultar el cursor predeterminado
		document.body.style.cursor = 'none';
		
		// Aplicar a todos los elementos interactivos
		const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
		interactiveElements.forEach(el => {
			el.style.cursor = 'none';
		});
		
		// Mover cursor personalizado con el ratón
		document.addEventListener('mousemove', function(e) {
			cursor.style.left = e.clientX + 'px';
			cursor.style.top = e.clientY + 'px';
			
			setTimeout(function() {
				follower.style.left = e.clientX + 'px';
				follower.style.top = e.clientY + 'px';
			}, 80);
		});
		
		// Efecto hover en elementos interactivos
		interactiveElements.forEach(el => {
			el.addEventListener('mouseenter', function() {
				cursor.style.width = '50px';
				cursor.style.height = '50px';
				cursor.style.backgroundColor = 'var(--accent)';
				cursor.style.mixBlendMode = 'normal';
				cursor.style.filter = 'blur(5px)';
			});
			
			el.addEventListener('mouseleave', function() {
				cursor.style.width = '20px';
				cursor.style.height = '20px';
				cursor.style.backgroundColor = 'var(--primary)';
				cursor.style.mixBlendMode = 'difference';
				cursor.style.filter = 'blur(0)';
			});
		});
		
		// Añadir barra de progreso de desplazamiento
		const scrollProgress = document.createElement('div');
		scrollProgress.className = 'scroll-progress';
		document.body.appendChild(scrollProgress);
		
		// Actualizar barra de progreso al desplazar
		window.addEventListener('scroll', function() {
			const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrolled = (windowScroll / height) * 100;
			scrollProgress.style.width = scrolled + '%';
		});
		
		// Agregar animaciones al desplazar
		const fadeElements = document.querySelectorAll('.section-header, .feature-card, .product-card, .service-card, .certification-card, .blog-card');
		
		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('fade-in', 'active');
					}
				});
			}, {
				threshold: 0.1
			});
			
			fadeElements.forEach(element => {
				element.classList.add('fade-in');
				observer.observe(element);
			});
		} else {
			// Fallback para navegadores que no soportan IntersectionObserver
			fadeElements.forEach(element => {
				element.classList.add('fade-in', 'active');
			});
		}
	});