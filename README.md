# 🚀 OFICIOSPRO – Guía de instalación y ejecución

Proyecto basado en:

* **Frontend:** React (Next.js / TS)
* **Backend:** Laravel (API REST)

---

# 📁 Estructura del proyecto

```
/OFICIOSPRO
 ├── frontend/   → Aplicación React
 ├── backend/    → API Laravel
```

---

# ⚙️ Requisitos

Antes de empezar, asegúrate de tener instalado:

* Node.js (v18+ recomendado)
* PHP (v8.1+)
* Composer
* Git

---

# 🧠 1. Clonar el repositorio

```bash
git clone https://github.com/Andrs-31/OFICIOSPRO.git
cd OFICIOSPRO
```

---

# 🔧 2. Configurar Backend (Laravel)

## Entrar al backend

```bash
cd backend
```

## Instalar dependencias

```bash
composer install
```

## Configurar entorno

```bash
cp .env.example .env
```

Editar `.env` con tu base de datos:

```
DB_DATABASE=nombre_db
DB_USERNAME=usuario
DB_PASSWORD=clave
```

## Generar clave

```bash
php artisan key:generate
```

## Levantar servidor

```bash
php artisan serve
```

👉 Backend corriendo en:

```
http://127.0.0.1:8000
```

---

# 🎨 3. Configurar Frontend (React)

## Ir al frontend

```bash
cd frontend
```

## Instalar dependencias

```bash
npm install
```

## Levantar servidor

```bash
npm run dev
```

👉 Frontend en:

```
http://localhost:3000
```

---

# 🔗 4. Conexión Frontend ↔ Backend

Asegúrate de que el frontend esté apuntando al backend:

Ejemplo (axios / fetch):

```js
const API_URL = "http://127.0.0.1:8000/api";
```

---

# 🧪 5. Test básico de integración

## Paso 1: Verificar backend

Abrir en el navegador:

```
http://127.0.0.1:8000/api/test
```

👉 Debe devolver una respuesta JSON

---

## Paso 2: Probar desde frontend

Ejemplo simple:

```js
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/test")
    .then(res => res.json())
    .then(data => console.log(data));
}, []);
```

👉 Si ves datos en consola → conexión OK ✅

---

# 🔐 6. Endpoints principales

## Auth

* POST `/api/auth/login`
* POST `/api/auth/register`
* POST `/api/auth/logout`

## Usuarios

* GET `/api/users`
* POST `/api/users`

## Trabajos

* GET `/api/jobs`
* POST `/api/jobs`

## Cotizaciones

* GET `/api/bids`
* POST `/api/bids`

---

# 🚨 Problemas comunes

## ❌ Error CORS

Solución:

* Revisar `config/cors.php` en Laravel
* Permitir `localhost:3000`

---

## ❌ Backend no responde

* Verificar `php artisan serve`
* Revisar puerto 8000

---

## ❌ Front no conecta

* Revisar URL de API
* Ver consola del navegador

---

# 🧩 Flujo de trabajo recomendado

1. Crear rama nueva:

```bash
git checkout -b feature/nombre-feature
```

2. Hacer cambios

3. Commit:

```bash
git commit -m "Descripción clara"
```

4. Push:

```bash
git push origin feature/nombre-feature
```

---

# 🧠 Regla del proyecto

* **Laravel = lógica y datos**
* **React = interfaz**
* Nunca mezclar responsabilidades

---

# 📌 Nota final

Si algo no funciona:

* Revisar consola (frontend)
* Revisar logs (`storage/logs/laravel.log`)

---

Listo para desarrollo 🚀
