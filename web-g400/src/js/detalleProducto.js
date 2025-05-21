// Este código se ejecutará solo en el cliente
export default function initProductDetail() {
  // Este código solo se ejecutará en el navegador
  console.log("Product detail script initialized");
}

// Envuelve todo el código que usa document/window en una comprobación
if (typeof document !== 'undefined') {
  // Función para cambiar la imagen
  window.changeImage = function(src) {
    document.getElementById('main-product-image').src = src;
    
    // Actualizar miniaturas activas
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    thumbnails.forEach(thumb => {
        if (thumb.querySelector('img').getAttribute('src') === src) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
  }

  // Esperar a que se cargue el DOM
  document.addEventListener("DOMContentLoaded", function() {
    // Tabs
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Eliminar clases activas
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activar tab y contenido seleccionado
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // FAQ acordeón
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // El código del menú móvil está comentado, pero si lo necesitas
    // se puede agregar aquí también
  });
}