//Variables
const inputProducto = document.querySelector('#producto');
const inputPrecio = document.querySelector('#precio');
const formulario = document.querySelector("#formulario");
//Eventos
formulario.addEventListener('submit', agregarLista);
//formulario.addEventListener('submit', agregarProductos);

class Producto {

    resultados = [];

    sumaProductos(resultado) {
        this.resultados.push(resultado);
        console.log(this.resultados);

        const suma = this.resultados.reduce((total, valor) => total + valor, 0);
        limpiarSuma()

        const resultadoMostrar = document.querySelector('#resultado');
        const resultados = document.createElement('P');
        const mensajeSuma = document.createElement('P');
        mensajeSuma.textContent = `El total es: `;
        resultados.textContent = suma;

        resultadoMostrar.appendChild(mensajeSuma)
        resultadoMostrar.appendChild(resultados);  


        //Agrego estilos
        resultadoMostrar.classList.add('bg-white', 'flex', 'py-4', 'gap-2');

    }
}

class UI {
    agregarMensajes(mensaje, clase) {
        const campoVacio = document.querySelector('#campoVacio');
        const alert = document.createElement('P');
        if (clase === 'error') {
            alert.classList.add('bg-red-500', 'p-5')
            alert.textContent = mensaje;
        } else if (clase === 'exito') {
            alert.classList.add('bg-green-400', 'p-5');
            alert.textContent = mensaje;
        }
        campoVacio.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2000);
    }

    agregarCompras(articulo, precio) {
        const lista = document.querySelector('#lista');
        const item = document.createElement('li');

        item.innerHTML = `${articulo} tuvo el precio de ${precio}`;
        lista.appendChild(item);

        //darle estilos al texto
        item.classList.add('text-xl', 'font-bold', 'my-6');
    }
}

//Instancia de UI es global
const ui = new UI();
const sumar = new Producto();

//Funciones

//Valida si el formulario se esta llenando correctamente
//Valida la informacion del formulario para mandarla a un array
let producto = [];

function agregarLista(e) {
    e.preventDefault();
    limpiarAlerta();

    if (inputProducto.value === '' || inputPrecio.value === '' || isNaN(Number(inputPrecio.value))) {

        ui.agregarMensajes('Tienes que llenar el formulario correctamente', 'error');

    } else {
        limpiarCompras();
        ui.agregarMensajes('Exito', 'exito');

        let productos = inputProducto.value;
        let precios = parseInt(inputPrecio.value);

        let articulos = [];
        articulos.push(productos);
        articulos.push(precios);

        producto = [...producto, articulos];
        //Agregar al html

        producto.forEach(function (elemento) {
            ui.agregarCompras(elemento[0], elemento[1]);

        })
        //sumar
        sumar.sumaProductos(articulos[1]);

    }
    formulario.reset();
}


//Limpiar HTML
function limpiarAlerta() {
    const limpiar = document.querySelector('#campoVacio');
    limpiar.innerHTML = '';
}

function limpiarCompras() {
    const limpiarCompra = document.querySelector('#lista');
    limpiarCompra.innerHTML = '';
}

function limpiarSuma() {
    const limpiarSumas = document.querySelector('#resultado')
    limpiarSumas.innerHTML = '';
}



//Funcionalidad para que sumemos las cosas


///Hata aqui, maña errores que se ejecuta cuando hay nada y que se pasan cosas que son numeros