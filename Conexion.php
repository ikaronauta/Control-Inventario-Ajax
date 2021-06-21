<?php 
	class Conexion
	{
		private $conexion; 

		public function abrir()
		{
			try 
			{
				$this->conexion = new PDO("mysql:host=localhost;dbname=inventario", "root", "");
				$this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return 1;
			} catch (PDOException $e) {
				return $e->getMessage();
			}
		}

		public function cerrar()
		{
			$this->conexion = null;
		}

		public function insertarProducto(Producto $producto)
		{
			$consulta = $this->conexion->prepare("INSERT INTO productos VALUES(null, ?, ?)");
			$consulta->bindParam(1, $producto->nombre);
			$consulta->bindParam(2, $producto->cantidad);
			$consulta->execute();
			return $consulta->rowCount();
		}

		public function obtenerProductos()
		{
			$consulta = $this->conexion->prepare("SELECT * FROM productos");
			$consulta->setFetchMode(PDO::FETCH_OBJ);
			$consulta->execute();
			return $consulta->fetchAll();
		}

		public function recuperarProducto($id)
		{
			$consulta = $this->conexion->prepare("SELECT * FROM productos WHERE id=?");
			$consulta->bindParam(1, $id);
			$consulta->setFetchMode(PDO::FETCH_OBJ);
			$consulta->execute();
			$producto = $consulta->fetchAll();
			$this->cerrar();
			return $producto[0];
		}

		public function ActualizarProducto(Producto $producto)
		{
			$consulta = $this->conexion->prepare("UPDATE productos SET cantidad=? WHERE id=?");
			$consulta->bindParam(1, $producto->cantidad);
			$consulta->bindParam(2, $producto->id);
			$consulta->execute();
			return $consulta->rowCount();
		}

		public function eliminarProducto(Producto $producto)
		{
			$consulta = $this->conexion->prepare("DELETE FROM productos WHERE id=?");
			$consulta->bindParam(1, $producto->id);
			$consulta->execute();
			return $consulta->rowCount();
		}

		public function buscarProductos($busqueda)
		{
			$busqueda = "%".$busqueda."%";
			$consulta = $this->conexion->prepare("SELECT * FROM productos WHERE nombre LIKE ? ");
			$consulta->bindParam(1, $busqueda);
			$consulta->setFetchMode(PDO::FETCH_OBJ);
			$consulta->execute();
			return $consulta->fetchAll();
		}

	}
?>