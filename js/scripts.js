/* 
==============================================
VARIABLES GLOBALES
==============================================
*/

//Arreglo de piezas disponibles
let piezas = [];
//Arreglo de colores disponibles
let colores = [];
//Arreglo de precios de cada pieza
let precios = [];
//Arreglo de productos finales
let productosFinal = [];
//Url de base de datos json
const url = './js/db.json';
//Capturamos el contendor donde están todos los destacados
const destacadosHtml = document.querySelector('.destacados');

let cantCarrito = 0;
localStorage.clear();

/* 
==============================================
FUNCIONES
==============================================
*/

const cargarTipos = () => {

    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            piezas = data.piezas;
            guardarEnLocalStorage('piezas', piezas);
            cargarPiezas(piezas);
            onChangePiezas();

        })
}

const getDestacados = () => {

    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            const finales = data.finales;
            const destacados = finales.filter((p1) => p1.destacados == "S")
            finales.forEach((dest) => {
                destacadosHtml.innerHTML += `<div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="./img/${dest.img}" alt="..." />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">Producto Destacado</h5>
                            $${dest.precio}
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <button id="addCarrito" class="btn btn-outline-dark flex-shrink-0" type="button">
                    <i class="bi-cart-fill me-1"></i>
                    Agregar al carrito
                </button>
                    </div>
                </div>
            </div>`
            });


            //guardarEnLocalStorage('destacados', destacados);
            //cargarDestacados();

        })
}

const getColores = () => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            colores = data.colores;
            cargarColores(colores);
            onChangeColores()
        })

}

const getPrecios = () => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            precios = data.precios;

        })
}

const cargarPiezas = (array_pieza) => {
    let ul_tipo_producto = document.getElementById("ul_tipo_producto");
    array_pieza.forEach((tp) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.id = "li_" + tp.nombre;
        let input = document.createElement("input");
        input.className = "form-check-input me-1";
        input.type = "radio";
        input.name = "listPieza";
        input.value = tp.nombre;
        input.id = tp.id;

        let label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = "radio_" + tp.nombre;
        label.innerHTML = tp.nombre;
        label.style.marginLeft = "5px";

        li.appendChild(input);
        li.appendChild(label);

        ul_tipo_producto.appendChild(li);
    });
}

const cargarDestacados = () => {
    //destacados.innerHTML = '';
    let array_destacados = traerDeLocalStorage('destacados');
    //mostrar_notificacion(array_destacados);
    array_destacados.forEach((dest) => {
        mostrar_notificacion(dest.img);
        /* destacados.innerHTML += `<div class="col mb-5">
        <div class="card h-100">
            <img class="card-img-top" src=./img/"${dest.imagen}" alt="..." />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">Fancy Product</h5>
                    $40.00 - $80.00
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a>
                </div>
            </div>
        </div>
    </div>` */
    });

}


const onChangePiezas = () => {
    const radioButtonsTipo = document.querySelectorAll('input[name="listPieza"]');
    radioButtonsTipo.forEach(radio => radio.addEventListener('change', () => {
        let nom = radio.value;
        let imgProducto = document.getElementById("imgProducto");
        imgProducto.src = "./img/" + nom + ".jpg";
        guardarEnLocalStorage("pieza_nom", nom);
        guardarEnLocalStorage("pieza_id", radio.id);
        const precio = obtenerPrecio(radio.id);
        lb_precio.innerHTML = `$${precio}`
    }));
}

const onChangeColores = () => {
    const radioButtonsColor = document.querySelectorAll('input[name="listColor"]');
    radioButtonsColor.forEach(radio => radio.addEventListener('change', () => {
        guardarEnLocalStorage("color_nom", radio.value);
        guardarEnLocalStorage("color_id", radio.id);
        const idPieza = traerDeLocalStorage("pieza_id");
        const precio = obtenerPrecio(idPieza);
        guardarEnLocalStorage("precio", precio);
        lb_precio.innerHTML = `$${precio}`
    }));

}

const agregarAlCarrito = () => {
    let selectedTipo = localStorage.getItem('pieza_nom');
    let selectedColor = localStorage.getItem('color_nom');
    if (selectedTipo && selectedColor)
        cantCarrito++;
    let texto = selectedTipo && selectedColor ? `Has agregado al carrito ${selectedTipo} de color ${selectedColor}` : `No has seleccionado pieza o color.`;
    mostrar_notificacion(texto);
    guardarEnLocalStorage('cantCarrito', cantCarrito);
    cantCarritoSpan.innerHTML = cantCarrito;
}

const mostrar_notificacion = (texto) => {
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

const cargarColores = (array_colores) => {
    let div_colores = document.getElementById("colores");
    array_colores.forEach((col) => {
        let input = document.createElement("input");
        input.className = "form-check-input"
        input.type = "radio";
        input.name = "listColor";
        input.value = col.nombre;
        input.id = col.id;

        let label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = "radio_" + col.nombre;
        label.style.margin = "5px";
        let img = document.createElement("img");
        img.src = "./img/" + col.img;
        img.style.width = "48px"
        img.style.height = "48px"
        label.appendChild(img);

        div_colores.appendChild(input);
        div_colores.appendChild(label);

    });
}

/* 
==============================================
LÓGICA Y EVENTOS
==============================================
*/

let cantCarritoSpan = document.getElementById('cantCarrito');
cantCarritoSpan.innerHTML = cantCarrito;
let lb_producto_final = document.getElementById("lb_producto_final");
let lb_precio = document.getElementById("precio");
lb_producto_final.style.color = '#d63384'

const btn = document.querySelector('#btn');
btn.addEventListener("click", () => {
    let selectedTipo;
    let selectedColor;
    /* for (const radioButton of radioButtonsTipo) {
        if (radioButton.checked) {
            selectedTipo = radioButton.value;
            break;
        }
    }
    let selectedColor;
    for (const radioButtonC of radioButtonsColor) {
        if (radioButtonC.checked) {
            selectedColor = radioButtonC.value;
            break;
        }
    } */

    // show the output:
    selectedTipo = localStorage.getItem("pieza_nom");
    selectedColor = localStorage.getItem("color");
    lb_producto_final.innerText = selectedTipo && selectedColor ? `Tu pieza es ${selectedTipo} de color ${selectedColor}` : `No has seleccionado pieza o color.`;
});

const btnAddCarrito = document.getElementById('addCarrito');

btnAddCarrito.addEventListener("click", () => {
    const idPieza = localStorage.getItem('pieza_id');
    const idColor = localStorage.getItem('color_id');
    const precio = localStorage.getItem('precio');
    let pfinal = new ProductoFinal(idPieza, idColor, precio, "N", "", "");
    const carrito = traerDeLocalStorage('carrito');
    carrito.push(pfinal);
    productosFinal.push(pfinal);
    //Actualizamos localStorage
    guardarEnLocalStorage("carrito", carrito);
    //Mostramos un modal de producto agregado
    //mostrarCartelAgregado();
    agregarAlCarrito();
});

const obtenerPrecio = (id) => {
    const pieza = precios.find(p => p.idPieza == id);
    return pieza.precio
}

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

//Mostramos los datos al ingresar a la página index .html
cargarTipos();
getColores();
getPrecios();
getDestacados();
