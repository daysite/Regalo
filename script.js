// =====================
// VARIABLES PRINCIPALES
// =====================
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const mensajeAceptacion = document.getElementById('mensajeAceptacion');
const btnCerrar = document.getElementById('btnCerrar');

// =====================
// EFECTO BOTÓN "NO" ESQUIVO
// =====================
let contadorIntentosNo = 0;
const frasesDivertidas = [
    "¡Oh no! Casi me atrapas 😜",
    "¡Uy! Por aquí no, amigo/a 😅",
    "¿En serio crees que será tan fácil? 😏",
    "¡Te estás esforzando mucho! 💪",
    "Tal vez deberías intentar el otro botón... 🤔",
    "¡Persistentes los dos! 😂",
    "El botón 'SÍ' está muy solitario... 🥺",
    "¡Corre, corre que te alcanzo! 🏃‍♂️💨",
    "¿No te cansa perseguirme? 😴",
    "Última oportunidad antes de que gane el SÍ ⏰"
];

btnNo.addEventListener('mouseover', function(e) {
    contadorIntentosNo++;
    
    // Obtener dimensiones de la ventana y del botón
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;
    const anchoBoton = btnNo.offsetWidth;
    const altoBoton = btnNo.offsetHeight;
    
    // Generar posición aleatoria que mantenga el botón visible
    const maxX = anchoVentana - anchoBoton - 20;
    const maxY = altoVentana - altoBoton - 20;
    
    const nuevaX = Math.random() * maxX;
    const nuevaY = Math.random() * maxY;
    
    // Aplicar movimiento con transición suave
    btnNo.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    btnNo.style.position = 'fixed';
    btnNo.style.left = nuevaX + 'px';
    btnNo.style.top = nuevaY + 'px';
    
    // Cambiar color y agregar efecto de rebote
    btnNo.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
    
    // Agregar animación de sacudida
    btnNo.style.animation = 'shake 0.5s';
    
    // Cambiar el texto después de algunos intentos
    if (contadorIntentosNo === 3) {
        btnNo.innerHTML = '<i class="fas fa-running"></i> ¡Soy rápido!';
    } else if (contadorIntentosNo === 5) {
        btnNo.innerHTML = '<i class="fas fa-ghost"></i> ¡No me atrapas!';
    } else if (contadorIntentosNo === 7) {
        btnNo.innerHTML = '<i class="fas fa-grin-tongue-wink"></i> Sigue intentando...';
    }
    
    // Mostrar frase divertida en consola (puedes agregar un popup si quieres)
    if (contadorIntentosNo <= 10) {
        console.log(frasesDivertidas[contadorIntentosNo - 1]);
        
        // Mostrar notificación (opcional, descomenta si quieres)
        /*
        mostrarNotificacion(frasesDivertidas[contadorIntentosNo - 1]);
        */
    }
    
    // Después del 10mo intento, hacerlo más difícil
    if (contadorIntentosNo > 10) {
        btnNo.style.transition = 'all 0.3s';
    }
});

// Cuando el ratón entra en el botón "No" (para dispositivos táctiles también)
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    btnNo.dispatchEvent(new Event('mouseover'));
});

// =====================
// EFECTO BOTÓN "SÍ" - ACEPTACIÓN
// =====================
btnSi.addEventListener('click', function() {
    // Efecto de confeti o celebración
    crearConfeti();
    
    // Sonido de celebración (comentado porque requiere archivo de audio)
    // reproducirSonidoCelebracion();
    
    // Mostrar mensaje de aceptación después de un breve retraso
    setTimeout(function() {
        mensajeAceptacion.classList.add('visible');
        
        // Efecto especial en el mensaje
        const contenido = mensajeAceptacion.querySelector('.contenido-aceptacion');
        contenido.style.transform = 'scale(0.8)';
        contenido.style.opacity = '0';
        
        setTimeout(function() {
            contenido.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            contenido.style.transform = 'scale(1)';
            contenido.style.opacity = '1';
        }, 100);
    }, 800);
    
    // Cambiar texto del botón Sí
    btnSi.innerHTML = '<i class="fas fa-heart-broken"></i> ¡LO SABÍA! ¡ERES INCREÍBLE!';
    btnSi.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)';
    btnSi.style.transform = 'scale(1.2)';
    btnSi.style.boxShadow = '0 0 30px #4CAF50';
    
    // Deshabilitar botón No (opcional)
    btnNo.style.display = 'none';
});

// =====================
// BOTÓN CERRAR MENSAJE
// =====================
btnCerrar.addEventListener('click', function() {
    mensajeAceptacion.classList.remove('visible');
    
    // Puedes recargar la página o hacer otra acción
    // window.location.reload();
});

// =====================
// EFECTO DE CONFETI
// =====================
function crearConfeti() {
    const colores = ['#FF4081', '#E91E63', '#F50057', '#FF6B9D', '#FF8AB3'];
    const contenedor = document.querySelector('.contenedor');
    
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 15 + 5}px;
            height: ${Math.random() * 15 + 5}px;
            background: ${colores[Math.floor(Math.random() * colores.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.8 + 0.2};
            z-index: 9999;
            animation: caerConfeti ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confeti);
        
        // Eliminar confeti después de la animación
        setTimeout(() => {
            confeti.remove();
        }, 5000);
    }
    
    // Agregar animación CSS para el confeti
    if (!document.querySelector('#confeti-animation')) {
        const style = document.createElement('style');
        style.id = 'confeti-animation';
        style.textContent = `
            @keyframes caerConfeti {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                20%, 40%, 60%, 80% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// =====================
// NOTIFICACIONES DIVERTIDAS (OPCIONAL)
// =====================
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(233, 30, 99, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 16px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: aparecerNotificacion 0.5s, desaparecerNotificacion 0.5s 2.5s forwards;
    `;
    
    document.body.appendChild(notificacion);
    
    // Eliminar notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
    
    // Agregar animación CSS si no existe
    if (!document.querySelector('#notificacion-animation')) {
        const style = document.createElement('style');
        style.id = 'notificacion-animation';
        style.textContent = `
            @keyframes aparecerNotificacion {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes desaparecerNotificacion {
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// =====================
// EFECTOS ADICIONALES AL CARGAR LA PÁGINA
// =====================
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de entrada para la tarjeta
    const tarjeta = document.querySelector('.tarjeta');
    tarjeta.style.animation = 'aparecer 1.5s ease-out';
    
    // Crear más corazones en el fondo
    crearMasCorazones();
    
    // Mensaje de bienvenida en consola
    console.log('💖 Página de San Valentín cargada 💖');
    console.log('✨ Consejo: El botón "SÍ" está esperando tu clic ✨');
});

function crearMasCorazones() {
    const fondo = document.querySelector('.corazones-fondo');
    
    for (let i = 0; i < 15; i++) {
        const corazon = document.createElement('div');
        corazon.innerHTML = '❤';
        corazon.style.cssText = `
            position: absolute;
            color: rgba(255, 255, 255, 0.${Math.floor(Math.random() * 3 + 5)});
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            animation: lluvia-corazones ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 15}s;
            z-index: -1;
        `;
        fondo.appendChild(corazon);
    }
}

// =====================
// SONIDO (OPCIONAL - REQUIERE ARCHIVO DE AUDIO)
// =====================
function reproducirSonidoCelebracion() {
    // Descomenta y agrega tu archivo de sonido si quieres
    /*
    const audio = new Audio('celebración.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Error reproduciendo audio:", e));
    */
}

// =====================
// PROTECCIÓN CONTRA "INSPECCIONAR ELEMENTO"
// =====================
// Evita que puedan hacer clic derecho para inspeccionar (opcional)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    mostrarNotificacion("💝 Esta página es mágica, no necesita inspección 💝");
});

// Evita usar F12 (opcional)
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        mostrarNotificacion("💖 El amor no se inspecciona, se siente 💖");
    }
});
