<?php 
	require_once "Conexion.php";
	require_once "Producto.php";
	$conexion = new Conexion();
	$conexion->abrir();
	$producto = new Producto();
	$producto->nombre = $_GET["nombre"];  
	$producto->cantidad = $_GET["cantidad"];
	$respuesta = array();
	if ($conexion->insertarProducto($producto) > 0) 
	{
		$respuesta["accion"] = 1;
		$respuesta["mensaje"] = "Producto insertado con exito";
	}
	else
	{
		$respuesta["accion"] = 0;
		$respuesta["mensaje"] = "Producto no pudo ser insertado";
	}
	$conexion->cerrar();
	echo json_encode($respuesta);
?>