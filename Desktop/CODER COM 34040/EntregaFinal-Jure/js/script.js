
const myModal= document.getElementById('myModal');
const modalEl = new bootstrap.Modal(myModal);
modalEl.show();

var usuario;
function guardar() {
    usuario =  document.getElementById("usuario").value;
};

const productos = document.querySelector('#listado');
fetch('/productos.json')
.then((res) => res.json())
.then((data) => {

    data.forEach((p) => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="nombreProducto">${p.nombre}</h5>
            <p>${p.tipo}</p>
            <p class="card-text">${p.descripcion}</p>
            <p class="precio">$${p.precio}</p>
            <button class="agregar btn btn-primary" onclick='agregarCarrito(this)'>Agregar</button>
          </div>
        </div>
      `;
      div.classList.add('col-sm-3');
        productos.append(div);
    });

});


actualizarCarritoTotal();


document.getElementById("vaciarcarrito").addEventListener("click", vaciarCarrito);
document.getElementById("comprar").addEventListener("click", function(){
    document.location.href = 'carrito.html';
});

/*var btns = document.getElementsByClassName('agregar');
for (var i = 0; i < btns.length; i++) {
    console.log(i);
    btns[i].addEventListener('click', function() {agregarCarrito(this);});

}
*/
function agregarAlCarrito(nombreProducto) {
    var mensaje = nombreProducto + " fue agregado al carrito";
    var alerta = document.getElementById("alerta");
    alerta.innerHTML = mensaje;
    if(!alerta.classList.contains("alert", "alert-success")){
       alerta.classList.add("alert", "alert-success");
    }
  }

function vaciarCarrito() {
    if(sessionStorage.getItem('carrito')){
        sessionStorage.removeItem('carrito');
        actualizarCarritoTotal();
    var alerta = document.getElementById("alerta");
    alerta.innerHTML = "";
    if(alerta.classList.contains("alert", "alert-success")){
        alerta.classList.remove("alert", "alert-success");
    }
    }
}

function agregarCarrito(elem) {

    var precio;
    var nombreProducto;
    var carrito = [];
    var s = [];
    var jsonCarrito;
    console.log(elem.previousSibling);
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue;
        if(elem.className == "precio"){
            precio = elem.innerText;
        }
        if (elem.className == "nombreProducto") {
            nombreProducto = elem.innerText;
        }
        s.push(elem);
    }
    //Objeto Producto
    var producto = {
        usuario: usuario,
        nombreProducto : nombreProducto,
        precio : precio
    };
    console.log(producto);
    //----------------
    var stringProduct = JSON.stringify(producto);

    if(!sessionStorage.getItem('carrito')){
        carrito.push(stringProduct);
        jsonCarrito = JSON.stringify(carrito);
        sessionStorage.setItem('carrito', jsonCarrito);
        agregarAlCarrito(nombreProducto);
        actualizarCarritoTotal();
    }
    else {

       carrito = JSON.parse(sessionStorage.getItem('carrito'));
        carrito.push(stringProduct);
        jsonCarrito = JSON.stringify(carrito);
        sessionStorage.setItem('carrito', jsonCarrito);
        agregarAlCarrito(nombreProducto);
        actualizarCarritoTotal();
    }
}

function actualizarCarritoTotal(){

    var total = precio = items = 0;
    var nombreProducto = tablacarrito = "";
    if(sessionStorage.getItem('carrito')) {
        var carrito = JSON.parse(sessionStorage.getItem('carrito'));
        items = carrito.length;
        for (var i = 0; i < items; i++){
            var x = JSON.parse(carrito[i]);
            precio = parseFloat(x.precio.split('$')[1]);
            nombreProducto = x.nombreProducto;
            tablacarrito += "<tr><td>" + nombreProducto + "</td><td>$" + precio.toFixed(2) + "</td></tr>";
            total += precio;
        }
    }
    //Completo los datos de la tabla
    document.getElementById("tabla").innerHTML = tablacarrito;
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("cantidad").innerHTML = items;
}

