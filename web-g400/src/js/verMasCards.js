document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".product-card");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const visibleCount = 6; // productos visibles inicialmente
    let currentCount = visibleCount;

    // Ocultar todos los productos que exceden el límite inicial
    products.forEach((product, index) => {
        if (index >= visibleCount) {
            product.style.display = "none";
        }
    });

    // Mostrar más productos al hacer clic en el botón
    loadMoreBtn.addEventListener("click", function () {
        const total = products.length;
        const nextCount = currentCount + visibleCount;

        for (let i = currentCount; i < nextCount && i < total; i++) {
            products[i].style.display = "block";
        }

        currentCount = nextCount;

        // Ocultar el botón si ya se mostraron todos
        if (currentCount >= total) {
            loadMoreBtn.style.display = "none";
        }
    });
});