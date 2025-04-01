# **Proyecto de Gestión de Veterinaria**

***

## **Información**
Este proyecto fue desarrollado por estudiantes de la Universidad Tecnológica Nacional Facultad Regional Rosario.

## **Descripción**
Esta aplicación web está diseñada para administración y gestión de veterinarias. Sus funcionalidades se centran en brindarle a los usuarios la posibilidad de gestionar sus mascotas y sacar turnos para las mismas, además de permitir a los veterinarios ver los turnos que se les han asignado y a un administrador gestionar todas las clases y componentes necesarios para el correcto funcionamiento de la veterinaria.

## **Video** ##
Si desea conocer el funcionamiento de la página para verificar que se ajuste a los requerimientos de su negocio antes de instalarla, puede hacerlo accediendo a este [LINK AL VIDEO](https://www.youtube.com/watch?v=_UIGXiYF8HM) . Allí encontrará un video mostrando la web en funcionamiento.

## **Instalación**

### **Instalar Node.js**
El gestor de paquetes NPM viene con Node.js y es necesario para este proyecto.

#### **Windows:**
1. Descarga el instalador desde [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
2. Ejecuta el archivo `.msi` y sigue las instrucciones de instalación.
3. Verifica la instalación ejecutando los siguientes comandos en una nueva ventana de terminal:
    ```sh
    node -v
    npm -v
    ```

#### **Linux (Ubuntu):**
1. Abre la terminal.
2. Instala Node.js y NPM ejecutando:
    ```sh
    sudo apt update
    sudo apt install nodejs npm
    ```
3. Verifica la instalación:
    ```sh
    node -v
    npm -v
    ```

### **Clonar el Repositorio**
1. Abre la terminal.
2. Navega hasta el directorio deseado.
3. Ejecuta los siguientes comandos:
    ```sh
    git clone https://github.com/maurojjzz/Veterinaria-front-end.git
    cd Veterinaria-front-end
    ```

### **Configuración e instalación de dependencias** ###
1. Instalar dependencias del Frontend:
    ```sh
    npm install
    ```
2. Crea un archivo `.env` con las siguientes variables de entorno:
    ```sh
    REACT_APP_API_KEY=http://localhost:3080/api
    REACT_APP_USER_TYPE_ID=65334d8d48ec52ff5e08c85a
    REACT_APP_VETE_TYPE_ID=65334db548ec52ff5e08c85b
    ```

### **Corriendo la aplicación** ###
El Frontend utiliza por defecto el siguiente link: `http://localhost:3000/`
Para iniciarlo, desde la carpeta `Veterinaria-front-end` que se creó en tu PC, ejecuta el siguiente comando en la terminal:
```sh
npm run start
```
Nota: para correr la aplicación completa, asegúrate de correr previamente el backend, para lo cual puedes guiarte con el instructivo ubicado en el README del siguiente repositorio `https://github.com/maurojjzz/back-end-Veterinaria`, de modo tal que tanto back como front estén corriendo al mismo tiempo. Si no, la aplicación no funcionará.
Nota 2: Para los tests, se debe ejecutar el siguiente comando:
```sh
npm run start:test
```
### **Credenciales** ###
Para tener acceso a las credenciales necesarias para acceder a las funcionalidades de la app en sus distintos roles, vaya al siguiente link: https://github.com/maurojjzz/Veterinaria-front-end/blob/master/Documentation/Credentials.md. Allí encontrará los datos de acceso para los 3 roles de la aplicación.

### **Corriendo tests** ###
Para correr los tests, ejecuta los siguientes comandos en tu terminal:
```sh
npm run test
npm run cypress
```
