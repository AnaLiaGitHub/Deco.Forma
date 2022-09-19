/* 
==============================================
VARIABLES GLOBALES
==============================================
*/
//Capturamos el contenedor donde pondremos el carrito
const carritoHtml = document.querySelector('.carrito');


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
    const piezas = traerDeLocalStorage('piezas');
    const precios = traerDeLocalStorage('precios');

    //Si no había nada nos dice que está vacío
    if (carrito.length == 0) {
        carritoHtml.innerHTML = `
                <div class="carrito__empty">
                    <p>Tu carrito está vacío</p>
                    <i class="bi bi-emoji-frown-fill"></i>
                </div>
        `;
    } else {
        //Si había productos guardados agrega al contenedor un 'ul' con el listado de todos los productos
        carrito.forEach((dest) => {
            let idPieza = JSON.parse(dest.idPieza);
            let pieza = piezas.find(p => p.id == idPieza);
            let precio = precios.find(p => p.idPieza == idPieza);
            carritoHtml.innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="../img/${pieza.nombre}.jpg" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${pieza.nombre}</h5>
                        $${precio.precio}
                    </div>
                </div>
            </div>
        </div>`
        });

    }
}

const obtenerPieza = (piezas, id) => {
    //alert(id);

    /* const pieza = piezas.find(p => p.idPieza === id);
    alert(pieza);
    return pieza; */
}


/* 
==============================================
LÓGICA Y EVENTOS
==============================================
*/


mostrarCarrito();