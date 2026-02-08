// BUG INTENCIONAL: Variables globales sin control
let videos = [];
let currentVideo = null;
let pollingInterval = null;
let uiFrozen = false;
let errorCount = 0;
let randomErrors = true;

// BUG INTENCIONAL: Función asíncrona mal manejada
async function loadVideos() {
  try {
    // BUG INTENCIONAL: Fetch sin manejo de errores adecuado
    const response = await fetch("/api/videos");
    
    // BUG INTENCIONAL: A veces falla aleatoriamente
    if (randomErrors && Math.random() < 0.3) {
      throw new Error("Error aleatorio de red (bug intencional)");
    }
    
    videos = await response.json();
    
    // BUG INTENCIONAL: A veces muestra datos incorrectos
    if (Math.random() < 0.2) {
      videos = [{ name: "VIDEO_FALSO.mp4", url: "/videos/falso.mp4", thumbnail: "/thumbnails/falso.jpg" }];
    }
    
    renderVideoList();
  } catch (error) {
    errorCount++;
    console.log("Error cargando videos:", error.message);
    // BUG INTENCIONAL: Error silencioso
    
    // BUG INTENCIONAL: A veces muestra mensaje de error confuso
    if (errorCount % 3 === 0) {
      const status = document.getElementById("uploadStatus");
      status.innerHTML = `<div class="error">Error misterioso #${errorCount} - El sistema está fallando</div>`;
    }
  }
}

// BUG INTENCIONAL: Función con efectos secundarios inesperados
function renderVideoList() {
  const videoList = document.getElementById("videoList");
  
  // BUG INTENCIONAL: A veces congela la UI aleatoriamente
  if (uiFrozen || Math.random() < 0.1) {
    uiFrozen = true;
    videoList.innerHTML = "<div class='loading'>UI CONGELADA - Bug intencional! Recarga la página</div>";
    setTimeout(() => { uiFrozen = false; }, 5000);
    return;
  }
  
  if (videos.length === 0) {
    videoList.innerHTML = "<div class=\"loading\">No hay videos disponibles</div>";
    return;
  }
  
  // BUG INTENCIONAL: InnerHTML sin sanitización
  videoList.innerHTML = videos.map((video, index) => `
    <div class="video-item" style="background-color: ${index % 2 === 0 ? '#ffcccc' : '#ccffcc'}">
      <div class="video-info">
        <img src="${video.thumbnail}" alt="Thumbnail" class="thumbnail" onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'60\'><rect width=\'80\' height=\'60\' fill=\'%23ccc\'/><text x=\'40\' y=\'35\' text-anchor=\'middle\' fill=\'black\'>No img</text></svg>'">
        <span class="video-name">${video.name} (${Math.floor(Math.random() * 1000)}MB)</span>
      </div>
      <button class="play-btn" onclick="playVideo('${video.url}', '${video.name}')">▶ Reproducir</button>
      <button class="play-btn" onclick="deleteVideo('${video.url}')" style="background: red;">🗑️ Borrar</button>
    </div>
  `).join("");
  
  // BUG INTENCIONAL: Agregar elementos basura al DOM
  const junkDiv = document.createElement('div');
  junkDiv.innerHTML = `Basura: ${Math.random()}`;
  junkDiv.style.display = 'none';
  document.body.appendChild(junkDiv);
}

// BUG INTENCIONAL: Función que bloquea la UI
async function playVideo(url, name) {
  const player = document.getElementById("videoPlayer");
  const status = document.getElementById("uploadStatus");
  
  // BUG INTENCIONAL: UI bloqueada sin feedback
  status.innerHTML = "<div class=\"loading\">Cargando video...</div>";
  
  // BUG INTENCIONAL: A veces falla aleatoriamente
  if (Math.random() < 0.3) {
    status.innerHTML = "<div class='error'>Error aleatorio reproduciendo video (bug!)</div>";
    return;
  }
  
  try {
    // BUG INTENCIONAL: Sin validación de URL
    player.src = url;
    player.style.display = "block";
    currentVideo = name;
    
    // BUG INTENCIONAL: Espera fija sin propósito
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    status.innerHTML = `<div class="success">Reproduciendo: ${name}</div>`;
  } catch (error) {
    status.innerHTML = `<div class="error">Error al cargar video</div>`;
    console.log("Error reproduciendo video");
  }
}

// BUG INTENCIONAL: Función que no existe pero se llama
function deleteVideo(url) {
  const status = document.getElementById("uploadStatus");
  status.innerHTML = `<div class='error'>Función de borrar no implementada (bug intencional)</div>`;
  
  // BUG INTENCIONAL: Error en consola
  console.error("Intentando borrar video pero función no existe:", url);
}

// BUG INTENCIONAL: Manejo de formulario con problemas
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const fileInput = document.getElementById("videoFile");
  const status = document.getElementById("uploadStatus");
  const file = fileInput.files[0];
  
  if (!file) {
    status.innerHTML = "<div class=\"error\">Por favor selecciona un archivo</div>";
    return;
  }
  
  // BUG INTENCIONAL: Sin validación de tipo de archivo
  const formData = new FormData();
  formData.append("video", file);
  
  try {
    status.innerHTML = "<div class=\"loading\">Subiendo video...</div>";
    
    // BUG INTENCIONAL: Fetch sin timeout ni cancelación
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      status.innerHTML = `<div class="success">Video subido: ${result.filename}</div>`;
      fileInput.value = "";
      
      // BUG INTENCIONAL: Recarga inmediata sin esperar procesamiento
      setTimeout(loadVideos, 500);
    } else {
      status.innerHTML = `<div class="error">Error: ${result.error}</div>`;
    }
  } catch (error) {
    status.innerHTML = "<div class=\"error\">Error de conexión</div>";
    console.log("Error subiendo video");
  }
});

// BUG INTENCIONAL: Debug expuesto sin protección
document.getElementById("debugBtn").addEventListener("click", async () => {
  const debugInfo = document.getElementById("debugInfo");
  
  try {
    const response = await fetch("/api/debug");
    const data = await response.json();
    
    debugInfo.textContent = JSON.stringify(data, null, 2);
    debugInfo.style.display = debugInfo.style.display === "none" ? "block" : "none";
  } catch (error) {
    debugInfo.textContent = "Error obteniendo debug info";
    debugInfo.style.display = "block";
  }
});

// BUG INTENCIONAL: Polling excesivo sin cleanup
function startPolling() {
  // BUG INTENCIONAL: Intervalo muy corto
  pollingInterval = setInterval(() => {
    loadVideos();
  }, 1000); // Reducido a 1 segundo para más bugs
  
  // BUG INTENCIONAL: Crear múltiples intervals sin limpiar
  setInterval(() => {
    console.log("Basura en consola:", Math.random());
  }, 2000);
  
  setInterval(() => {
    // BUG INTENCIONAL: Consumir memoria en el frontend
    const junk = [];
    for (let i = 0; i < 100; i++) {
      junk.push({ data: "x".repeat(100), time: Date.now() });
    }
  }, 3000);
}

// BUG INTENCIONAL: Event listeners duplicados
function initializeApp() {
  loadVideos();
  startPolling();
  
  // BUG INTENCIONAL: Event listener que se puede duplicar
  window.addEventListener("beforeunload", () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
  });
  
  // BUG INTENCIONAL: Agregar event listeners que no hacen nada
  document.addEventListener('mousemove', () => {
    // Consumir recursos sin propósito
    Math.random();
  });
  
  document.addEventListener('keydown', () => {
    // BUG INTENCIONAL: A veces mostrar mensaje aleatorio
    if (Math.random() < 0.05) {
      const status = document.getElementById("uploadStatus");
      status.innerHTML = `<div class='error'>Error aleatorio del teclado (bug!)</div>`;
    }
  });
  
  // BUG INTENCIONAL: Inicialización multiple
  setTimeout(initializeApp, 10000); // Llama a initializeApp nuevamente después de 10s
}

// BUG INTENCIONAL: Sin manejo de errores en inicialización
initializeApp();

// BUG INTENCIONAL: Variables globales expuestas
window.currentVideo = currentVideo;
window.videos = videos;
window.buggyMode = true;

// BUG INTENCIONAL: Funciones globales que causan problemas
window.causeError = () => {
  throw new Error("Error manual causado por usuario (bug intencional)");
};

window.freezeUI = () => {
  uiFrozen = true;
  document.body.innerHTML = "<h1>UI CONGELADA MANUALMENTE - Recarga la página</h1>";
};

// BUG INTENCIONAL: Console logs basura
setInterval(() => {
  console.log("🐛 Bug activo:", {
    timestamp: Date.now(),
    memory: performance.memory ? performance.memory.usedJSHeapSize : 'N/A',
    videos: videos.length,
    errors: errorCount
  });
}, 5000);
