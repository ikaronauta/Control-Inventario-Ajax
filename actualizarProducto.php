<?php 
	require_once "Conexion.php";
	require_once "Producto.php";
	$conexion = new Conexion();
	$conexion->abrir(); 
	$producto = new Producto();
	$producto->id = $_GET["id"];
	$producto->nombre = $_GET["nombre"]; 
	$producto->cantidad = $_GET["cantidad"];
	
	if ($conexion->actualizarProducto($producto) > 0) 
	{
		$respuesta["accion"] = 1;
		$respuesta["mensaje"] = "Producto Actualizado con exito";
	}
	else 
	{
		$respuesta["accion"] = 0;
		$respuesta["mensaje"] = "Producto no pudo ser Actualizado";
	}
	$conexion->cerrar();
	echo json_encode($respuesta);
?>