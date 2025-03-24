# TP DSW - Veterinaria

## Grupo
### Integrantes

|Legajo|Alumno| E-Mail | Github|
|:-|:-|:-|:-|
|46828|Mauro Jimenez| maurojim123@gmail.com| [@maurojjzz](https://github.com/maurojjzz)
|47827|Miguel Rodriguez| miguelrodriguezips36@gmail.com| [@Miguel58000](https://github.com/Miguel58000)


### Repositorios
* [frontend app](https://github.com/maurojjzz/front-end-Veterinaria)
* [backend app](https://github.com/maurojjzz/back-end-Veterinaria)


## Tema
### Descripción
El sistema veterinaria permitirá al usuario loguearse y observar diferentes funcionalidades en el sistema siendo la más importante solicitar un turno para una determinada atención para su mascota.Una vez atendida la mascota el veterinario ingresa al sistema las distintas prácticas realizadas en esa atención y registra el importe de la misma. El administrador tiene acceso a los diferentes listados de las entidades, en los cuales puede hacer el correspondiente CRUD si es necesario.

### Modelo
![DER v1.0](<DER-Veterinaria-V1.01.png>)


## Alcance Funcional 

### Alcance Mínimo

*Nota*: el siguiente es un ejemplo para un grupo de 3 integrantes para un sistema de hotel. El 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Especie<br>3. CRUD Practica|
|CRUD dependiente|1. CRUD Raza {depende de} CRUD Especie<br>2. CRUD Mascota {depende de} Usuario y Raza|
|Listado<br>+<br>detalle| 1. Listado de mascotas filtrado por nombre mascota, especie, nombre duenio o email duenio, muestra nombre mascota, sexo mascota, especie mascota, raza mascota, fecha de nacimiento mascota, nombre duenio y email duenio<br> 2. Listado de atenciones filtradas por duenio, veterinario, rango de fechas y/o estado de atencion (si ya se le asigno un veterinario), muestra duenio, mascota, especie, fecha y hora de atencion, veterinario, practicas de la atencion, importe, forma de pago y fecha y hora de pago. 
|CUU/Epic|1. Atencion veterinaria<br>2. Pago de una Atencion|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Especie<br>3. CRUD Practica<br>4.CRUD Veterinario <br>5. CRUD Raza<br> 6. CRUD Mascota<br> 
|CUU/Epic|1. Atencion veterinaria<br>2. Pago de una Atencion|

### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req|Detalle|
|:-|:-|
|Listados (Vista user)|1.  Listado de atenciones filtradas por rango de fechas, muestra id, fecha de atencion, mascota a la que se le realizo, practicas realizadas en la atencion y monto (si la atencion ya fue pagada) y estado: Pendiente de pago (si la atencion aun no fue pagada) <br>2. Listado de atenciones filtradas por mascota, muestra id, fecha de atencion, mascota a la que se le realizo, practicas realizadas en la atencion y monto (si la atencion ya fue pagada) y estado: Pendiente de pago (si la atencion aun no fue pagada) <br>3. Listado de atenciones filtradas por estado de pago, muestra id, fecha de atencion, mascota a la que se le realizo, practicas realizadas en la atencion y monto (si la atencion ya fue pagada) y estado: Pendiente de pago (si la atencion aun no fue pagada)
|Listados (vista admin)|1. Listado de usuarios filtrados por email, nombre, direccion o telefono, muestra email, nombre, apellido, dni, direccion y telefono  <br>2.Listado de veterinarios filtrados por matricula, email, nombre, apellido, telefono o DNI, muestra matricula, email, nombre, apellido, telefono y DNI <br>3. Listado de practicas filtradas por rango de precio, muestra las practicas y sus respectivos precios. <br>4. Listado de pagos filtrado por forma de pago, muestra id de atencion, forma de pago, importe, cuotas, nro_cuota y fecha y hora de pago <br>5. Listado de razas filtrado por especie, muestra la especie y sus razas <br>6. Listado de especies filtrado por nombre, muestra las especies que coincidan parcialmente con el filtro de nombre

