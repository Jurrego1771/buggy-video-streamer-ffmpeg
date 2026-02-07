# 🐛 BUGLOG ACTUALIZADO - Registro de Problemas Evidentes

Este documento mantiene un registro detallado de todos los bugs evidentes implementados para que principiantes puedan identificarlos fácilmente.

---

## 🔴 **BUGS EVIDENTES (Fáciles de Detectar)**

### BUG-01: Directorios Aleatorios en Uploads
**ID**: BUG-01  
**Archivo**: server.js  
**Líneas**: 22-30  
**Síntoma**: Cada upload crea carpetas `uploads_timestamp` diferentes  
**Causa**: `const weirdDir = uploads_${Date.now()}` crea directorio único por upload  
**Solución Esperada**: Usar directorio fijo `videos/`  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: User Testing  
**Fecha**: 2026-02-07

### BUG-02: Nombres de Archivo con Bugs
**ID**: BUG-02  
**Archivo**: server.js  
**Líneas**: 31-37  
**Síntoma**: Los archivos se guardan como `video_1_BUGGY_nombre_archivo`  
**Causa**: `const weirdName = video_${uploadCount}_BUGGY_${file.originalname.replace(/\./g, "_")}`  
**Solución Esperada**: Usar nombres limpios y predecibles  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: User Testing  
**Fecha**: 2026-02-07

### BUG-03: Errores Aleatorios de Upload
**ID**: BUG-03  
**Archivo**: server.js  
**Líneas**: 91-94  
**Síntoma**: 30% de los uploads fallan con mensajes aleatorios  
**Causa**: `if (Math.random() < 0.3)` rechaza uploads sin motivo  
**Solución Esperada**: Eliminar validación aleatoria  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: User Testing  
**Fecha**: 2026-02-07

### BUG-04: UI se Congela Aleatoriamente
**ID**: BUG-04  
**Archivo**: public/app.js  
**Líneas**: 45-51  
**Síntoma**: 10% de las veces la interfaz muestra "UI CONGELADA"  
**Causa**: `if (Math.random() < 0.1)` congela la UI intencionalmente  
**Solución Esperada**: Eliminar congelamiento aleatorio  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: User Testing  
**Fecha**: 2026-02-07

### BUG-05: Endpoint que Causa Crash
**ID**: BUG-05  
**Archivo**: server.js  
**Líneas**: 207-216  
**Síntoma**: `/api/crash` cae el servidor en 100ms  
**Causa**: `setTimeout(() => { process.exit(1); }, 100)` fuerza salida del proceso  
**Solución Esperada**: Remover endpoint peligroso  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: Security Scan  
**Fecha**: 2026-02-07

### BUG-06: Loop Infinito que Bloquea Todo
**ID**: BUG-06  
**Archivo**: server.js  
**Líneas**: 218-227  
**Síntoma**: `/api/infinite` crea loop infinito que consume CPU  
**Causa**: `while (true) { Math.random(); }` bloquea el event loop  
**Solución Esperada**: Remover endpoint peligroso  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: Performance Testing  
**Fecha**: 2026-02-07

### BUG-07: Botón de Borrar Roto
**ID**: BUG-07  
**Archivo**: public/app.js  
**Líneas**: 107-114  
**Síntoma**: Botón 🗑️ Borrar llama a función que no existe  
**Causa**: Función `deleteVideo()` solo muestra error pero no borra  
**Solución Esperada**: Implementar función real de borrado  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: User Testing  
**Fecha**: 2026-02-07

### BUG-08: Inicialización Múltiple
**ID**: BUG-08  
**Archivo**: public/app.js  
**Líneas**: 222-224  
**Síntoma**: La app se inicializa sola cada 10 segundos  
**Causa**: `setTimeout(initializeApp, 10000)` se llama recursivamente  
**Solución Esperada**: Remover llamada recursiva  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: Performance Analysis  
**Fecha**: 2026-02-07

### BUG-09: Datos Inconsistentes en Lista
**ID**: BUG-09  
**Archivo**: server.js  
**Líneas**: 52-56  
**Síntoma**: Cada 5 requests devuelve videos falsos  
**Causa**: `if (weirdCounter % 5 === 0)` devuelve datos incorrectos  
**Solución Esperada**: Eliminar datos falsos aleatorios  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: Data Integrity Check  
**Fecha**: 2026-02-07

### BUG-10: Memory Leak Obvio y Rápido
**ID**: BUG-10  
**Archivo**: server.js  
**Líneas**: 260-272  
**Síntoma**: Cada 5 segundos se crean arrays gigantes sin limpiar  
**Causa**: `const memoryLeak = []` se crea pero nunca se limpia  
**Solución Esperada**: Implementar cleanup de memoria  
**Nivel**: 🔴 MUY EVIDENTE  
**Estado**: Abierto  
**Reportado por**: Memory Monitoring  
**Fecha**: 2026-02-07

---

## 🎯 Guía de Detección Rápida

### **Pruebas Automáticas (Ejecutar en orden)**

1. **Test de Upload**: Sube 3 archivos seguidos
   - Resultado esperado: 1 falla, directorios raros, nombres bugs

2. **Test de UI**: Refresca lista 10 veces
   - Resultado esperado: 1 vez "UI CONGELADA", datos falsos

3. **Test de Crash**: Visita `/api/crash`
   - Resultado esperado: Server muere

4. **Test de Memory**: Deja corriendo 2 minutos
   - Resultado esperado: RAM duplicada

5. **Test de Consola**: Ejuta `window.causeError()`
   - Resultado esperado: Error en consola

### **Métricas de Detección**
- **Tiempo total de detección**: 15 minutos
- **Bugs encontrados**: 10/10 evidentes
- **Herramientas necesarias**: Browser, Task Manager
- **Nivel técnico requerido**: Principiante

---

**Última Actualización**: 2026-02-07  
**Total de Bugs**: 25+  
**Bugs Muy Evidentes**: 10  
**Tiempo de Detección**: 15 minutos principiante  
**Nivel de Dificultad**: Principiante - Intermedio
