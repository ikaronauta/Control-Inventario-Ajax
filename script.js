function obtenerAjax(){

    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }
    else{
        xhttp = new ActiveXObject("Microsoft.HMLHTTP");
    }
    return xhttp;
}
var ajax = obtenerAjax();

//inicio.html
window.onload = function(){
    cargarPlantilla('inicio.html');
}
function cargarPlantilla(plantilla){
    //alert("Bien");
    ajax.open("GET", plantilla, true);
    ajax.onreadystatechange = respuestaCargar;
    ajax.send();
}
function respuestaCargar(){
    if(ajax.readyState == 4 && ajax.status == 200){
        document.getElementById("contenido").innerHTML = ajax.responseText;
    }
}

//Muestra vista "mostrar.html"
function cargarMostrar(mostrar){
    ajax.open("GET", mostrar, true);
    ajax.onreadystatechange = respuestaMostrar;
    ajax.send();
}
function respuestaMostrar(){//Carga la tabla en la vista "mostrar.html"
    if(ajax.readyState == 4 && ajax.status == 200){
        document.getElementById("contenido").innerHTML = ajax.responseText;
        cargarTabla();
    }
}

//Boton "Agregar" -  agregarproducto.php
function enviarProducto(){
    //alert("Bien");
    ajax.open("GET", "agregarproducto.php?" + obtenerQueryProducto(), true);
    ajax.onreadystatechange = respuestaAgregar;
    ajax.send();
}   
function respuestaAgregar(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var respuesta = JSON.parse(ajax.responseText);
        alert(respuesta.mensaje)
    }
}
function obtenerQueryProducto(){
    //var id = document.getElementById("id").value;
    var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var queryString = "nombre=" + encodeURIComponent(nombre) + "&cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
    return queryString;
}
    
//consultarproductos.php
function cargarTabla(){
    ajax.open("GET", "consultarproductos.php", true);
    ajax.onreadystatechange = respuestaTabla;
    ajax.send();
}
function respuestaTabla(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var respuesta = JSON.parse(ajax.responseText);
        if(respuesta.accion == 0){
            alert(respuesta.mensaje)
        }
        else{
            cargarDatos(respuesta.productos);
        }        
    }    
}

// ---Nodos--- Cargar Datos para tabla
function cargarDatos(productos){
    tabla = document.getElementById("tabla");

    for(var i = 0; i < productos.length; i++){
        var fila = document.createElement("tr");
        tabla.appendChild(fila);
        var celda1 = document.createElement("tr");
        fila.appendChild(celda1);
        var id = document.createTextNode(productos[i].id);
        celda1.appendChild(id);
        var celda2 = document.createElement("td");
        fila.appendChild(celda2);
        var nombre = document.createTextNode(productos[i].nombre);
        celda2.appendChild(nombre);
        var celda3 = document.createElement("td");
        fila.appendChild(celda3);
        var cantidad = document.createTextNode(productos[i].cantidad);
        celda3.appendChild(cantidad);   
    }
}

//----
//--------------- Actualizar --------------- 
//----

function cargarActualizar(actualizar){
    ajax.open("GET", actualizar, true);
    ajax.onreadystatechange = respuestaActualizar;
    ajax.send();
}

function respuestaActualizar(){
    if(ajax.readyState == 4 && ajax.status == 200){
        document.getElementById("contenido").innerHTML = ajax.responseText;
        cargarSelect();
    }
}

function cargarSelect(){
    ajax.open("GET", "consultarproductos.php", true);
    ajax.onreadystatechange = respuestaCargarSelect;
    ajax.send();
}
function respuestaCargarSelect(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var respuesta = JSON.parse(ajax.responseText);
        if(respuesta.accion == 0){
            alert(respuesta.mensaje)
        }
        else{
            cargarDatosSelect(respuesta.productos);
        }        
    }    
}
function cargarDatosSelect(productos){
    listaProductos = productos;
    select = document.getElementById("producto");
    for (var i = 0; i < productos.length; i++){        
        var option = document.createElement("option");
        option.value = productos[i].id;
        select.appendChild(option);
        var nombre = document.createTextNode(productos[i].nombre);
        option.appendChild(nombre);
    } 
}

function cargarCantidad(){
    productos = listaProductos;
    for (var i = 0; i < productos.length; i++){
        if (productos[i].id == document.getElementById("producto").value) {
            document.getElementById("cantidad").value = productos[i].cantidad;
        }
    }
}

function actualizarProducto() {
    ajax.open("GET", "actualizarProducto.php?" + obtenerQueryProducto1(), true);
    ajax.onreadystatechange = respuestaActualizarProducto;
    ajax.send();
    
}
function respuestaActualizarProducto(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var respuesta = JSON.parse(ajax.responseText);
        alert(respuesta.mensaje)
    }
}
function obtenerQueryProducto1(){
    //var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var queryString = "cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
    return queryString;
}