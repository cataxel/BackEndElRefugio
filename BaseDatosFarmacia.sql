CREATE DATABASE FarmaExpress;

USE FarmaExpress;

CREATE TABLE Medicamentos (
	CveMed int auto_increment,
	NomMed varchar(30) unique not null,
	TipoMed varchar(20) not null,
	PrecioCmp decimal(15,2) default(0.0) not null,
	PrecioVta decimal(15,2) default(0.0) not null,
	Ganancia decimal(15,2) default(0.0) not null,
	Apmed varchar(40) not null,
	RecNec bool not null,
	CompMed varchar(100) not null,
	ContMed varchar(50) not null,
	Pat_o_Gen varchar(8) not null,
	CHECK(Pat_o_Gen="Patente" or Pat_o_Gen="Generico"),
	PRIMARY KEY (CveMed)
);


CREATE TABLE Proveedores (
	CveProv int auto_increment,
	NomProv varchar(40) not null,
	TelProv varchar(10) not null,
	LocProv varchar(30),
	EstProv varchar(20) not null,
	CPProv int not null,
	DirProv varchar(30) not null,
	Estatus boolean,
	PRIMARY KEY (CveProv)
);

alter table Proveedores add Estatus boolean;

CREATE TABLE Compras ( 
	CveCom int auto_increment,
	FchaCom date not null,
	TotalCom decimal(15,2) default(0) not null,
	PRIMARY KEY (CveCom)
)

CREATE table Prov_Com ( 
	CveCom int not null,
	CveProv int not null,
	foreign key (CveCom) References Compras(CveCom),
	foreign key (CveProv) References Proveedores(CveProv)
)
drop table Prov_Com ;

CREATE TABLE Lotes ( 
	CveLote int auto_increment,
	Montoabo int not null,
	Fechacad date not null,
	CveMed int not null,
	Estatus boolean,
	foreign key (CveMed) references Medicamentos(CveMed),
	primary key (CveLote)
)

alter table Lotes add Estatus boolean;

create table DetComMed (
	CveLote int not null,
	CveCom int not null,
	CantCom int not null,
	foreign key (CveLote) references Lotes(CveLote),
	foreign key (CveCom) references Compras(CveCom)
)

Drop table DetComMed ;

create table Ventas ( 
	CveVta int auto_increment,
	Iva decimal(15,2) default(0) not null,
	Subtotal decimal(15,2) default(0) not null,
	FchaVta Date not null,
	MetPago varchar(7) not null,
	primary key(CveVta)
)

CREATE Table DetVtaMed ( 
	CveVta int not null,
	CveLote int not null,
	CantVta int not null,
	foreign key (CveVta) references Ventas(CveVta),
	foreign key (CveLote) references Lotes(CveLote)
)

CREATE table Empleados ( 
	CveEmp int auto_increment,
	NombreEmp varchar(40) not null,
	TelEmp varchar(10) not null,
	PuestoEmp varchar(25) not null,
	EdadEmp int,
	SexoEmp varchar(1),
	AntigEmp int,
	Estatus boolean,
	Primary key (CveEmp)
)
alter table Empleados add Estatus boolean;

create table Emp_Ven ( 
	CveEmp int not null,
	CveVta int not null,
	foreign key (CveEmp) references Empleados(CveEmp),
	foreign key (CveVta) references Ventas(CveVta)
) 

CREATE table Emp_Com ( 
	CveEmp int not null,
	CveCom int not null,
	foreign key (CveEmp) references Empleados(CveEmp),
	foreign key (CveCom) references Compras(CveCom)
)

CREATE table Laboratorio ( 
	CveLab int auto_increment,
	NomLab varchar(40) unique not null,
	DirLab varchar(30) not null,
	EstLab varchar(20) not null,
	CPLab int not null,
	LocLab varchar(25),
	EmailLab varchar(40),
	Estatus boolean;
	Primary key(CveLab)
)
alter table Laboratorio add Estatus boolean;

CREATE table Lab_Med ( 
	CveLab int not null,
	CveMed int not null,
	foreign key (CveLab) references Laboratorio(CveLab),
	foreign key (CveMed) references Medicamentos(CveMed)
)




SELECT * from Lab_Med lm  ;
SELECT * from Lotes l ;
SELECT * from Laboratorio l ;
SELECT * from Medicamentos m ;
SELECT * from Proveedores p ;
SELECT * from Compras c ;
select * from Prov_Com pc ;
select * from Emp_Com ec ;
SELECT * from DetComMed dcm;
select * from DetVtaMed dvm ;
select * from Emp_Ven ev ;
select * from Ventas v ;
SELECT * FROM Empleados WHERE CveEmp = "1";

SELECT Laboratorio.NomLab FROM Medicamentos JOIN Lab_Med ON Medicamentos.CveMed = Lab_Med.CveMed
                    JOIN Laboratorio ON Lab_Med.CveLab = Laboratorio.CveLab
                    WHERE Medicamentos.CveMed = 2;
                                 
SELECT l.CveLote FROM Lotes l join DetComMed dcm on l.CveLote = dcm.CveLote 
	join Compras c on dcm.CveCom = c.CveCom 
	WHERE c.CveCom  = 1;

select Proveedores.NomProv from Compras join Prov_Com on Compras.CveCom = Prov_Com.CveCom
                    join Proveedores on Prov_Com.CveProv = Proveedores.CveProv
                    where Compras.CveCom = 1;
                    
select Empleados.NombreEmp from Compras join Emp_Com on Compras.CveCom = Emp_Com.CveCom
                join Empleados on Emp_Com.CveEmp = Empleados.CveEmp
                where Compras.CveCom = 1;

insert into Prov_Com (CveCom, CveProv) values (1,1);
                   

select NombreEmp from Emp_Ven inner join Empleados on Emp_Ven.CveEmp = Empleados.CveEmp where CveVta = 1;
                   
-- Creacion de Roles
CREATE ROLE Administrador;
CREATE ROLE Empleado;

-- dar privilegios al rol Administrador
GRANT ALL PRIVILEGES ON FarmaExpress.* TO Administrador;
-- quitar permisos de eliminacion de tablas al rol Administrador
REVOKE DROP ON FarmaExpress.* FROM Administrador;

-- dar privilegios al rol Empleado
-- permisos de lectura ventas,detalle de ventas,medicamentos,lotes,laboratorios
-- permisos de escritura en ventas,detalle de ventas,lotes
GRANT SELECT ON FarmaExpress.Ventas TO Empleado;
GRANT SELECT ON FarmaExpress.DetVtaMed TO Empleado;
GRANT SELECT ON FarmaExpress.Medicamentos TO Empleado;
GRANT SELECT ON FarmaExpress.Lotes TO Empleado;
GRANT SELECT ON FarmaExpress.Laboratorio TO Empleado;
GRANT INSERT ON FarmaExpress.Ventas TO Empleado;
GRANT INSERT ON FarmaExpress.DetVtaMed TO Empleado;
GRANT INSERT ON FarmaExpress.Lotes TO Empleado;

show grants for Empleado;
show grants for Administrador;


-- Crear usuario administrador
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

-- asignar el rol de administrador al usuario admin
GRANT Administrador TO 'admin'@'localhost';

-- activar permisos del rol al usuario admin
SET default role all to 'admin'@'localhost';

------------------------------------------------------------
-- Procedimientos almacenados
------------------------------------------------------------

-- Procedimiento para añadir un nuevo empleado (y crear un usuario de ese empleado con el rol de empleado)
-- hacer uso de transacciones
CREATE PROCEDURE addEmpleado(
	IN nombre varchar(40),
	IN tel varchar(10),
	IN puesto varchar(25),
	IN edad int,
	IN sexo varchar(1),
	IN antig int,
	IN estatus boolean,
	IN contraseña varchar(256),
	out idUsuario int,
	out bandera int(1)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SET bandera = 0;
	END;
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		ROLLBACK;
		SET bandera = 0;
	END;
	if(select 1 from Empleados where TelEmp = tel) then
		SET bandera = 0;
	ELSE
		START TRANSACTION;
		INSERT INTO Empleados (NombreEmp, TelEmp, PuestoEmp, EdadEmp, SexoEmp, AntigEmp, Estatus) VALUES (nombre, tel, puesto, edad, sexo, antig, estatus);
		SET idUsuario = LAST_INSERT_ID();
		-- usar el nombre de usuario del empleado para crear su usuario
		set @nombreUsuario = CONCAT((SUBSTRING_INDEX(nombre, ' ', 1)),idUsuario);
		SET @userHost = CONCAT(@nombreUsuario, '@localhost');
		SET @createUserQuery = CONCAT('CREATE USER ', @userHost, " IDENTIFIED BY '", contraseña, "'");
		PREPARE stmt1 FROM @createUserQuery;
		EXECUTE stmt1;
		DEALLOCATE PREPARE stmt1;
		-- Asegúrate de que el rol 'Empleado' exista en tu base de datos
		SET @grantQuery = CONCAT('GRANT Empleado TO ', @userHost);
		PREPARE stmt2 FROM @grantQuery;
		EXECUTE stmt2;
		DEALLOCATE PREPARE stmt2;
		SET @defaultRoleQuery = CONCAT('SET DEFAULT ROLE Empleado TO ', @userHost);
		PREPARE stmt3 FROM @defaultRoleQuery;
		EXECUTE stmt3;
		DEALLOCATE PREPARE stmt3;
		SET bandera = 1;
		COMMIT;
	END IF;
END
-- eliminar procedimiento
drop procedure if exists addEmpleado;



