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

La conexión ya está configurada dentro del frontend.

👉 El frontend hace una petición automática al backend al iniciar.

No es necesario modificar nada aquí, solo asegurarse de que:

* Backend esté corriendo en: `http://127.0.0.1:8000`
* Frontend esté corriendo en: `http://localhost:3000`

---

# 🧪 5. Test básico de integración

## ✅ Paso único: verificar desde el frontend

1. Abre el navegador en:

```
http://localhost:3000
```

2. Abre la consola del navegador (F12 → Console)

3. Deberías ver un mensaje como:

```
Backend: { status: "ok", message: "API funcionando con controlador" }
```

👉 Esto confirma:

* ✔ El frontend está corriendo
* ✔ El backend está corriendo
* ✔ La conexión entre ambos funciona correctamente

---

## 🚨 Si NO aparece el mensaje

Revisar:

### 1. Backend activo

```bash
php artisan serve
```

---

### 2. URL correcta del API en frontend

Debe apuntar a:

```
http://127.0.0.1:8000/api
```

---

### 3. Consola del navegador

* Errores de red (Network)
* Errores CORS

---

## 🎯 Resultado esperado

Si ves el mensaje en consola → integración OK ✅
Puedes empezar a desarrollar sin problemas.


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
