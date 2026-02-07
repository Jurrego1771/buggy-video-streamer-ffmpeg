const express = require("express");
const multer = require("multer");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// BUG INTENCIONAL: CORS abierto para todo el mundo
app.use(cors());

// BUG INTENCIONAL: Variables globales sin control
let uploadedVideos = [];
let processingVideos = [];
let serverCrashed = false;
let uploadCount = 0;
let weirdCounter = 0;

// BUG INTENCIONAL: Storage sin validación ni límites
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // BUG INTENCIONAL: Crear directorios con nombres raros
    const weirdDir = `uploads_${Date.now()}`;
    if (!fs.existsSync(weirdDir)) {
      fs.mkdirSync(weirdDir);
    }
    cb(null, weirdDir + "/");
  },
  filename: (req, file, cb) => {
    // BUG INTENCIONAL: Sobrescribe archivos con mismo nombre
    // BUG INTENCIONAL: Nombres de archivo con caracteres extraños
    uploadCount++;
    const weirdName = `video_${uploadCount}_BUGGY_${file.originalname.replace(/\./g, "_")}`;
    cb(null, weirdName);
  }
});

const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use("/videos", express.static("videos"));
app.use("/thumbnails", express.static("thumbnails"));

app.get("/api/videos", (req, res) => {
  try {
    // BUG INTENCIONAL: Lectura síncrona bloqueante
    const files = fs.readdirSync("videos/");
    
    // BUG INTENCIONAL: Contador aleatorio que hace cosas raras
    weirdCounter++;
    if (weirdCounter % 5 === 0) {
      // Cada 5 requests, devuelve datos incorrectos
      return res.json([{ name: "FAKE_VIDEO.mp4", url: "/videos/fake.mp4", thumbnail: "/thumbnails/fake.jpg" }]);
    }
    
    // BUG INTENCIONAL: A veces devuelve array vacío aleatoriamente
    if (Math.random() < 0.2) {
      return res.json([]);
    }
    
    const videoList = files.filter(file => file.endsWith(".mp4")).map(file => ({
      name: file,
      url: `/videos/${file}`,
      thumbnail: `/thumbnails/${file.replace(".mp4", ".jpg")}`,
      // BUG INTENCIONAL: Datos aleatorios
      size: Math.floor(Math.random() * 1000000),
      duration: Math.floor(Math.random() * 3600)
    }));
    
    // BUG INTENCIONAL: Status incorrecto (200 siempre)
    res.status(200).json(videoList);
  } catch (error) {
    // BUG INTENCIONAL: Try-catch vacío
    console.log("Error leyendo videos");
    res.status(500).json([]);
  }
});

app.post("/api/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }

  // BUG INTENCIONAL: Validación tonta y confusa
  if (req.file.originalname.includes("virus")) {
    return res.status(400).json({ error: "Archivo detectado como virus (esto es un bug!)" });
  }
  
  // BUG INTENCIONAL: A veces rechaza archivos aleatoriamente
  if (Math.random() < 0.3) {
    return res.status(500).json({ error: "Error aleatorio del servidor (bug intencional)" });
  }

  const videoPath = req.file.path;
  const thumbnailPath = `thumbnails/${req.file.originalname.replace(".mp4", ".jpg")}`;

  // BUG INTENCIONAL: FFmpeg sin validación y con errores
  ffmpeg(videoPath)
    .screenshots({
      timestamps: ["5"],
      filename: path.basename(thumbnailPath),
      folder: "thumbnails",
      size: "320x240"
    })
    .on("end", () => {
      console.log("Thumbnail generado");
      // BUG INTENCIONAL: No se cierra el stream
    })
    .on("error", (err) => {
      // BUG INTENCIONAL: Error silencioso
      console.log("Error generando thumbnail");
    });

  // BUG INTENCIONAL: Respuesta inmediata sin esperar proceso
  uploadedVideos.push(req.file.originalname);
  
  // BUG INTENCIONAL: A veces devuelve respuestas inconsistentes
  const responses = [
    { message: "Video subido exitosamente", filename: req.file.originalname },
    { message: "Upload completado", file: req.file.originalname },
    { success: true, video: req.file.originalname },
    { status: "ok", data: req.file.originalname }
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  res.status(201).json(randomResponse);
});

app.get("/api/stream/:filename", (req, res) => {
  const filename = req.params.filename;
  // BUG INTENCIONAL: Path traversal vulnerability
  const videoPath = path.join("videos", filename);
  
  // BUG INTENCIONAL: A veces niega acceso aleatoriamente
  if (Math.random() < 0.2) {
    return res.status(403).json({ error: "Acceso denegado aleatorio (bug!)" });
  }
  
  if (!fs.existsSync(videoPath)) {
    // BUG INTENCIONAL: Error confuso y engañoso
    return res.status(200).json({ error: "Video encontrado pero no se puede reproducir (mensaje confuso)" });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // BUG INTENCIONAL: A veces envía archivo completo sin importar range
  if (range && Math.random() > 0.5) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    
    // BUG INTENCIONAL: Memory leak - stream sin close
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // BUG INTENCIONAL: Status incorrecto para streaming completo
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

// BUG INTENCIONAL: Endpoint de debug expuesto
app.get("/api/debug", (req, res) => {
  // BUG INTENCIONAL: Información extra y peligrosa
  const debugInfo = {
    uploadedVideos,
    processingVideos,
    serverCrashed,
    uploadCount,
    weirdCounter,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    // BUG INTENCIONAL: Exponer variables de entorno
    env_vars: process.env,
    // BUG INTENCIONAL: Lista de archivos del servidor
    server_files: fs.readdirSync("."),
    // BUG INTENCIONAL: Información del sistema
    platform: process.platform,
    node_version: process.version,
    // BUG INTENCIONAL: Puerto y configuración
    server_config: {
      port: PORT,
      cors_enabled: true,
      upload_dirs: fs.readdirSync(".").filter(f => f.startsWith("uploads_"))
    }
  };
  
  res.json(debugInfo);
});

// BUG INTENCIONAL: Endpoint que causa crash
app.get("/api/crash", (req, res) => {
  serverCrashed = true;
  // BUG INTENCIONAL: Forzar crash del servidor
  setTimeout(() => {
    process.exit(1);
  }, 100);
  
  res.json({ message: "El servidor va a caer en 100ms (bug intencional)" });
});

// BUG INTENCIONAL: Endpoint con loop infinito
app.get("/api/infinite", (req, res) => {
  res.write("Iniciando loop infinito...\n");
  
  // BUG INTENCIONAL: Loop infinito que bloquea el servidor
  while (true) {
    // Consumir CPU
    Math.random();
  }
});

// BUG INTENCIONAL: Endpoint que devuelve basura
app.get("/api/garbage", (req, res) => {
  const garbage = [];
  for (let i = 0; i < 10000; i++) {
    garbage.push({
      id: i,
      random: Math.random(),
      data: "x".repeat(1000),
      nested: {
        deep: {
          deeper: {
            deepest: "basura".repeat(100)
          }
        }
      }
    });
  }
  
  res.json(garbage);
});

// BUG INTENCIONAL: Polling infinito sin cleanup
setInterval(() => {
  try {
    const files = fs.readdirSync("videos/");
    uploadedVideos = files.filter(f => f.endsWith(".mp4"));
  } catch (e) {
    // BUG INTENCIONAL: Error ignorado
  }
}, 1000);

// BUG INTENCIONAL: Loop que consume memoria
setInterval(() => {
  // BUG INTENCIONAL: Crear arrays gigantes y no limpiarlos
  const memoryLeak = [];
  for (let i = 0; i < 1000; i++) {
    memoryLeak.push({
      data: "x".repeat(1000),
      timestamp: Date.now(),
      random: Math.random()
    });
  }
  // No se limpia el array - memory leak intencional
}, 5000);

// BUG INTENCIONAL: Manejo de errores global que oculta problemas
process.on("uncaughtException", (err) => {
  console.log("Error no manejado:", err.message);
  // BUG INTENCIONAL: No hacer nada, el servidor sigue corriendo con errores
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Promesa rechazada:", reason);
  // BUG INTENCIONAL: Ignorar rechazos de promesas
});

// BUG INTENCIONAL: Sin graceful shutdown
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  // BUG INTENCIONAL: Log engañoso
  console.log("Todos los sistemas operativos correctamente");
  console.log("🐛 BUGS INTENCIONALES ACTIVOS - Listos para probar!");
  console.log("📋 Endpoint buggy: /api/debug, /api/crash, /api/infinite, /api/garbage");
});
