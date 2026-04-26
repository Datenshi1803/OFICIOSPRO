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

GUARDAR LAS SESSIONES QUE USA LARAVEL, GUARDAR EN ARCHIVO LAS SESSIONES EN VEZ DE DB
```
SESSION_DRIVER=file

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

## ⚠️ Regla CLAVE del proyecto

👉 **TODO el backend se trabaja como API REST**

* Laravel **NO renderiza vistas**
* Laravel **NO usa Blade para UI**
* Laravel **SOLO expone endpoints en `/api`**
* React es el único encargado de la interfaz

---

## 📁 Organización backend

Todo el desarrollo backend debe hacerse dentro de:

```id="p6zrbp"
/backend
 ├── app/Http/Controllers/Api/
 ├── routes/api.php
```

👉 Ya existen las carpetas organizadas por módulos:

* `Auth/`
* `User/`
* `Job/`
* `Bid/`

---

## 🚫 Prohibido en backend

* Usar `routes/web.php` para lógica de la app
* Crear vistas (`resources/views`)
* Mezclar HTML con lógica

---

## ✅ Correcto

Ejemplo de endpoint:

```php id="6x3y0k"
Route::get('/jobs', [JobController::class, 'index']);
```

Respuesta:

```json id="6zt9kl"
{
  "status": "ok",
  "data": [...]
}
```

---

## 🔄 Flujo correcto

1. React hace request → `/api/...`
2. Laravel procesa lógica
3. Laravel responde JSON
4. React renderiza

---

# 🧪 5. Test básico de integración

## ✅ Paso único: verificar desde el frontend

1. Abrir:

```id="l2v7sb"
http://localhost:3000
```

2. Abrir consola (F12)

3. Debe aparecer:

```id="c6bz3n"
Backend: { status: "ok", message: "API funcionando con controlador" }
```

---

## 🎯 Qué valida esto

* ✔ Backend funcionando (`/api/test`)
* ✔ Frontend conectado correctamente
* ✔ Flujo API operativo

---

## 🚨 Si falla

* Verificar backend:

```bash id="7okq61"
php artisan serve
```

* Verificar URL del API en frontend:

```id="s1y4co"
http://127.0.0.1:8000/api
```

---

## 📌 Nota importante

👉 Este proyecto **NO es Laravel tradicional (MVC con vistas)**
👉 Es una **arquitectura desacoplada (API + SPA)**

---

## 🧠 Regla final

* Laravel = API + lógica
* React = UI + interacción

Si algo rompe esta separación → se considera mala práctica


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

# 📢 6. Gestión de cambios y documentación

## ⚠️ Regla OBLIGATORIA del equipo

👉 **Todo cambio importante de configuración debe ser:**

1. Informado al equipo
2. Documentado en este README

---

## 🔧 ¿Qué se considera un cambio importante?

* Variables de entorno (`.env`)
* Puertos (backend / frontend)
* Configuración de CORS
* Cambios en rutas API
* Nuevas dependencias (npm / composer)
* Cambios en estructura del proyecto
* Autenticación (tokens, middleware, etc.)

---

## 📌 Ejemplo de cambio correcto

Si alguien cambia el puerto del backend:

❌ Incorrecto:

* Cambiarlo localmente y no avisar

✔ Correcto:

1. Informar al equipo
2. Actualizar README:

```id="6yq7u1"
Backend corre en: http://127.0.0.1:8001
```

---

## 🧠 ¿Por qué es importante?

* Evita errores entre colaboradores
* Reduce tiempo perdido en debugging
* Mantiene el proyecto consistente
* Facilita onboarding de nuevos miembros

---

## 🚨 Regla práctica

👉 Si alguien del equipo necesita preguntarte “¿por qué no me funciona?”
👉 Probablemente faltó documentar algo aquí

---

## ✅ Buenas prácticas

* Mantener el README actualizado SIEMPRE
* Explicar cambios de forma clara y breve
* No asumir configuraciones implícitas

---

## 🎯 Objetivo

Que cualquier miembro pueda:

1. Clonar el proyecto
2. Seguir el README
3. Ejecutar sin errores

Sin necesidad de ayuda externa

