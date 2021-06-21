<h2 id="titulo">Eliminar Producto</h2> 
<div id="contenido2"> 
	Producto: <select id="id" name="id" onchange="llenarCantidad()">
				<option selected disabled>Seleccione un Producto</option>
			  </select>
			  <br>
	Cantidad: <input type="text" id="cantidad" name="cantidad" disabled><br>
	<input type="text" name="nombre" id="nombre" hidden>
	<input type="button" value="Borrar" onclick="confirmarEliminar()">
</div>