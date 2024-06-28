# PARA CORRER EN SERVIDOR

### Host remoto
* Linode

### Host local

1. Instalar NodeJS (https://nodejs.org/en) y VS Code (https://code.visualstudio.com/download)
2. Abir VS Code
3. Darle a "clone github repository" y pegar `git@github.com:jsegovia1984/PetSitting-API.git'
4. Abrir la terminal (CTRL ñ)
5. Ejecutar el comando `npm install`
6. Ejecutar `npm start`

---

## Estructura de la base de datos.

BD: MongoDB.

#### USUARIOS.

```javascript
    {
        name: String,
        email: String,
        password: String,
        telefono: String,
        titulo: String,
        experiencia: String,
        imagen: String
    }
```

#### SERVICIOS.

```javascript
    {
        userid: String,
        titulo: String,
        descripcion: String,
        categoria: String,
        frecuencia: String,
        duracion: String,
        tipo: Number,
        costo: String,
        rating: Number,
        estado: String,
        imagen: String,
        comentarios: Number,
        total: Number,
    }
```

#### CONTRATOS.

```javascript
    {
        userid: String,
        cliente: String,
        servicio: String,
        telefono: String,
        email: String,
        horario: String,
        estado: String,

    }
```

#### MENSAJES.

```javascript
    {
        userid: String,
        cliente: String,
        mensaje: String,
    }
```

#### COMENTARIOS.

```javascript
    {
        userid: String,
        serviceid: String,
        nombreservicio: String,
        alumno: String,
        texto: String,
        titulo: String,
        calificacion: Number,
        estado: String,
        fecha: String
    }
```
---

### Requerimientos funcionales.

#### USUARIOS 
* Registrarse.
* Iniciar Sesión.
* Enviar mail para recuperar contraseña.
* Modificar contraseña.
* Mostrar usuario por id.

#### SERVICIOS 
* Publicar.
* Modificar.
* Eliminar.
* Mostrar todos los servicios.
* Mostrar los servicios .

#### CONTRATOS 
* Publicar.
* Modificar.
* Eliminar.
* Mostrar los contratos de un prestador de servicios.

#### MENSAJES 
* Publicar.
* Eliminar.
* Mostrar los mensajes de un prestador de servicios.

#### COMENTARIOS 
* Publicar.
* Modificar.
* Eliminar.
* Mostrar los comentarios de un servicio.
* Mostrar los cometarios de las publicaciones de un prestador de servicios.
