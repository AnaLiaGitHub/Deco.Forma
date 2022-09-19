/* 
==============================================
VARIABLES GLOBALES
==============================================
*/

//Arreglo de piezas disponibles
let piezas2 = [];
//Url de base de datos json
const url2 = '../js/db.json';

/* 
==============================================
FUNCIONES
==============================================
*/

//Retorna el dato cuyo nombre pasamos por parámetro key, o un array vacío si no existe
const traerDeLocalStorage = (key) => {
    // console.log(localStorage.getItem('veamos-que-trae-si-la-key-no-existe'));
    let carrito = [];
    if (localStorage.getItem(key)) {
        carrito = JSON.parse(localStorage.getItem(key));
    }
    return carrito;
}

//Guarda value en el localStorage bajo el nombre que pasemos en el key
const guardarEnLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

//Función para mostrar el carrito
const mostrarCarrito = () => {
    //Traemos el carrito del localStorage
    const carrito = traerDeLocalStorage('carrito');
    //Si no había nada nos dice que está vacío
    if (carrito.length == 0) {
        contenedor.innerHTML = `
                <div class="carrito__empty">
                    <p>Tu carrito está vacío</p>
                    <i class="bi bi-emoji-frown-fill"></i>
                </div>
        `;
    } else {
        //Si había productos guardados agrega al contenedor un 'ul' con el listado de todos los productos
        //const ul = document.createElement('ul');
        //ul.setAttribute('class', 'carrito__listado');
        const carritoHtml = document.querySelector('.carrito');
        carritoHtml.innerHTML = '<p>Hola</p>';

        
        mostrar_notificacion(piezas2);
        
        
        // contenedor.appendChild(ul);
    }
};

const mostrar_notificacion_carrito = (texto) => {
    Toastify({
        text: texto,
        duration: 2000,
        style: {
            background: '-webkit-gradient(linear, left top, right top, from(#f5dcf9), color-stop(20%, #dce4f9), color-stop(40%, #dcf9e4), color-stop(60%, #fdfee0), color-stop(80%, #fff4e1), to(#ffe4e1))',
            color: 'darkslategray',
            border: '1px solid darkslategray'
        },
        gravity: 'top'
    }).showToast();
}


/* 
==============================================
LÓGICA Y EVENTOS
==============================================
*/

const getPiezas = () => {

    fetch(url2)
        .then((res) => res.json())
        .then((data) => {

            piezas2 = data.piezas;
            mostrar_notificacion(piezas2);

        })
}

mostrar_notificacion_carrito("Carrito")
//getPiezas();
//Mostramos el carrito apenas se carga la página
//mostrarCarrito();

