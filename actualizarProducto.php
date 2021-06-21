<?php
    require_once "Model/Conexion.php";
    require_once "  Model/Producto.php";

    $conexion = new Conexion();
    $conexion->abrir();
    
    
    $producto = new Producto();
    //$producto->nombre = $_GET["nombre"];
    $producto->cantidad = $_GET["cantidad"];
    $respuesta = array();

    if ($conexion->update($producto) > 0) {
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto actualizado con exito";
    }
    else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Producto no pudo ser actualizado";
    }

    $conexion->cerrar();
    echo json_encode($respuesta);
?>