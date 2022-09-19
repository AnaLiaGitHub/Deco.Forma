class Pedido {

    constructor(fecha, productos, costo_total) {
        this.fecha = fecha;
		this.productos = productos;
        this.costo_total = costo_total;
		this.id = -1;
    }

    set_fecha() {
        this.fecha = new Date();
    }
}