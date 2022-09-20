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
    carritoHtml.innerHTML = ``;
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
            carritoHtml.innerHTML += `<div class="card mb-3" style="max-width: 1540px;">
            <div id=${idPieza} class="row g-0">
              <div class="col-md-6" style="max-width: 540px;">
                <img src="../img/${pieza.nombre}.jpg" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-6">
                <div class="card-body">
                  <h5 class="card-title">${pieza.nombre}</h5>
                  <p class="card-text">${pieza.nombre}</p>
                  <p class="card-text"><small class="text-muted">$${precio.precio}</small></p>
                  <button class="remove">Eliminar</button>
                </div>
              </div>
            </div>
          </div>`
            /* carritoHtml.innerHTML += `<div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top" src="../img/${pieza.nombre}.jpg" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${pieza.nombre}</h5>
                        $${precio.precio}
                    </div>
                </div>
            </div>
        </div>` */
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

carritoHtml.addEventListener('click', e => {
    //Si donde hacen clic es sobre el botón de eliminar
    if (e.target.classList.contains('remove')) {
        //Guardamos el id del producto
        const id = e.target.parentNode.parentNode.parentNode.id;
        //Traemos el carrito de localStorage
        let carrito = traerDeLocalStorage('carrito');
        //Eliminamos el producto que coincida con el id
        carrito = carrito.filter(p => p.idPieza != JSON.stringify(id));
        //Guardamos el carrito en localStorage
        guardarEnLocalStorage('carrito', carrito);
        guardarEnLocalStorage('cantCarrito', carrito.length);
        //Actualizamos la vista del carrito
        mostrarCarrito();
    }
});

mostrarCarrito();