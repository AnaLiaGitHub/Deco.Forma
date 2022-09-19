class Pieza {

    constructor(id, nombre, precio, color) {
		
		this.id = id;
        this.nombre = nombre;
		this.color = color;
        this.precio = parseFloat(precio);

    }


    mostrar_producto() {

        return ("La pieza " + this.nombre
            + " de color " + this.color
            + " tiene un precio de $" + this.precio);
		
    }

	/* set_id(nuevo_id) {
		this.id = nuevo_id;
	} */

}