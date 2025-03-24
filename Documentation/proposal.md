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




Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Especie<br>3. CRUD Práctica|
|CRUD dependiente|1. CRUD Raza {depende de} CRUD Especie<br>2. CRUD Mascota {depende de} Usuario y Raza|
|Listado<br>+<br>detalle| 1. Listado de mascotas filtrado por nombre mascota, especie, nombre duenio o email duenio, muestra nombre mascota, sexo mascota, especie mascota, raza mascota, fecha de nacimiento mascota, nombre duenio y email duenio<br> 2. Listado de atenciones filtradas por dueño, veterinario, rango de fechas y/o estado de atención (si ya se le asignó un veterinario), muestra dueño, mascota, especie, fecha y hora de atención, veterinario, prácticas de la atención, importe, forma de pago y fecha y hora de pago.
|CUU/Epic|1. Atención veterinaria<br>2. Pago de una Atención|




Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Especie<br>3. CRUD Práctica<br>4.CRUD Veterinario <br>5. CRUD Raza<br> 6. CRUD Mascota<br>
|CUU/Epic|1. Atención veterinaria<br>2. Pago de una Atención|


### Alcance Adicional Voluntario


*Nota* El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.


|Req|Detalle|
|:-|:-|
|Listados (Vista user)|1.  Listado de atenciones filtradas por rango de fechas, muestra id, fecha de atención, mascota a la que se le realizó, prácticas realizadas en la atención y monto (si la atención ya fue pagada) y estado: Pendiente de pago (si la atención aún no fue pagada) <br>2. Listado de atenciones filtradas por mascota, muestra id, fecha de atención, mascota a la que se le realizó, prácticas realizadas en la atención y monto (si la atención ya fue pagada) y estado: Pendiente de pago (si la atención aún no fue pagada) <br>3. Listado de atenciones filtradas por estado de pago, muestra id, fecha de atención, mascota a la que se le realizó, prácticas realizadas en la atención y monto (si la atención ya fue pagada) y estado: Pendiente de pago (si la atención aún no fue pagada)
|Listados (vista admin)|1. Listado de usuarios filtrados por email, nombre, dirección o telefono, muestra email, nombre, apellido, dni, direccion y telefono  <br>2.Listado de veterinarios filtrados por matrícula, email, nombre, apellido, telefono o DNI, muestra matricula, email, nombre, apellido, telefono y DNI <br>3. Listado de prácticas filtradas por rango de precio, muestra las prácticas y sus respectivos precios. <br>4. Listado de pagos filtrado por forma de pago, muestra id de atención, forma de pago, importe, cuotas, nro cuota y fecha y hora de pago <br>5. Listado de razas filtrado por especie, muestra la especie y sus razas <br>6. Listado de especies filtrado por nombre, muestra las especies que coinciden parcialmente con el filtro de nombre

