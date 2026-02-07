# 🎥 Buggy Video Streamer - FFmpeg

**Proyecto educativo con errores intencionales para aprender debugging y refactoring**

Este proyecto es un servidor de streaming de videos deliberadamente lleno de bugs, malas prácticas y deuda técnica. Está diseñado para que equipos junior aprendan a identificar, diagnosticar y corregir problemas del mundo real.

---

## 🚀 Setup Rápido

### Prerrequisitos
- Node.js 14+
- FFmpeg instalado localmente
- Navegador web moderno

### Instalación
```bash
# 1. Clonar o descargar el proyecto
# 2. Instalar dependencias
npm install

# 3. Iniciar servidor
npm start
```

### Uso Básico
1. Abrir http://localhost:3000
2. Subir archivos MP4 mediante el formulario
3. Reproducir videos con streaming
4. Ver thumbnails generados automáticamente

---

## 🐛 Lista de Problemas (25+ Bugs Evidentes para Principiantes)

### 🔴 **Bugs Evidentes y Fáciles de Detectar**

### 1. **Directorios Aleatorios en Uploads** 🔴 MUY EVIDENTE
- **Descripción**: Cada upload crea carpetas `uploads_timestamp` diferentes
- **Impacto**: Videos dispersos en múltiples directorios, imposible encontrar
- **Detección**: Sube 2 videos y revisa qué carpetas se crearon
- **Manifestación**: Los videos aparecen en directorios con nombres raros
- **¡ARREGLAR PARA APRENDER!**

### 2. **Nombres de Archivo Bugs** 🔴 MUY EVIDENTE
- **Descripción**: Los archivos se guardan como `video_1_BUGGY_nombre_archivo`
- **Impacto**: Nombres ilegibles y confusos
- **Detección**: Sube cualquier archivo y revisa su nombre final
- **Manifestación**: Nombres con "BUGGY" y guiones bajos extraños
- **¡ARREGLAR PARA APRENDER!**

### 3. **Errores Aleatorios de Upload** 🔴 MUY EVIDENTE
- **Descripción**: 30% de los uploads fallan con mensajes aleatorios
- **Impacto**: Sistema poco confiable, frustración del usuario
- **Detección**: Sube el mismo archivo 3 veces seguidas
- **Manifestación**: Algunos uploads fallan sin razón aparente
- **¡ARREGLAR PARA APRENDER!**

### 4. **UI se Congela Aleatoriamente** 🔴 MUY EVIDENTE
- **Descripción**: 10% de las veces la interfaz muestra "UI CONGELADA"
- **Impacto**: Usuario debe recargar la página constantemente
- **Detección**: Refresca la lista de videos varias veces
- **Manifestación**: Mensaje grande rojo diciendo "UI CONGELADA - Bug intencional"
- **¡ARREGLAR PARA APRENDER!**

### 5. **Endpoint que Causa Crash** 🔴 MUY EVIDENTE
- **Descripción**: `/api/crash` cae el servidor en 100ms
- **Impacto**: Denegación de servicio completa
- **Detección**: Visita http://localhost:3000/api/crash
- **Manifestación**: Servidor se muere y debe reiniciarse
- **¡ARREGLAR PARA APRENDER!**

### 6. **Loop Infinito que Bloquea Todo** 🔴 MUY EVIDENTE
- **Descripción**: `/api/infinite` crea un loop infinito que consume CPU
- **Impacto**: Servidor deja de responder por completo
- **Detección**: Visita http://localhost:3000/api/infinite
- **Manifestación**: Servidor se congela, CPU al 100%
- **¡ARREGLAR PARA APRENDER!**

### 7. **Botón de Borrar Roto** 🔴 MUY EVIDENTE
- **Descripción**: Botón 🗑️ Borrar llama a función que no existe
- **Impacto**: Error en consola, función no implementada
- **Detección**: Haz clic en cualquier botón de borrar
- **Manifestación**: Mensaje "Función de borrar no implementada (bug intencional)"
- **¡ARREGLAR PARA APRENDER!**

### 8. **Inicialización Múltiple** 🔴 MUY EVIDENTE
- **Descripción**: La app se inicializa sola cada 10 segundos
- **Impacto**: Múltiples intervals, memory leaks acelerados
- **Detección**: Deja abierta la consola y verás mensajes repetitivos
- **Manifestación**: Polling excesivo y consumo creciente de memoria
- **¡ARREGLAR PARA APRENDER!**

### 9. **Datos Inconsistentes en Lista** 🔴 MUY EVIDENTE
- **Descripción**: Cada 5 requests devuelve videos falsos
- **Impacto**: Información incorrecta y confusa
- **Detección**: Refresca la lista 5 veces seguidas
- **Manifestación**: Aparece "VIDEO_FALSO.mp4" de la nada
- **¡ARREGLAR PARA APRENDER!**

### 10. **Memory Leak Obvio y Rápido** 🔴 MUY EVIDENTE
- **Descripción**: Cada 5 segundos se crean arrays gigantes sin limpiar
- **Impacto**: RAM se llena rápidamente, servidor se vuelve lento
- **Detección**: Abre Task Manager y observa el proceso Node.js crecer
- **Manifestación**: Servidor lento después de 1 minuto de uso
- **¡ARREGLAR PARA APRENDER!**

### 🟡 **Bugs Clásicos (Originales)**

### 11. **Path Traversal Vulnerability** 🔴 CRÍTICO
- **Descripción**: No se valida el parámetro filename en `/api/stream/:filename`
- **Impacto**: Acceso no autorizado a archivos del sistema
- **Detección**: Intentar acceder a `../../../etc/passwd`
- **Manifestación**: Server devuelve archivos fuera de la carpeta videos
- **¡ARREGLAR PARA APRENDER!**

### 12. **Memory Leaks en Streaming** 🟡 ALTO
- **Descripción**: Streams sin close() en endpoints de video
- **Impacto**: Consumo creciente de RAM con cada reproducción
- **Detección**: Monitor de uso de memoria con múltiples usuarios
- **Manifestación**: Servidor se vuelve lento después de 50+ reproducciones
- **¡ARREGLAR PARA APRENDER!**

### 13. **Sobrescritura de Archivos** 🟡 MEDIO
- **Descripción**: Mismo nombre de archivo sobrescribe existente
- **Impacto**: Pérdida de datos y corrupción
- **Detección**: Subir dos archivos con mismo nombre
- **Manifestación**: Video anterior desaparece, thumbnail incorrecto
- **¡ARREGLAR PARA APRENDER!**

### 14. **CORS Abierto** 🟡 MEDIO
- **Descripción**: `cors()` sin configuración específica
- **Impacto**: Cualquier dominio puede hacer requests
- **Detección**: Llamadas desde otros sitios funcionan
- **Manifestación**: Vulnerabilidad CSRF potencial
- **¡ARREGLAR PARA APRENDER!**

### 15. **Polling Excesivo Frontend** 🟡 MEDIO
- **Descripción**: Intervalo de 1 segundo para actualizar lista (reducido)
- **Impacto**: Consumo innecesario de recursos
- **Detección**: Network tab muestra requests constantes
- **Manifestación**: Server sobrecargado con pocos usuarios
- **¡ARREGLAR PARA APRENDER!**

### 16. **Sin Validación de Uploads** 🟡 ALTO
- **Descripción**: No se valida tipo MIME ni tamaño de archivos
- **Impacto**: Posible upload de archivos maliciosos o gigantes
- **Detección**: Subir archivo .exe o video de 2GB
- **Manifestación**: Server acepta cualquier archivo, se llena disco
- **¡ARREGLAR PARA APRENDER!**

### 17. **Error Handling Deficiente** 🟡 MEDIO
- **Descripción**: Try-catch vacíos y errores silenciosos
- **Impacto**: Dificultad para diagnosticar problemas
- **Detección**: Revisar consola con errores intencionales
- **Manifestación**: Sistema falla sin mostrar errores
- **¡ARREGLAR PARA APRENDER!**

### 18. **Debug Endpoint Expuesto** 🔴 CRÍTICO
- **Descripción**: `/api/debug` revela información interna del servidor
- **Impacto**: Information disclosure, ataque de recon
- **Detección**: Acceder a endpoint sin autenticación
- **Manifestación**: Se ven variables globales, archivos del sistema y variables de entorno
- **¡ARREGLAR PARA APRENDER!**

### 19. **Race Condition en Thumbnails** 🟡 MEDIO
- **Descripción**: Respuesta HTTP antes de generar thumbnail
- **Impacto**: Inconsistencia entre video y thumbnail
- **Detección**: Subir video y verificar inmediatamente
- **Manifestación**: Thumbnail aparece después o nunca
- **¡ARREGLAR PARA APRENDER!**

### 20. **Bloqueo de UI** 🟡 BAJO
- **Descripción**: Operaciones síncronas bloquean el hilo principal
- **Impacto**: Experiencia de usuario pobre
- **Detección**: Subir video grande y probar otras acciones
- **Manifestación**: Interfaz se congela durante operaciones
- **¡ARREGLAR PARA APRENDER!**

### 🎮 **Funciones Buggy Adicionales**

### 21. **Funciones Globales Peligrosas** 🔴 EVIDENTE
- **Descripción**: `window.causeError()` y `window.freezeUI()` disponibles
- **Impacto**: Usuario puede causar errores manualmente
- **Detección**: Ejecuta en consola: `causeError()` o `freezeUI()`
- **Manifestación**: Error manual o UI congelada
- **¡ARREGLAR PARA APRENDER!**

### 22. **Endpoint de Basura** 🔴 EVIDENTE
- **Descripción**: `/api/garbage` devuelve 10,000 objetos gigantes
- **Impacto**: Consumo masivo de memoria y red
- **Detección**: Visita http://localhost:3000/api/garbage
- **Manifestación**: Navegador se congela, respuesta enorme
- **¡ARREGLAR PARA APRENDER!**

### 23. **Event Listeners Inútiles** 🟡 EVIDENTE
- **Descripción**: Mousemove y keydown listeners que consumen recursos
- **Impacto**: CPU constante sin propósito
- **Detección**: Mueve el mouse o escribe, verás activity en consola
- **Manifestación**: Consumo innecesario de recursos
- **¡ARREGLAR PARA APRENDER!**

### 24. **Errores Aleatorios de Reproducción** 🔴 EVIDENTE
- **Descripción**: 30% de las veces la reproducción falla
- **Impacto**: Sistema poco confiable para reproducir videos
- **Detección**: Intenta reproducir el mismo video 3 veces
- **Manifestación**: A veces aparece "Error aleatorio reproduciendo video (bug!)"
- **¡ARREGLAR PARA APRENDER!**

### 25. **Basura en DOM Acumulada** 🟡 EVIDENTE
- **Descripción**: Cada render agrega elementos ocultos al DOM
- **Impacto**: Memory leak en el frontend
- **Detección**: Inspecciona el DOM después de varios refresh
- **Manifestación**: Cientos de elementos `<div>` ocultos con "Basura:"
- **¡ARREGLAR PARA APRENDER!**

---

## 🎯 **Guía Rápida de Bugs para Principiantes**

### **Bugs que Notarás Inmediatamente (5 minutos)**

1. **📁 Directorios Raros**: Sube 2 videos → verás carpetas `uploads_1234567890`
2. **🏷️ Nombres Bugs**: Los archivos se llamarán `video_1_BUGGY_mi_video.mp4`
3. **❌ Uploads Fallan**: 1 de cada 3 uploads dirá "Error aleatorio"
4. **🧊 UI Congelada**: Refresca 10 veces → verás "UI CONGELADA"
5. **🗑️ Botón Roto**: Haz clic en "Borrar" → dirá "Función no implementada"

### **Bugs que Descubrirás Explorando (10 minutos)**

6. **💥 Server Crash**: Visita `/api/crash` → servidor muere
7. **♾️ Loop Infinito**: Visita `/api/infinite` → CPU 100%
8. **🗑️ Basura Gigante**: Visita `/api/garbage` → navegador se congela
9. **🐛 Datos Falsos**: Refresca 5 veces → aparece "VIDEO_FALSO.mp4"
10. **⚡ Memory Leak**: Deja corriendo 2 minutos → RAM crece sin parar

### **Bugs de Consola (Ejecuta en browser)**

```javascript
// Causa error manual
window.causeError()

// Congela la UI
window.freezeUI()

// Ver variables bugs
window.buggyMode  // true
window.videos     // array de videos
```

---

## 📈 Fases del Proyecto

### Fase 0: Caos (Estado Actual)
- Todo funciona pero con bugs ocultos
- Código espagueti en archivos monolíticos
- Sin testing ni documentación
- Deuda técnica acumulada

### Fase 1: Estabilidad
- Corregir bugs críticos de seguridad
- Implementar validaciones básicas
- Agregar manejo de errores
- Logging básico

### Fase 2: Producción Básica
- Modularizar código
- Implementar testing unitario
- Optimizar rendimiento
- Documentación técnica

### Fase 3: Escalabilidad
- Arquitectura microservicios
- Cache y CDN
- Monitorización avanzada
- CI/CD pipeline

---

## 🎯 Misiones Técnicas (10 Misiones)

### Misión 1: Sanitizar Uploads
**Nivel**: Fácil | **Archivo**: server.js | **Líneas**: 45-55
- Validar tipo MIME
- Limitar tamaño de archivo
- Generar nombres únicos

### Misión 2: Corregir Path Traversal
**Nivel**: Medio | **Archivo**: server.js | **Líneas**: 85-90
- Sanitizar parámetros de ruta
- Validar existencia en directorio permitido
- Implementar whitelist de nombres

### Misión 3: Implementar Rate Limiting
**Nivel**: Medio | **Archivo**: server.js | **Líneas**: 10-15
- Instalar express-rate-limit
- Configurar límites por IP
- Agregar headers de rate limiting

### Misión 4: Memory Leak Fix
**Nivel**: Difícil | **Archivo**: server.js | **Líneas**: 95-110
- Cerrar streams correctamente
- Implementar cleanup en disconnect
- Monitorizar uso de memoria

### Misión 5: XSS Prevention
**Nivel**: Medio | **Archivo**: public/app.js | **Líneas**: 35-45
- Reemplazar innerHTML por DOM manipulation
- Implementar sanitización de nombres
- Validar entradas de usuario

### Misión 6: Error Handling
**Nivel**: Fácil | **Archivo**: server.js | **Líneas**: 60-70
- Implementar logging estructurado
- Crear middleware de errores
- Enviar errores significativos al cliente

### Misión 7: Async/Await Optimization
**Nivel**: Medio | **Archivo**: public/app.js | **Líneas**: 5-15
- Eliminar bloqueos de UI
- Implementar loading states
- Cancelar requests pendientes

### Misión 8: Remove Debug Endpoint
**Nivel**: Fácil | **Archivo**: server.js | **Líneas**: 115-120
- Eliminar endpoint expuesto
- Implementar autenticación si necesario
- Agregar logging seguro

### Misión 9: CORS Configuration
**Nivel**: Fácil | **Archivo**: server.js | **Líneas**: 12-13
- Configurar orígenes específicos
- Implementar preflight handling
- Documentar política CORS

### Misión 10: Modularization
**Nivel**: Difícil | **Archivo**: server.js | **Todo el archivo**
- Separar rutas en archivos
- Crear middleware reutilizable
- Implementar patrón MVC básico

---

## ⚠️ Deuda Técnica

### Malas Prácticas Identificadas
- **God File**: server.js con 200+ líneas
- **Globals**: Variables globales sin encapsulación
- **Spaghetti Code**: Lógica mezclada sin separación
- **Callback Hell**: Anidación excesiva de callbacks
- **Hardcoded Values**: Puertos y rutas fijas
- **No Validation**: Confianza ciega en inputs
- **Silent Failures**: Errores sin notificación
- **Resource Leaks**: Streams y conexiones abiertas
- **Race Conditions**: Estado compartido sin locks
- **Security Through Obscurity**: Ocultar problemas en vez de arreglarlos

---

## 🔄 Anti-patrones Implementados

### God File
```javascript
// server.js - 200 líneas haciendo todo
app.get, app.post, ffmpeg, filesystem, etc...
```

### Globals
```javascript
let uploadedVideos = []; // Compartido entre todos los usuarios
let processingVideos = [];
```

### Spaghetti
```javascript
// Lógica de negocio mezclada con routing y filesystem
if (file) { ffmpeg() } else { res.json() }
```

### Callback Hell
```javascript
ffmpeg(videoPath)
  .screenshots()
  .on("end", () => {
    // más callbacks anidados
  })
```

---

## 🚨 Escenarios de Crisis (5 Simulaciones)

### 1. **Disco Lleno**
- **Síntomas**: Uploads fallan, thumbnails no se generan
- **Causa**: No hay validación de espacio disponible
- **Impacto**: Sistema inutilizable para nuevos uploads
- **Detección**: `df -h` muestra 100%
- **Recuperación**: Limpiar archivos temporales, implementar cuotas

### 2. **RAM 95%**
- **Síntomas**: Server lento, timeouts en requests
- **Causa**: Memory leaks en streaming
- **Impacto**: Performance degradado, posibles crashes
- **Detección**: `top` o `htop` muestra proceso Node.js creciendo
- **Recuperación**: Restart servidor, implementar monitoring

### 3. **FFmpeg Falla**
- **Síntomas**: Thumbnails no aparecen
- **Causa**: FFmpeg no instalado o versión incompatible
- **Impacto**: Funcionalidad parcial rota
- **Detección**: Logs muestran "command not found"
- **Recuperación**: Instalar FFmpeg, agregar validación

### 4. **Caída en Demo**
- **Síntomas**: Server deja de responder durante presentación
- **Causa**: DoS accidental por polling excesivo
- **Impacto**: Humiliación pública, pérdida de confianza
- **Detección**: Muchos requests simultáneos desde misma IP
- **Recuperación**: Restart, implementar rate limiting

### 5. **Archivos Corruptos**
- **Síntomas**: Videos no reproducen, thumbnails rotos
- **Causa**: Uploads interrumpidos, filesystem corruption
- **Impacto**: Pérdida de datos, mala experiencia usuario
- **Detección**: Archivos con tamaño 0 o inconsistentes
- **Recuperación**: Validación de integridad, re-upload

---

## 🗺️ Roadmap de Refactor

| Fase | Cambio | Impacto | Riesgo |
|------|--------|---------|-------|
| 0.1 | Corregir Path Traversal | Crítico | Bajo |
| 0.2 | Remover Debug Endpoint | Crítico | Bajo |
| 0.3 | Implementar Validación Uploads | Alto | Medio |
| 0.4 | Fix Memory Leaks | Alto | Medio |
| 0.5 | XSS Prevention | Crítico | Bajo |
| 1.1 | Rate Limiting | Medio | Bajo |
| 1.2 | Error Handling | Medio | Bajo |
| 1.3 | CORS Configuration | Bajo | Bajo |
| 2.1 | Modularizar Código | Alto | Medio |
| 2.2 | Implementar Testing | Alto | Medio |
| 2.3 | Optimizar Streaming | Medio | Alto |
| 3.1 | Cache Implementation | Medio | Alto |
| 3.2 | Microservicios | Alto | Alto |
| 3.3 | CI/CD Pipeline | Medio | Alto |

---

## 🧪 Testing

### Sugerencias de Implementación
```bash
npm install --save-dev jest supertest
```

### Tests Malos (Ejemplos a NO seguir)
```javascript
// Test sin cleanup
test("upload video", async () => {
  const response = await request(app).post("/api/upload")
    .attach("video", "test.mp4");
  expect(response.status).toBe(201);
  // No elimina el archivo creado
});

// Test con dependencias externas
test("generate thumbnail", () => {
  // Requiere FFmpeg instalado
  // Requiere archivos específicos
});

// Test con estado global
test("video list", async () => {
  // Depende de otros tests
  // Falla si se ejecuta solo
});
```

### Tests Buenos (Ejemplos a SEGUIR)
```javascript
test("should reject invalid file type", async () => {
  const response = await request(app)
    .post("/api/upload")
    .attach("video", Buffer.from("fake content"), "malicious.exe");
  expect(response.status).toBe(400);
});

test("should sanitize filename", async () => {
  const response = await request(app)
    .post("/api/upload")
    .attach("video", Buffer.from("content"), "../../../etc/passwd");
  expect(response.body.filename).not.toContain("..");
});
```

---

## 👥 Roles Simulados

### Backend Developer
**Misiones Principales**:
- Corregir bugs de seguridad
- Optimizar rendimiento
- Implementar validaciones
- Modularizar código

**Skills a Desarrollar**:
- Security best practices
- Error handling patterns
- Code organization
- Performance optimization

### QA Engineer
**Misiones Principales**:
- Identificar bugs ocultos
- Crear test cases
- Simular escenarios de crisis
- Documentar problemas

**Skills a Desarrollar**:
- Test planning
- Bug reproduction
- Edge case identification
- Documentation skills

### DevOps Engineer
**Misiones Principales**:
- Implementar monitoring
- Configurar rate limiting
- Optimizar deployment
- Manejar escalabilidad

**Skills a Desarrollar**:
- System monitoring
- Performance tuning
- Security hardening
- Automation

### Security Specialist
**Misiones Principales**:
- Identificar vulnerabilidades
- Implementar sanitización
- Configurar CORS
- Análisis de riesgos

**Skills a Desarrollar**:
- Security assessment
- Vulnerability scanning
- Secure coding practices
- Risk analysis

---

## 🎓 Objetivos de Aprendizaje

Al completar las misiones de este proyecto, los desarrolladores junior aprenderán:

### Technical Skills
- **Security**: Identificar y prevenir vulnerabilidades comunes
- **Performance**: Optimizar uso de recursos y prevenir leaks
- **Architecture**: Diseñar código modular y mantenible
- **Testing**: Escribir tests efectivos y reproducibles
- **Debugging**: Diagnosticar problemas sistemáticamente

### Soft Skills
- **Code Review**: Identificar problemas en código ajeno
- **Documentation**: Escribir documentación clara y útil
- **Team Collaboration**: Trabajar en diferentes roles
- **Problem Solving**: Abordar problemas complejos metodológicamente
- **Communication**: Explicar problemas técnicos claramente

---

## 🚀 Siguiente Paso

1. **Explora el código**: Identifica los bugs marcados
2. **Elige una misión**: Comienza con las de nivel fácil
3. **Implementa fixes**: Aplica las soluciones sugeridas
4. **Testea cambios**: Verifica que no rompes otras funcionalidades
5. **Documenta mejoras**: Actualiza README con tus cambios

**Recuerda**: El objetivo no es solo arreglar bugs, sino entender **por qué** ocurren y **cómo** prevenirlos en el futuro.

---

**¡Feliz debugging! 🐛➡️✨**
