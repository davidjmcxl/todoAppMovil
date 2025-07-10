# 📋 ToDoApp - Aplicación Híbrida con Ionic + Capacitor + Firebase

Esta aplicación es una lista de tareas desarrollada con **Ionic + Angular**, que permite agregar, editar, eliminar y filtrar tareas por categorías. Además, está integrada con **Firebase Remote Config** para activar o desactivar funcionalidades dinámicamente.

---

## 📦 Tecnologías Utilizadas

- **Ionic Framework** (v7+)
- **Angular 20**
- **Capacitor** (en reemplazo de Cordova)
- **Firebase** (Remote Config)
- **LocalStorage** para persistencia
- **Android SDK** (para generación de APK)

---

## 🚀 Cómo Ejecutar la Aplicación

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/todoapp-ionic.git
cd todoapp-ionic
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Ejecuta en el navegador (modo desarrollo)

```bash
ionic serve
```

### 4. Compilar para Android

#### Requisitos previos:

- Tener **Android Studio** instalado
- Tener configurado el SDK (mínimo API 33 recomendado)
- Tener instalado Capacitor y la plataforma Android

```bash
ionic build
npx cap add android
npx cap open android
```

Desde Android Studio:
- Selecciona un emulador o dispositivo físico
- Compila y ejecuta (Build > Build Bundle(s)/APK(s) > Build APK)

### 5. Compilar para iOS (solo desde macOS)

```bash
npx cap add ios
npx cap open ios
```

Luego, compilar desde Xcode.

---

## 🔐 Configuración de Firebase Remote Config

1. Crea un proyecto en Firebase: https://console.firebase.google.com/
2. Habilita Remote Config
3. Agrega un parámetro llamado `showCategoryFilter` con valor `"true"` o `"false"`
4. Descarga el archivo `google-services.json` (Android) y colócalo en `android/app/`
5. Si compilas para iOS, descarga `GoogleService-Info.plist` y colócalo en `ios/App/`

---

## 🧪 Funcionalidades Implementadas

- [x] Agregar tarea con título y categoría
- [x] Marcar como completada / pendiente
- [x] Eliminar tarea
- [x] Filtro por categoría
- [x] Gestión de categorías (CRUD)
- [x] Almacenamiento local
- [x] Firebase Remote Config para mostrar/ocultar el filtro de categoría
- [x] Optimización para múltiples tareas

---

## ⚡ Optimización de Rendimiento

- Lazy loading por rutas (`loadChildren`)
- Uso de `ngIf` para condicionales de renderizado
- Operaciones de filtrado in-memory en `getter`
- Carga inicial ligera con almacenamiento local (`localStorage`)


---

## 🎯 Feature Flag Usado

La funcionalidad del **filtro de categorías** puede activarse o desactivarse dinámicamente desde Firebase:

```ts
this.remoteConfig.settings = {
  minimumFetchIntervalMillis:36000000,
  fetchTimeoutMillis: 10000,
};

await fetchAndActivate(this.remoteConfig);
this.showCategoryFilter = getValue(this.remoteConfig, 'showCategoryFilter').asBoolean();
```

---

## 📂 Estructura de Carpetas

```
src/
├── app/
│   ├── pages/
│   │   ├── tasks/
│   │   ├── categories/
│   │   └── tabs/
│   ├── models/
│   ├── modals/ 
│   └── services/
├── assets/
└── environments/
```

---

## 📷 Capturas de Pantalla

<p align="center">
  <img width="482" height="801" alt="cap1" src="https://github.com/user-attachments/assets/70507f88-b205-4bdd-859e-a022ac04e78e" />
</p>

---

## 🧠 Preguntas de Evaluación

### ❓ ¿Cuáles fueron los principales desafíos?

uno de los principales desafíos fue la incompatibilidad entre Cordova e Ionic con Angular 20+. La prueba solicitaba el uso de Cordova, pero al trabajar con Angular v20.1.0 (versión  más reciente), Cordova no es compatible debido a que el paquete @ionic/angular-toolkit y otros relacionados no ofrecen soporte para Angular 20.

Intenté realizar un downgrade a Angular 16 o 17, pero esto introdujo múltiples conflictos de dependencias, errores de compilación, y rompió funcionalidades ya desarrolladas. Como alternativa viable y moderna, decidí continuar usando Capacitor, que es el sucesor oficial de Cordova y es totalmente soportado por el ecosistema de Ionic, ofreciendo mejor compatibilidad con Angular moderno, Android e iOS, y funcionalidades nativas.

✅ Capacitor permite compilar y desplegar aplicaciones móviles híbridas de forma eficiente, manteniendo la integridad del proyecto.
-

### 🛠️ ¿Qué técnicas de optimización aplicaste?

- Lazy loading
- Control de renderizado condicional
- Almacenamiento eficiente en `localStorage`
- Evitar múltiples llamados innecesarios a servicios

### 🧹 ¿Cómo aseguraste la calidad y mantenibilidad?

- Separación de servicios (`task.service`, `category.service`)
- Uso de `ngModel` y `Reactive Forms`
- Código comentado y modularizado
- Buenas prácticas de Angular

---

## 📦 APK / IPA

> Los archivos generados se encuentran en la carpeta `dist/` (o se compilaron desde Android Studio):

-  [`ToDoApp-debug.apk`]
-  `ToDoApp.ipa` (solo disponible para testers en TestFlight o manualmente vía Xcode)

---

