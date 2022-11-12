
const myModal= document.getElementById('myModal');
const modalEl = new bootstrap.Modal(myModal);
document.getElementById("cuotas").addEventListener("change", function() {
  var e = document.getElementById("cuotas");
  var value = e.value;
  totalPago(value);
});

if(sessionStorage.getItem('carrito')) {
  var carrito = JSON.parse(sessionStorage.getItem('carrito'));
  items = carrito.length;
  var precio = 0;
  var nombreProducto = "";
  var totalCarrito = 0;
  var tablacarrito ="";
  var usuario;
  for (var i = 0; i < items; i++){
      var x = JSON.parse(carrito[i]);
      usuario = x.usuario;
      precio = parseFloat(x.precio.split('$')[1]);
      nombreProducto = x.nombreProducto;
      tablacarrito += "<tr><td>" + nombreProducto + "</td><td>$" + precio.toFixed(2) + "</td></tr>";
      totalCarrito += precio;
  }
  moment.locale('es');

  document.getElementById("usuario").innerHTML = "Usuario: <b>"+ usuario + "</b> Fecha: " + moment().format("D-M-Y");
  document.getElementById("tabla").innerHTML = tablacarrito;
  document.getElementById("total").innerHTML = totalCarrito.toFixed(2);
}



function getAhora12(cantCuotas, monto) {
  let total = 0;
  switch (cantCuotas) {
    case '0':
    total =  monto - (monto * 0.10);
      break;
    case '6':
    total = ((monto * 30 / 100) + Number(monto)) / 6;
      break;
    case '12':
    total = ((monto * 55 / 100) + Number(monto)) / 12;
      break;

    default:
      break;
  }
  return total;
}


function totalPago(tipo) {

  let total = getAhora12(tipo, totalCarrito);
  let mensaje;
  if (tipo ==  0) {
    mensaje = "$ " + total
  } else if (tipo > 0 ) {
    mensaje = tipo + " cuotas de $" + total.toFixed(2);
  } else {
    mensaje ="";
  }

  document.getElementById("totalPago").innerHTML = mensaje;

}
redirectTime = "1000";
redirectURL = "index.html";
function timedRedirect() {
    setTimeout("location.href = redirectURL;",redirectTime);
}

function pagar() {
  modalEl.show();
  timedRedirect();
};









