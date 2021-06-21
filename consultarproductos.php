<?php
    require_once "Model/Conexion.php";

    $conexion = new Conexion();
    $conexion->abrir();
    $productos = $conexion->all();
    $conexion->cerrar();

    $respuesta = array();

    if (count($productos) > 0) {
        $respuesta["productos"] = $productos;
        $respuesta["accion"] = 1;
    }
    else{
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "No se encontraron productos";
    }

    echo json_encode($respuesta);
?>