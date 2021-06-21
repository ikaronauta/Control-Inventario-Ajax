function obtenerAjax()
{
	if (window.XMLHttpRequest) 
	{
		xhttp = new XMLHttpRequest();
	}
	else 
	{
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhttp;
}
var ajax = obtenerAjax();

window.onload = function() 
{
	cargarPlantilla('inicio.html');
}

function cargarPlantilla(plantilla)
{
	//alert("HOLA"); 
	ajax.open("GET", plantilla, true);
	ajax.onreadystatechange = respuestaCargar;
	ajax.send();
}

listaP = [];

function respuestaCargar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
	}
}

/**********************************************************************METODOS MOSTRAR*********************************************************************/

function cargarMostrar()
{
	//alert(obtenerQueryProducto());	
	ajax.open("GET", "mostrar.html", true);
	ajax.onreadystatechange = respuestaMostrar;
	ajax.send();
}

function respuestaMostrar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
		cargarTabla();
	}
}

function cargarTabla()
{
	ajax.open("GET", "consultarProductos.php", true);
	ajax.onreadystatechange = respuestaTabla;
	ajax.send();
}

function respuestaTabla()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		respuesta = JSON.parse(ajax.responseText);
		if (respuesta.accion == 0) 
		{
			alert(respuesta.mensaje);
		}
		else
		{
			cargarDatos(respuesta.productos);
		}
	}
}

function cargarDatos(productos)
{
	tabla = document.getElementById("tabla");
	for (var i = 0; i < productos.length; i++) 
	{
		var fila = document.createElement("tr");
		tabla.appendChild(fila);
		var celda1 = document.createElement("td");
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

/**********************************************************************METODOS AGREGAR*********************************************************************/

function enviarProducto()
{
	ajax.open("GET", "agregarProducto.php?" + obtenerQueryProducto(), true);
	ajax.onreadystatechange = respuestaAgregar;
	ajax.send();
}

function respuestaAgregar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		var respuesta = JSON.parse(ajax.responseText);
		alert(respuesta.mensaje)
	}
}

function obtenerQueryProducto()
{
	var id = document.getElementById("id").value;
	var nombre = document.getElementById("nombre").value;
	var cantidad = document.getElementById("cantidad").value;
	var queryString = "id=" + encodeURIComponent(id) + "&nombre=" + encodeURIComponent(nombre) + "&cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
	return queryString;
}

/**********************************************************************METODOS PARA MOSTRAR LOS PRODUCTOS EN LA VISTA ACTUALIZAR*********************************************************************/

/*function cantidadProducto(id)
{
	ajax.open("GET", "actualizar.php?" + obtenerQueryIdCantidad(), true);
	ajax.send();
}

function obtenerQueryIdCantidad()
{
	var id = document.getElementById("producto").value;
	var queryString = "id=" + encodeURIComponent(id) + "&nocache=" + Math.random();
	return queryString;
}*/

function mostrarSelect()
{
	ajax.open("GET", "actualizar.php", true);
	ajax.onreadystatechange = respuestaMostrarSelect;
	ajax.send();
}

function respuestaMostrarSelect()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
		cargarSelect();
	}
}

function cargarSelect()
{
	//alert(obtenerQueryProducto());
	ajax.open("GET", "consultarProductos.php", true);
	ajax.onreadystatechange = respuestaSelect;
	ajax.send();
}

function respuestaSelect()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		respuesta = JSON.parse(ajax.responseText);
		if (respuesta.accion == 0) 
		{
			alert(respuesta.mensaje);
		}
		else
		{
			cargarDatosSelect(respuesta.productos);
		}
	}
}

function cargarDatosSelect(productos)
{
	listaProductos = productos;
	select = document.getElementById("id");
	for (var i = 0; i < productos.length; i++) 
	{
		var option = document.createElement("option");
		option.value = productos[i].id;
		select.appendChild(option);
		var nombre = document.createTextNode(productos[i].nombre);
		option.appendChild(nombre);
	}
}

var listaProductos; 

function llenarCantidad()
{
	let id = document.getElementById("id").value;
	productos = listaProductos;
	let cantidad = document.getElementById("cantidad");
	let nombre = document.getElementById("nombre");
	for (var i = 0; i < productos.length; i++) 
	{
		if (productos[i].id == id) 
		{
			cantidad.value = productos[i].cantidad;
			nombre.value = productos[i].nombre;
			break;
		}
	}
}

/***************************************************************MÉTODOS PARA MODIFICAR Y ACTUALIZAR UN PRODUCTO*****************************************************************/

function modificarProducto()
{
	ajax.open("GET", "actualizarProducto.php?" + obtenerQueryProducto(), true);
	ajax.onreadystatechange = respuestaModificar;
	ajax.send();
}


function respuestaModificar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		var respuesta = JSON.parse(ajax.responseText);
		alert(respuesta.mensaje);
	}
}

/***************************************************************MÉTODOS PARA BORRAR UN PRODUCTO*****************************************************************/

function mostrarSelectDos()
{
	ajax.open("GET", "borrar.php", true);
	ajax.onreadystatechange = respuestaMostrarSelectDos;
	ajax.send();
} 

function respuestaMostrarSelectDos()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
		cargarSelectDos();
	}
}

function cargarSelectDos()
{
	//alert(obtenerQueryProducto());
	ajax.open("GET", "consultarProductos.php", true);
	ajax.onreadystatechange = respuestaSelectDos;
	ajax.send();
}

function respuestaSelectDos()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		respuesta = JSON.parse(ajax.responseText);
		if (respuesta.accion == 0) 
		{
			alert(respuesta.mensaje);
		}
		else
		{
			cargarDatosSelectDos(respuesta.productos);
		}
	}
}

function cargarDatosSelectDos(productos)
{
	listaProductos = productos;
	select = document.getElementById("id");
	for (var i = 0; i < productos.length; i++) 
	{
		var option = document.createElement("option");
		option.value = productos[i].id;
		select.appendChild(option);
		var nombre = document.createTextNode(productos[i].nombre);
		option.appendChild(nombre);
	}
}

function confirmarEliminar()
{
    var opcion = confirm("¿Está seguro de eliminar este producto?");
    if (opcion == true) 
    {
       eliminarProducto();
	} 
	else 
	{
	   mostrarSelectDos();
	}
}

function eliminarProducto()
{
	ajax.open("GET", "borrarProducto.php?" + obtenerQueryProducto(), true);
	ajax.onreadystatechange = respuestaEliminar;
	ajax.send();
}

function respuestaEliminar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{	
		var respuesta = JSON.parse(ajax.responseText);
		alert(respuesta.mensaje);
		mostrarSelectDos();
	}
}

/***************************************************************MÉTODOS PARA BUSCAR UN PRODUCTO*****************************************************************/

function cargarBuscar()
{
	//alert(obtenerQueryProducto());	
	ajax.open("GET", "encontrar.html", true);
	ajax.onreadystatechange = respuestaBuscar;
	ajax.send();
}

function respuestaBuscar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
		cargarTabla();
	}
}

function buscar()
{
	var busqueda = document.getElementById("buscar").value;
	if(busqueda == "")
	{
		alert("Entro");
		cargarTabla();	
	}
	else
	{
		alert("Entro 2");
		cargarTablaBuscar(busqueda);
	}
}

function cargarTablaBuscar(busqueda)
{
	//alert(obtenerQueryProducto());
	ajax.open("GET", "buscarProductos.php?buscar=" + busqueda, true);
	ajax.onreadystatechange = respuestaTablaBuscar;
	ajax.send();
}

function respuestaTablaBuscar()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		respuesta = JSON.parse(ajax.responseText);
		if (respuesta.accion == 0) 
		{
			alert(respuesta.mensaje);
		}
		else
		{
			cargarDatosDos(respuesta.productos)
		}
	}
}

function cargarDatosDos(productos)
{
	tabla = document.getElementById("tabla");
	//tablaDos = document.getElementById("tabla2");
	for (var i = 0; i < productos.length; i++) 
	{
		var fila = document.createElement("tr");
		tabla.appendChild(fila);
		var celda1 = document.createElement("td");
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

var listaMostrar;

/*function buscarDos()
{
	var buscar = document.getElementById("buscar");
	var producto;
		if (buscar == "") 
		{
			cargarTabla();
		}
		else
		{
			filtro = new Array()
			for (var i = 0; i < productos.length; i++)
			{
				if(productos[i].nombre.search(buscar) != -1)
				{
					filtro.push(productos[i]);
				}
			}
		}
		cargarDatosDos(filtro); 
}*/

function buscarDos()
{
	var buscar = document.getElementById("buscar");
	var producto;
	for (var i = 0; i < listaP.length; i++) 
	{
		if (buscar == listaP[i].nombre) 
		{
			producto = {
			"id": listaP[i].id,
			"nombre": listaP[i].nombre,
			"cantidad": listaP[i].cantidad 
			}
		}
		listaMostrar.push(producto);
		cargarDatos(JSON.stringify(listaMostrar)); 
	}
}

function cargarBuscarDos()
{	
	ajax.open("GET", "buscar.html", true);
	ajax.onreadystatechange = respuestaBuscarDos;
	ajax.send();
}

function respuestaBuscarDos()
{
	if (ajax.readyState == 4 && ajax.status == 200) 
	{
		document.getElementById("contenido").innerHTML = ajax.responseText;
		cargarTablaBuscar();
	}
}
