# Gestión de Mascotas

Aplicación web para gestionar mascotas: control de vacunas, tratamientos
médicos o alimentarios especiales y calendario de eventos con CRUD completo.
Proyecto intermodular de 2º DAW.

## Tecnologías

Node.js · Express · MongoDB Atlas · Mongoose · JWT · bcryptjs · HTML · CSS · JavaScript

## Requisitos previos

- Node.js 22 o superior
- Una base de datos en MongoDB Atlas

## Instalación

```bash
npm install
cp .env.example .env   # y rellena los valores
npm run dev
```

## Variables de entorno (`.env`)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (por defecto 8080) |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas |
| `JWT_SECRET` | Secreto para firmar los tokens |

## Estructura

```
src/
├── api/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── config/
├── middlewares/
├── seeds/
└── utils/
app.js
server.js
```

## Endpoints

Todas las rutas, salvo registro y login, requieren la cabecera
`Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/usuarios/registro` | Crear cuenta |
| POST | `/api/usuarios/login` | Iniciar sesión |
| GET | `/api/usuarios/perfil` | Datos del usuario |
| GET, POST | `/api/mascotas` | Listar y crear mascotas |
| GET, PUT, DELETE | `/api/mascotas/:id` | Consultar, editar y eliminar |
| GET, POST | `/api/vacunas` | Listar (`?mascota=`) y crear vacunas |
| GET, PUT, DELETE | `/api/vacunas/:id` | Consultar, editar y eliminar |
| GET, POST | `/api/tratamientos` | Listar (`?mascota=`) y crear tratamientos |
| GET, PUT, DELETE | `/api/tratamientos/:id` | Consultar, editar y eliminar |
| GET, POST | `/api/eventos` | Listar y crear eventos |
| GET | `/api/eventos/proximos` | Eventos futuros no completados |
| GET, PUT, DELETE | `/api/eventos/:id` | Consultar, editar y eliminar |

## Autor

David Antonio van Overbeek Crusells-
