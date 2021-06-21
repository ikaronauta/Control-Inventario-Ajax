<h2 id="titulo">Actualizar Producto</h2>
<div id="contenido2"> 
	Producto: <select id="id" name="id" onchange="llenarCantidad()">
				<option selected disabled>Seleccione un Producto</option>
			  </select>
			  <br>
	Cantidad: <input type="text" id="cantidad" name="cantidad"><br>
	<input type="text" name="nombre" id="nombre" hidden>
	<input type="button" value="Actualizar" onclick="modificarProducto()">
</div>

