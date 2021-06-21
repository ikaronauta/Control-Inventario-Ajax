<?php  
    class Conexion{
        private $conexion;

        public function abrir(){
            try {
                $this->conexion = new PDO("mysql:host=localhost;dbname=inventario","root","");
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return 1;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        }

        public function cerrar(){
            $this->conexion = null;
        }
        
        public function save(Producto $producto){
            $consulta = $this->conexion->prepare("INSERT INTO productos VALUES(null, ?, ?)");
            $consulta->bindParam(1, $producto->nombre);
            $consulta->bindParam(2, $producto->cantidad);
            $consulta->execute();
            return $consulta->rowCount();
        }

        public function all(){
            $consulta = $this->conexion->prepare("SELECT * FROM productos");
            $consulta->setFetchMode(PDO::FETCH_OBJ);
            $consulta->execute();
            return $consulta->fetchAll();   
        }

        public function find($id){
            $consulta = $this->conexion->prepare("SELECT * FROM productos WHERE id=?");
            $consulta->bindParam(1, $id);
            $consulta->setFetchMode(PDO::FETCH_OBJ);
            $consulta->excute();
           // $producto = $consulta->fetchAll();
        }

        public function update(Producto $producto){
            $consulta = $this->conexion->prepare("UPDATE productos SET cantidad=? WHERE id=?");
            $consulta->bindParam(1, $producto->contidad);
            $consulta->bindParam(1, $producto->id);
            $consulta->setFetchMode(PDO::FETCH_OBJ);
            $consulta->excute();
           // $producto = $consulta->fetchAll();
        }

    }