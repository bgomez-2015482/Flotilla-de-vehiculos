DROP DATABASE IF EXISTS DBFlotilla; 
CREATE DATABASE	DBFlotilla;
USE DBFLOTILLA;

CREATE TABLE Vehiculos (
	codigovehiculo int not null auto_increment,
    marca varchar(50) not null,
    modelo varchar(20) not null,
    año int,
    placa varchar(15) not null,
    estado varchar(20) not null,
    primary key PK_codigovehiculo (codigovehiculo)
);

DELIMITER $$
CREATE PROCEDURE sp_AgregarVehiculo (IN marca varchar(50), IN modelo varchar(20), IN año int, IN placa varchar(15), IN estado varchar(20))
	BEGIN
		INSERT INTO Vehiculos (marca, modelo, año, placa, estado)
        values (marca, modelo, año, placa, estado);
    END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_EliminarVehiculo (IN codeVechicle int)
	BEGIN
		DELETE FROM Vehiculos
			WHERE codigoVehiculo = codeVechicle;
    END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_ListarVehiculos()
	BEGIN
		SELECT * FROM Vehiculos;
    END $$
DELIMITER ;

DELIMITER $$
	CREATE PROCEDURE sp_EditarVehiculo (IN codeVehicle int, marc varchar(50), model varchar(20), añ int, plac varchar(15), estad varchar(20))
DELIMITER ;

Delimiter $$
create procedure sp_EditarArea(IN codeArea int, IN nameArea varchar(45))
	Begin 
		update Areas 
			set nombreArea = nameArea
				where codigoArea = codeArea;
    End$$
Delimiter ;
