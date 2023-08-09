//No tocar nada de este archivo a menos que sepas lo que estas haciendo
//si vas a cargar nuevas imagenes ve a la marca "Cambia las imagenes aquí"

let iconos = []
let selecciones = []

let cantidadTarjetas = 18;
if (!localStorage.getItem('cantidadTarjetas')) {
    localStorage.setItem('cantidadTarjetas', cantidadTarjetas);
} else {
    cantidadTarjetas = localStorage.getItem('cantidadTarjetas');
}

let maxIntentos = 12;
if (!localStorage.getItem('maxIntentos')) {
    localStorage.setItem('maxIntentos', maxIntentos);
} else {
    maxIntentos = localStorage.getItem('maxIntentos');
}

let intentos = 0;
let puntos = 0;

let titulo = ''
if (!localStorage.getItem('titulo')) {
    localStorage.setItem('titulo', titulo);
} else {
    titulo = localStorage.getItem('titulo');
}

let color = '#ff0fff';
if (!localStorage.getItem('fondo')) {
    localStorage.setItem('fondo', color);
} else {
    color = localStorage.getItem('fondo');
}

window.onload = function () {
    document.getElementById('body').style.backgroundColor = localStorage.getItem('fondo');
    document.getElementById('body').style.padding = '0px';
    document.getElementById('title').textContent = localStorage.getItem('titulo');
    generarTablero()
}

document.getElementById('fondo').onchange = function (e) {
    color = e.target.value
    document.getElementById('body').style.backgroundColor = color
    localStorage.setItem('fondo', color);
}

//-------------------------------------------------------------------------------------------------------
//Cambia las imagenes aquí
//Antes de cambiar las imagenes asegurate de que sean cuadradas y que tengan el mismo tamaño.
//Si no sabes como hacerlo puedes usar el siguiente link: https://www.iloveimg.com/es/cambiar-tamaño-de-imagen
//Ten en cuenta el nombre de las imagenes, procura que no tengan nungun espacio en blanco
//y que no tengan caracteres especiales como: ñ, acentos, guiones etc.
//la recomendación es que le ponga por ejemplo 1.jpg, 2.jpg, 3.jpg etc.
//
//Tambien asegurese que todas las imagenes esten en la carpeta "image" que esta en este mismo directorio
//-------------------------------------------------------------------------------------------------------

function cargarImagenes() {
    image = [
/*Línea 64 */'<img src="./image/1.gif">',
        '<img src="./image/2.gif">',
        '<img src="./image/3.gif">',
        '<img src="./image/4.gif">',
        '<img src="./image/5.gif">',
        '<img src="./image/6.gif">',
        '<img src="./image/7.gif">',
        '<img src="./image/8.gif">',
        '<img src="./image/9.gif">',
        '<img src="./image/10.gif">',
        '<img src="./image/11.gif">',
        '<img src="./image/12.gif">',
        '<img src="./image/13.gif">',
        '<img src="./image/14.gif">'
    ]
    image.sort(function () { return Math.random() - 0.5 });
}

//Aqui puedes cambiar la imagen principal
//Busca la parte del codigo que dice: <!-- Cambiar la imagen principal -->
//y cambia el src por la ruta de la imagen que quieras
function generarTablero() {
    cargarImagenes()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < cantidadTarjetas; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${image[0]}
                </div>
                <div class="cara superior">

                    <!-- Cambiar la imagen principal -->
<!-- Línea 119-->   <img src="./image/dorso.gif">

                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            image.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
    intentos = 0
    puntos = 0
    document.getElementById("intentos").innerHTML = intentos
    document.getElementById("puntos").innerHTML = puntos
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []

    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
            intentos++
            document.getElementById("intentos").innerHTML = intentos
        } else {
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
            if (intentos === maxIntentos - 1) {
                Swal.fire({
                    title: 'Ufff!, casi...',
                    text: 'Te ganaste un intento extra',
                    confirmButtonText: 'Jugar de nuevo',
                    confirmButtonColor: '#15eb18',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        intentos = maxIntentos - 1
                    }
                })
            }else{
                intentos++
                document.getElementById("intentos").innerHTML = intentos
            }
            puntos += 5
            document.getElementById("puntos").innerHTML = puntos
        }

        if (intentos == maxIntentos) {
            swal.fire({
                title: "¡Perdiste! Llegaste a " + maxIntentos + " intentos.",
                text: "No completaste el juego. Acumulaste " + puntos + " puntos.",
                icon: "error",
                confirmButtonText: "Jugar de nuevo",
                confirmButtonColor: "#ff0000",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    generarTablero()
                }
            })
        }

        if (verificar()) {
            swal.fire({
                title: "¡Ganaste!",
                text: "Acumulaste " + puntos + " puntos.",
                icon: "success",
                confirmButtonText: "Jugar de nuevo",
                confirmButtonColor: "#15eb18",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    generarTablero()
                }
            })
        }
    }, 1000);
}

function verificar() {
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false
        }
    }
    return true
}
//verificar que intento para dar otra oportunidad
function verificarIntento() {

}


// Cambio Titulo
document.getElementById('icon').onclick = async () => {
    const { value: title } = await Swal.fire({
        title: 'Cambiar Título',
        input: 'text',
        inputPlaceholder: 'Escribe el nuevo título',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if(value == ''){
              document.getElementById('title').innerHTML = '';
              localStorage.setItem('titulo', '');
            }
          }
    })

    if (title) {
        Swal.fire(`¡Nuevo título: ${title}!`)
        document.getElementById('title').innerHTML = title
        localStorage.setItem('titulo', title);
    }
}

// Cambio Cantidad Tarjetas
document.getElementById('icon2').onclick = async () => {
    const { value: cant } = await Swal.fire({
        title: 'Cantidad de tarjetas',
        input: 'number',
        inputPlaceholder: 'Escribe la cantidad',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes poner un numero!'
            }
        }
    })

    if (cant) {
        Swal.fire(`¡Se generará un tablero con ${cant} fichas!`)
        localStorage.setItem('cantidadTarjetas', cant);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// Cambio cantidad de intentos
document.getElementById('container_intentos').onclick = async () => {
    const { value: cant } = await Swal.fire({
        title: 'Cantidad máxima de intentos',
        input: 'number',
        inputPlaceholder: 'Escribe la cantidad',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes poner un numero!'
            }
        }
    })

    if (cant) {
        Swal.fire(`¡Se configuró un máximo de ${cant} intentos!`)
        localStorage.setItem('maxIntentos', cant);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}



