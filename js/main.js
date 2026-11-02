// =========================================================================
// EVENTO PRINCIPAL DE CARGA DE LA PÁGINA
// =========================================================================
// window.onload se ejecuta únicamente cuando TODA la página HTML y sus recursos
// (imágenes, estilos, etc.) se han terminado de cargar por completo.
window.onload = function () {

    // 1. ACTUALIZAR EL AÑO EN EL FOOTER
    // Busca en el HTML el elemento que tiene la id "year" (el <span> de los derechos reservados).
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        // new Date().getFullYear() obtiene automáticamente el año actual de tu ordenador.
        // Asigna ese valor al texto del span.
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. MOSTRAR EL BANNER DE COOKIES SI EL USUARIO NO HA TOMADO UNA DECISIÓN
    // Busca el contenedor del banner de cookies en el HTML.
    const cookieBanner = document.getElementById('cookie-banner');
    
    // Comprueba si el banner existe Y si NO hay guardada ninguna decisión previa en el navegador.
    // localStorage.getItem('cookiesConsent') devuelve null si el usuario nunca hizo clic en Aceptar o Rechazar.
    if (cookieBanner && !localStorage.getItem('cookiesConsent')) {
        // Quita la clase "hidden" (oculto) de Tailwind CSS para que el aviso aparezca en pantalla.
        cookieBanner.classList.remove('hidden');
    }

    // 3. CERRAR EL MODAL DEL TELÉFONO AL HACER CLIC FUERA DE ÉL
    // Escucha cualquier clic que el usuario haga en cualquier parte de la ventana.
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('phoneModal');
        // event.target es el elemento exacto donde se hizo clic.
        // Si el clic fue directamente en el fondo oscuro del modal (el contenedor 'phoneModal')
        // y no en el recuadro blanco de dentro, cierra el modal.
        if (event && event.target === modal) {
            closePhoneModal();
        }
    });
};


// =========================================================================
// NAVEGACIÓN Y MENÚ MÓVIL
// =========================================================================

// Función para abrir o cerrar el menú desplegable en pantallas móviles
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    // classList.toggle agrega la clase "hidden" si no la tiene, o la quita si ya la tiene.
    if (menu) menu.classList.toggle('hidden');
}


// =========================================================================
// VENTANA EMERGENTE (MODAL) DEL TELÉFONO
// =========================================================================

// Muestra la ventana emergente con el número de teléfono
function openPhoneModal() {
    const modal = document.getElementById('phoneModal');
    // Elimina la clase "hidden" para hacer visible la ventana emergente.
    if (modal) modal.classList.remove('hidden');
}

// Oculta la ventana emergente del teléfono
function closePhoneModal() {
    const modal = document.getElementById('phoneModal');
    // Agrega la clase "hidden" para volver a ocultar el modal.
    if (modal) modal.classList.add('hidden');
}


// =========================================================================
// COPIAR EL NÚMERO DE TELÉFONO AL PORTAPAPELES
// =========================================================================

function copyPhoneNumber() {
    const phone = "982452754";

    // Intenta usar la API moderna de portapapeles del navegador si está disponible
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Copia el texto y, cuando termina con éxito, ejecuta showCopyFeedback()
        navigator.clipboard.writeText(phone).then(showCopyFeedback);
    } else {
        // MÉTODO ALTERNATIVO (para navegadores antiguos):
        // 1. Crea un campo de texto invisible en el HTML
        const tempInput = document.createElement("input");
        tempInput.value = phone;
        document.body.appendChild(tempInput);
        
        // 2. Selecciona el texto del campo y ejecuta el comando de copiar
        tempInput.select();
        document.execCommand("copy");
        
        // 3. Elimina el campo temporal del HTML
        document.body.removeChild(tempInput);
        
        // 4. Muestra la confirmación al usuario
        showCopyFeedback();
    }
}

// Muestra un mensaje temporal de confirmación en el botón después de copiar
function showCopyFeedback() {
    const copyText = document.getElementById('copyText');
    if (copyText) {
        // Cambia el texto del botón
        copyText.textContent = "¡Copiado en el portapapeles!";
        
        // setTimeout espera 2000 milisegundos (2 segundos) y vuelve a poner el texto original
        setTimeout(() => {
            copyText.textContent = "Copiar número";
        }, 2000);
    }
}


// =========================================================================
// GESTIÓN DEL BANNER DE COOKIES Y ALMACENAMIENTO LOCAL
// =========================================================================

// Se ejecuta cuando el usuario hace clic en "Aceptar todas"
function acceptCookies() {
    // Guarda en la memoria persistente del navegador la clave 'cookiesConsent' con valor 'accepted'
    localStorage.setItem('cookiesConsent', 'accepted');
    
    // Oculta el banner de cookies agregando la clase "hidden"
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('hidden');
}

// Se ejecuta cuando el usuario hace clic en "Rechazar"
function rejectCookies() {
    // Guarda en la memoria persistente del navegador la clave 'cookiesConsent' con valor 'rejected'
    localStorage.setItem('cookiesConsent', 'rejected');
    
    // Oculta el banner de cookies agregando la clase "hidden"
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('hidden');
}