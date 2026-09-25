// ========================================
// REPRODUCTOR DE NUESTRA PÁGINA ❤️
// ========================================


// Nuestro reproductor de audio
const reproductor = document.getElementById("reproductor");


// Todos los botones de reproducir
const botones = document.querySelectorAll(".boton-reproducir");


// ========================================
// CANCIONES
// ========================================

const canciones = {

    caramelo: {
        archivo: "Caramelo.mp3",

        // AQUÍ PONDREMOS EL FRAGMENTO
        inicio: 16,
        final: 53
    },


    nochePerfecta: {
        archivo: "Noche perfecta.mp3",

        inicio: 70,
        final: 100
    },


    labios: {
        archivo: "Labios de Cereza.mp3",

        inicio: 33,
        final: 97
    },


    mundo: {
        archivo: "El mundo a tus pies.mp3",

        inicio: 45,
        final: 92
    },


    princesa: {
        archivo: "Princesa.mp3",

        inicio: 105,
        final: 170
    }

};


// Canción que está reproduciéndose actualmente
let cancionActual = null;


// ========================================
// BOTONES
// ========================================

botones.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const nombreCancion = boton.dataset.cancion;

        const cancion = canciones[nombreCancion];


        // ========================================
        // SI ES LA MISMA CANCIÓN
        // ========================================

        if (
            cancionActual === nombreCancion &&
            !reproductor.paused
        ) {

            reproductor.pause();

            boton.textContent = "▶ Reproducir";

            boton.classList.remove("reproduciendo");

            return;
        }


        // ========================================
        // DETENER TODOS LOS BOTONES
        // ========================================

        botones.forEach(function (b) {

            b.textContent = "▶ Reproducir";

            b.classList.remove("reproduciendo");

        });


        // ========================================
        // CARGAR CANCIÓN
        // ========================================

        reproductor.src = cancion.archivo;

        reproductor.load();


        // Guardamos qué canción estamos reproduciendo
        cancionActual = nombreCancion;


        // ========================================
        // CUANDO CARGUE EL AUDIO
        // ========================================

        reproductor.addEventListener(
            "loadedmetadata",
            function iniciarCancion() {

                reproductor.currentTime = cancion.inicio;

                reproductor.play();

                boton.textContent = "⏸ Pausar";

                boton.classList.add("reproduciendo");


                // Eliminamos este evento para que
                // no se repita innecesariamente

                reproductor.removeEventListener(
                    "loadedmetadata",
                    iniciarCancion
                );

            }
        );

    });

});


// ========================================
// DETENER CUANDO LLEGUE AL FINAL
// ========================================

reproductor.addEventListener(
    "timeupdate",
    function () {

        if (cancionActual === null) {
            return;
        }


        const cancion = canciones[cancionActual];


        if (reproductor.currentTime >= cancion.final) {

            reproductor.pause();


            reproductor.currentTime = cancion.inicio;


            botones.forEach(function (boton) {

                boton.textContent = "▶ Reproducir";

                boton.classList.remove("reproduciendo");

            });

        }

    }
);
