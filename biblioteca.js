// configuracion de los slider de secciones
const enlaces = document.querySelectorAll(".navegacion-principal a");
const contenedor = document.querySelector(".carousel-container");

enlaces.forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();

    const indice = Number(enlace.dataset.slide);

    contenedor.style.transform =
      `translateX(-${indice * 100}%)`;
  });
});

//marcar menu activo
enlaces.forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();

    enlaces.forEach(a => a.classList.remove("activo"));
    enlace.classList.add("activo");

    const i = enlace.dataset.slide;
    contenedor.style.transform = `translateX(-${i * 100}%)`;
  });
});


  const tipoDeUsuario = document.getElementById("tipo-usuario");
  const divCarrera = document.getElementById("divCarrera");
  const inputCarrera = document.getElementById("carrera");

  tipoDeUsuario.addEventListener("change", function () {
    console.log("Tipo seleccionado:", this.value); // 👈 DEBUG

    if (this.value === "estudiante") {
      divCarrera.style.display = "block";
      inputCarrera.required = true;
    } else {
      divCarrera.style.display = "none";
      inputCarrera.required = false;
      inputCarrera.value = "";
    }
  });

/////FUNCIONES PRINCIPALES

const libros = [
    { id: 1, nombre: "Cien años de Soledad", autor: "Gabriel García Márquez", categoria: "Novela", imagen: "https://www.bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital/gaboteca/Imagenes/cien_aosdesolbsillo.jpg", cantidad: 3, deteriorados: 0, estado: "activo"},
    { id: 2, nombre: "Gramática de la lengua castellana", autor: "Andres Bello", categoria: "Libro", imagen: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1677791699i/490908.jpg", cantidad:3, deteriorados: 0, estado: "activo" },
    { id: 3, nombre: "Ingenio Jul-Dic 2024", autor:"COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://revistaingenio.org/J2/public/journals/1/cover_issue_57_es_ES.jpg", cantidad:5, deteriorados: 0, estado: "activo" },
    { id: 4, nombre: "Doña Barbara", autor: "Romulo Gallegos", categoria: "Novela", imagen: "https://www.polifemo.com/static/img/portadas/_visd_0000JPG028J7.jpg", cantidad:3, deteriorados: 0, estado: "activo"},
    { id: 5, nombre: "El Derecho Administrativo en la Constitución", autor: "Allan Brewer-Carías", categoria: "Libro", imagen: "https://m.media-amazon.com/images/I/61KZsqj9PWL._AC_UF1000,1000_QL80_.jpg", cantidad: 2, deteriorados: 0, estado: "activo"},
    { id: 6, nombre: "De Auditu", autor: "COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://revistauirtus.org/public/journals/2/journalThumbnail_es_ES.jpg", cantidad:5, deteriorados: 0, estado: "activo" },
    { id: 7, nombre: "Casas Muertas", autor:"Miguel Otero Silva", categoria: "Novela", imagen: "https://m.media-amazon.com/images/I/416fkYPrloL._AC_UF1000,1000_QL80_.jpg", cantidad:2, deteriorados: 0, estado: "activo"},
    { id: 8, nombre: "Formulario de Mat. Universitarias", autor: "E. Navarro", categoria: "Libro", imagen: "https://http2.mlstatic.com/D_NQ_NP_938578-MLV49638999531_042022-O.webp", cantidad: 5, deteriorados: 0, estado: "activo"},
    { id: 9, nombre: "Defensa y Patria Vol.III, N°2 Mayo 2025 Edición Especial Postdoctorado", autor:"COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://defensaypatria.org/public/journals/5/cover_issue_61_es_ES.jpg", cantidad:5, deteriorados: 0, estado: "activo" },  
    { id: 10, nombre: "El Alquimista", autor:"Paulo Coelho", categoria: "Novela", imagen: "https://www.resumenlibro.com/img/libros/el-alquimista.jpg", cantidad:3, deteriorados: 0, estado: "activo"},
    { id: 11, nombre: "Cálculo (Trascendentes tempranas)", autor:"James Stewart", categoria: "Libro", imagen: "https://cengagelatam.editorialdc.com/wp-content/uploads/2024/08/9786075265483.jpg", cantidad:4, deteriorados: 0, estado: "activo"},
    { id: 12, nombre: "Gestión y Gerencia", autor:"UCLA", categoria: "Revista", imagen: "https://revistas.uclave.org/public/journals/10/journalThumbnail_es_ES.jpg", cantidad: 3, deteriorados: 0, estado: "activo"},
    { id: 13, nombre: "Don Quijote de la Mancha", autor:"Miguel de Cervantes", categoria: "Novela", imagen: "https://www.elejandria.com/covers/Don_Quijote_de_la_Mancha-Cervantes_Miguel-lg.png", cantidad:2, deteriorados: 0, estado: "activo" },
    { id: 14, nombre: "Auditoria en Sistemas Computacionales", autor:"Carlos Muñoz Lazo", categoria: "Libro", imagen: "https://deingenierias.com/wp-content/uploads/Libro-Auditor%C3%ADa-en-sistemas-computacionales.jpg", cantidad: 3, deteriorados: 0, estado: "activo"},
    { id: 15, nombre: "Red de Investigación Educativa", autor:"UCLA", categoria: "Revista", imagen: "https://revistas.uclave.org/public/journals/19/journalThumbnail_es_ES.jpg", cantidad:4, deteriorados: 0, estado: "activo" },
    { id: 16, nombre: "Introd. a la Ing. en Sistemas Computacionales y al DOO", autor:"Bruno López Takeyas", categoria: "Libro", imagen: "https://nlaredo.tecnm.mx/takeyas/Libro/PortadaDOO.jpg", cantidad:4, deteriorados: 0, estado: "activo"}     
];

let resumenPrestamo = JSON.parse(localStorage.getItem("resumenPrestamo")) || [];

let librosPrestados = JSON.parse(localStorage.getItem("librosPrestados")) || [];

// 1. CARGA INICIAL
// Cargamos o inicializamos con el array por defecto (libros)
let inventario = JSON.parse(localStorage.getItem("inventarioLibros")) || [...libros];
let historial = JSON.parse(localStorage.getItem("historialLibros")) || [];

// Si es la primera vez (no hay nada en localStorage), guardamos la base inicial
if (!localStorage.getItem("inventarioLibros")) {
    localStorage.setItem("inventarioLibros", JSON.stringify(inventario));
}

// 2. FUNCIÓN ÚNICA DE PERSISTENCIA
// Usa esta función siempre al final de agregar, modificar o eliminar
function sincronizarLocalStorage() {
    localStorage.setItem("inventarioLibros", JSON.stringify(inventario));
    localStorage.setItem("historialLibros", JSON.stringify(historial));
}


//FUNCIONES PARA REGISTRO DE USUARIO///

//1--Generar carnet
function generarCarnet(tipo) {
  const base = tipo === "estudiante" ? "EST" : "EMP";
  const numero = Math.floor(10000 + Math.random() * 90000);
  return `${base}-${numero}`;
}


//FUNCION PARA MOSTRAR CATALOGO DE LIBROS//
function mostrarCatalogo() {
    const contenedorCat = document.getElementById("catalogo-libros");
    contenedorCat.innerHTML = "";

    // USAR 'inventario' en lugar de 'libros'
    inventario.forEach(libro => {
        if (libro.estado === "activo") { // Solo mostrar activos
            const article = document.createElement("article");
            article.className = "libro-card";
            article.dataset.categoria = libro.categoria;

            article.innerHTML = `
                <img src="${libro.imagen || 'https://via.placeholder.com/150'}" class="libro-imagen">
                <div class="libro-separador"></div>
                <div class="libro-info">
                    <p class="libro-categoria">${libro.categoria}</p>
                    <h3 class="libro-titulo">${libro.nombre}</h3>
                    <p class="libro-autor"> Autor: <span class="autor">${libro.autor}</span></p>
                </div>
                <button class="btn-prestamo" data-id="${libro.id}">Solicitar</button>
            `;
            contenedorCat.appendChild(article);
        }
    });
}

  //DIBUJAR ITEMS DEL RESUMEN DE PRESTAMOS//
function renderizarResumen() {
    const contenedorResumen = document.getElementById("resumen-items");
    contenedorResumen.innerHTML = "";

    if (resumenPrestamo.length === 0) {
        contenedorResumen.innerHTML = `
        <div class="resumen-vacio">
            <p>
                No tienes libros seleccionados
            </p>
            <span>
            Agrega libros para solicitar un préstamo
            </span>
        </div>`;
        return;
    }

    resumenPrestamo.forEach(item => {
        contenedorResumen.innerHTML += `
             <div class="cart-item">

                <img src="${item.imagen}" class="cart-img">

                <div class="cart-info">

                  <div class="cart-header">
                    <h4 class="cart-title">
                      ${item.nombre}
                    </h4>

                    <button 
                      class="btn-eliminar"
                      data-id="${item.id}">
                      🗑
                    </button>
                  </div>

                  <div class="cart-cantidad">
                    <button 
                      class="btn-cantidad"
                      data-id="${item.id}"
                      data-cambio="-1">−</button>

                    <span class="cantidad-numero">${item.cantidad}</span>

                    <button 
                      class="btn-cantidad"
                      data-id="${item.id}"
                      data-cambio="1">+</button>
                  </div>

                </div>
              </div>
            `;
    });
}

//ACCIONES////

///1///
function agregarAlResumen(id) {
      
    const libroSeleccionado = inventario.find(p => p.id === id);
      
      
      const itemEnResumen = resumenPrestamo.find(p => p.id === id);

      if (itemEnResumen) {
          itemEnResumen.cantidad++;
      } else {
          resumenPrestamo.push({ ...libroSeleccionado, cantidad: 1 });
      }

      actualizar();
  }

  ///2////
function cambiarCantidad(id, cambio) {

    const item = resumenPrestamo.find(p => p.id === id);
    if (!item) return;

    // Solo aplicamos el cambio si la cantidad resultante es mayor o igual a 1
    if (item.cantidad + cambio >= 1) {
        item.cantidad += cambio;
    }

    actualizar();
}

///3////
function eliminarDelResumen(id) {
      
    resumenPrestamo = resumenPrestamo.filter(l => l.id !== id);
      
    actualizar();
}

///4///
function totalLibrosPrestamo() {
    let total = 0;
    resumenPrestamo.forEach(item => {
        total += item.cantidad;
    });
    return total;
}

////5////
function obtenerPrestados(id) {
  const registro = librosPrestados.find(l => l.id === id);
  return registro ? registro.prestados : 0;
}


////6////
function solicitarPrestamo() {

  if (resumenPrestamo.length === 0) {
    alert("No hay libros seleccionados");
    return;
  }

  const carnet = document.getElementById("carnet-modal").value.trim().toUpperCase();

  const formatoCarnet = /^(EST|EMP)-\d{5}$/;

  if (!formatoCarnet.test(carnet)) {
    alert("❌ Formato inválido. Ejemplo válido: EST-12345");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioC = usuarios.find(u => u.carnet === carnet);

  if (!usuarioC) {
    alert("⚠️ Carnet no registrado. Debe registrarse primero.");
    return;
  }

  const maxLibros = usuarioC.tipo === "estudiante" ? 5 : 10;
  const diasPrestamo = usuarioC.tipo === "estudiante" ? 7 : 10;

  const totalLibros = totalLibrosPrestamo();

  if (totalLibros > maxLibros) {
    alert(
      `❌ Ha excedido la cantidad permitida\n\n` +
      `Tipo: ${usuarioC.tipo}\n` +
      `Máximo: ${maxLibros}\n` +
      `Solicitados: ${totalLibros}`
    );
    return;
  }

  for (const item of resumenPrestamo) {
    const libro = inventario.find(l => l.id === item.id);
    const yaPrestados = obtenerPrestados(item.id);
    const disponibles = libro.cantidad - yaPrestados;

    if (item.cantidad > disponibles) {
      alert(
        `❌ No hay suficientes ejemplares\n\n` +
        `Libro: ${libro.nombre}\n` +
        `Disponibles: ${disponibles}`
      );
      return;
    }
  }

  // 📚 Registrar libros prestados
  resumenPrestamo.forEach(item => {
    const registro = librosPrestados.find(l => l.id === item.id);

    if (registro) {
      registro.prestados += item.cantidad;
    } else {
      librosPrestados.push({
        id: item.id,
        prestados: item.cantidad
      });
    }
  });

  localStorage.setItem("librosPrestados", JSON.stringify(librosPrestados));

  const fechaPrestamo = new Date();
  const fechaDevolucion = new Date();
  fechaDevolucion.setDate(fechaPrestamo.getDate() + diasPrestamo);

  const historial = JSON.parse(localStorage.getItem("historialPrestamos")) || [];

  historial.push({
    carnet: usuarioC.carnet,
    nombreCompleto: `${usuarioC.nombre} ${usuarioC.apellido}`,
    fechaPrestamo: fechaPrestamo.toISOString(),
    fechaDevolucion: fechaDevolucion.toISOString(),
    libros: resumenPrestamo
  });

  localStorage.setItem("historialPrestamos", JSON.stringify(historial));

  alert(
    `✅ Préstamo registrado correctamente\n\n` +
    `Usuario: ${usuarioC.nombre} ${usuarioC.apellido}\n` +
    `Carnet: ${usuarioC.carnet}\n` +
    `Debe devolver los libros en ${diasPrestamo} días.`
  );

  resumenPrestamo = [];
  localStorage.removeItem("resumenPrestamo");
  actualizar();
}


////
function actualizarResumen() {
    
    const totalElement = document.getElementById('cart-total');
    const contadorCant = document.getElementById('resumen-cantidad');

    
    const totalGeneral = resumenPrestamo.reduce((acc, item) => acc + (item.cantidad), 0);

    // Actualizamos el DOM 
    if (totalElement) totalElement.innerText = `${totalGeneral}`;
    
   
    if (contadorCant) {
        const totalLibrosP = resumenPrestamo.reduce((acc, item) => acc + item.cantidad, 0);
        contadorCant.innerText = totalLibrosP;
    }
}

function actualizar() {
    renderizarResumen();   // Dibuja la lista de items
    actualizarResumen();    // Calcula y escribe el total
    localStorage.setItem("resumenPrestamo", JSON.stringify(resumenPrestamo)); // Guarda cambios
}


//config de MODAL
const btnSolicitar = document.getElementById("btn-solicitar-prestamo");
const modal = document.getElementById("modal-prestamo");
const cerrarModal = document.getElementById("cerrar-modal");
const formPrestamo = document.getElementById("form-prestamo");

// Abrir modal
btnSolicitar.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Cerrar modal
cerrarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar haciendo clic fuera
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Enviar formulario
formPrestamo.addEventListener("submit", e => {
  e.preventDefault();
  solicitarPrestamo(); // tu función existente
  modal.style.display = "none";
});

//EVENTOS GLOBALES

document.addEventListener("click", e => {

  // 🔹 AGREGAR LIBRO DESDE CATÁLOGO
  if (e.target.classList.contains("btn-prestamo")) {
    const id = Number(e.target.dataset.id);
    agregarAlResumen(id);
  }

  // 🔹 ELIMINAR LIBRO DEL RESUMEN
  if (e.target.classList.contains("btn-eliminar")) {
    eliminarDelResumen(Number(e.target.dataset.id));
  }

  // 🔹 CAMBIAR CANTIDAD
  if (e.target.classList.contains("btn-cantidad")) {
    cambiarCantidad(
      Number(e.target.dataset.id),
      Number(e.target.dataset.cambio)
    );
  }

});

//INICIALIZACION
mostrarCatalogo();
actualizar();


/////FORMULARIO DE REGISTRO/////
  
  const registrarse = document.getElementById("form-registro")

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const documento = document.getElementById("documento");
  const tipoUsuario = document.getElementById("tipo-usuario");
  const carrera = document.getElementById("carrera");

  
  registrarse.addEventListener("submit", function (e) {  
    let valido = true;

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    if (nombre.value.trim() === "" || !nombreRegex.test(nombre.value.trim())) {
      valido = false;
    }

    const apellidoRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    if (apellido.value.trim() === "" || !apellidoRegex.test(apellido.value.trim())) {
      valido = false;
    }

    // Validación documento
    const documentoRegex = /^[0-9]+$/;
    if (documento.value.trim() === "" || !documentoRegex.test(documento.value.trim())) {
    valido = false;
    }

    const carreraRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    if (carrera.value.trim() === "" || !carreraRegex.test(carrera.value.trim())) {
      valido = false;
    }

    if (!valido) {
      e.preventDefault(); // Evita enviar el formulario si hay errores
    }

     // ✅ GENERAR CARNET
    const carnet = generarCarnet(tipoUsuario.value);

    // Guardar usuario
    const usuario = {
      nombre: nombre.value,
      apellido: apellido.value,
      documento: documento.value,
      tipo: tipoUsuario.value,
      carrera: tipoUsuario.value === "estudiante" ? carrera.value : "",
      carnet
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ✅ ALERT FINAL
    alert(
      `✅ Registro exitoso\n\n` +
      `Carnet asignado: ${carnet}\n\n` +
      `Pase por recepción para retirar su carnet físico.`
    );

    registrarse.reset();
  });
   

  ////////PRESTAMOS////////

  const formConsulta = document.getElementById("ingreso-carnet");
  const detalle = document.getElementById("detalle-prestamos");

  formConsulta.addEventListener("submit", e => {
  e.preventDefault();

  const carnet = document.getElementById("carnet-consulta")
    .value.trim().toUpperCase();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.carnet === carnet);

  if (!usuario) {
    alert("⚠️ Carnet no registrado. Regístrese primero.");
    return;
  }

    detalle.style.display = "block";
    formConsulta.style.display = "none";


  // ✅ CARGAR HISTORIAL AQUÍ (SIEMPRE FRESCO)
  const historialPrestamos = JSON.parse(
    localStorage.getItem("historialPrestamos")
  ) || [];

  const prestamosUsuario = historialPrestamos.filter(
    p => p.carnet === carnet
  );

  if (prestamosUsuario.length === 0) {
    detalle.innerHTML = "<p>No tiene préstamos activos</p>";
    return;
  }

  if (prestamosUsuario.length === 0) {
    detalle.innerHTML = "<p>No tiene préstamos activos</p>";
    return;
  }

// 🔔 Evaluar estados
let hayVencido = false;
let hayAlerta = false;

prestamosUsuario.forEach(p => {
  const estado = obtenerEstadoPrestamo(p.fechaDevolucion);
  if (estado.tipo === "vencido") hayVencido = true;
  if (estado.tipo === "alerta") hayAlerta = true;
});

// 🔔 Aviso previo
let avisoHTML = "";

if (hayVencido) {
  avisoHTML = `
    <div class="estado-prestamo vencido">
      ❌ Tiene préstamos vencidos. Diríjase a recepción inmediatamente.
    </div>
  `;
} else if (hayAlerta) {
  avisoHTML = `
    <div class="estado-prestamo alerta">
      ⚠️ Tiene préstamos próximos a vencer.
    </div>
  `;
} else {
  avisoHTML = `
    <div class="estado-prestamo activo">
      ✅ Todos sus préstamos están dentro del plazo.
    </div>
  `;
}

  // 🧾 Render final
  detalle.innerHTML = `
     <div class="prestamos-header">
        <button type="button" id="btn-salir" class="btn-salir">
          ⬅ Salir
        </button>
      </div>

  ${avisoHTML}

  ${prestamosUsuario.map(p => `
    <div class="hoja-prestamo">
      <h3>📄 Planilla de Préstamo</h3>

      <p><strong>Carnet:</strong> ${p.carnet}</p>
      <p><strong>Usuario:</strong> ${p.nombreCompleto}</p>
      <p><strong>Fecha préstamo:</strong>
      ${new Date(p.fechaPrestamo).toLocaleDateString()}
      </p>
      <p><strong>Fecha devolución:</strong>
      ${new Date(p.fechaDevolucion).toLocaleDateString()}
      </p>

      <div class="lista-prestamos">
        ${p.libros.map(l => `
          <div class="libro-prestado">
            <img src="${l.imagen}">
            <div>
              <p><strong>${l.nombre}</strong></p>
              <p>${l.autor}</p>
              <p>Cantidad: ${l.cantidad}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("")}
  `;
  

  document.getElementById("btn-salir").addEventListener("click", () => {
  detalle.innerHTML = "";
  detalle.style.display = "none";

  formConsulta.reset();
  formConsulta.style.display = "block";
});

});



function diasRestantes(fechaDevolucion) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // 👈 normalizar

  const devolucion = new Date(fechaDevolucion);
  devolucion.setHours(0, 0, 0, 0);

  const diferencia = devolucion - hoy;
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

function alertarDevolucion(carnet) {

  const prestamos = JSON.parse(localStorage.getItem("historialPrestamos")) || [];

  const prestamoUsuario = prestamos.find(p => p.carnet === carnet);

  if (!prestamoUsuario) return;

  const dias = diasRestantes(prestamoUsuario.fechaDevolucion);

  if (dias < 0) {
    alert("❌ Su préstamo está VENCIDO. Acérquese inmediatamente a recepción.");
  } 
  else if (dias <= 2) {
    alert(`⚠️ Atención: le quedan ${dias} día(s) para devolver los libros.`);
  }
}

function obtenerEstadoPrestamo(fechaDevolucion) {
  const dias = diasRestantes(fechaDevolucion);

  if (dias < 0) {
    return { tipo: "vencido", mensaje: "❌ Tiene préstamos VENCIDOS. Debe acudir a recepción." };
  }

  if (dias <= 2) {
    return { tipo: "alerta", mensaje: `⚠️ Atención: le quedan ${dias} día(s) para devolver los libros.` };
  }

  return { tipo: "activo", mensaje: "✅ Sus préstamos están dentro del plazo permitido." };
}



// ===== FILTRO DE CATEGORÍAS =====

const inputBusqueda = document.getElementById("input-busqueda");
const formBusqueda = document.querySelector(".busqueda");

const checkboxesCategorias = document.querySelectorAll(
  "#filtro-categorias input[type='checkbox']"
);

// EVENTOS
inputBusqueda.addEventListener("input", aplicarFiltros);

formBusqueda.addEventListener("submit", e => {
  e.preventDefault();
  aplicarFiltros();
});

checkboxesCategorias.forEach(cb => {
  cb.addEventListener("change", aplicarFiltros);
});

function aplicarFiltros() {
  const texto = inputBusqueda.value.toLowerCase().trim();

  const categoriasSeleccionadas = Array.from(checkboxesCategorias)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase().trim());

  const tarjetas = document.querySelectorAll(".libro-card");

  tarjetas.forEach(card => {
    const categoriaLibro = card.dataset.categoria.toLowerCase().trim();

    const titulo = card.querySelector(".libro-titulo")
      .textContent.toLowerCase();

    const autor = card.querySelector(".autor")
      .textContent.toLowerCase();

    const coincideCategoria =
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(categoriaLibro);

    const coincideTexto =
      titulo.includes(texto) || autor.includes(texto);

    card.style.display =
      coincideCategoria && coincideTexto ? "" : "none";
  });
}

//ACCESO DE USUARIOS AL PERFIL EMPLEADO

// 2. Definición del Arreglo de Usuarios
const usuariosTrabajadores = [
    { usuario: "admin", clave: "1234", nombre: "Administrador" },
    { usuario: "empleado01", clave: "unefa2026", nombre: "Juan Pérez" }
];

// 3. Escuchador de Eventos (El reemplazo del onclick)
const formEmpleado = document.getElementById("ingreso-empleado");
const inputUser = document.getElementById("usuario");
const inputPass = document.getElementById("contrasena");

formEmpleado.addEventListener("submit", (e) => {
  e.preventDefault();

  const userVal = inputUser.value.trim();
  const passVal = inputPass.value;

  const usuarioValido = usuariosTrabajadores.find(u =>
    u.usuario === userVal && u.clave === passVal
  );

  if (usuarioValido) {
    alert(`¡Acceso concedido! Bienvenido ${usuarioValido.nombre}`);

    // 🔹 MOVER CARRUSEL A PERFIL EMPLEADO
    contenedor.style.transform = "translateX(-300%)";
    enlaces.forEach(a => a.classList.remove("activo"));
    enlaces[3].classList.add("activo");

    // 🔹 OCULTAR LOGIN
    document.getElementById("ingreso-empleado")
      .style.setProperty("display", "none", "important");

    // 🔹 MOSTRAR PANEL
    document.getElementById("contenedor-botones")
      .style.setProperty("display", "flex", "important");

    document.getElementById("contenedor-inicial")
      .style.setProperty("display", "flex", "important");

    document.getElementById("contenedor-historial")
      .style.setProperty("display", "flex", "important");

  } else {
    alert("Credenciales incorrectas");
    inputPass.value = "";
  }
});

///// BOTN SALIR DE LA SESION DE EMPLEADO

// 4. Función para cambiar la vista (Entrar)
function mostrarPanelGestion() {
    // Ocultamos el cuadro de login
    document.getElementById('ingreso-empleado').style.display = 'none';
    
    // Mostramos la cabecera (botones de gestión y salir)
    document.getElementById('contenedor-botones').style.display = 'flex';
    
    // Mostramos las tablas de inventario e historial
    document.getElementById('contenedor-inicial').style.display = 'flex';
    document.getElementById('contenedor-historial').style.display = 'flex';
}

// 5. Función para Cerrar Sesión (Salir)
const btnSalir = document.querySelector('.salir');

btnSalir.addEventListener('click', () => {
    // 1. Volvemos a ocultar todo el panel de gestión
    document.getElementById('contenedor-botones').style.setProperty("display", "none", "important");
    document.getElementById('contenedor-inicial').style.setProperty("display", "none", "important");
    document.getElementById('contenedor-historial').style.setProperty("display", "none", "important");
    
    // 2. Mostramos de nuevo el cuadro de ingreso
    document.getElementById('ingreso-empleado').style.setProperty("display", "flex", "important");
    
    // 3. Limpiamos campos
    inputUser.value = "";
    inputPass.value = "";
});

//PERFIL USUARIO AJUSTES
function calcularEstantes(libro) {
  const prestados = obtenerPrestados(libro.id);
  return libro.cantidad - prestados;
}

function renderizarInventario() {
  const tbody = document.getElementById("tabla-libros-cuerpo");
  tbody.innerHTML = "";

  inventario.forEach(libro => {
    const prestados = obtenerPrestados(libro.id);
    const estantes = calcularEstantes(libro);

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${libro.nombre}</td>
      <td>${libro.autor}</td>
      <td>${libro.categoria}</td>
      <td>${libro.cantidad}</td>
      <td>${prestados}</td>
      <td>${estantes}</td>
      <td>${libro.estado}</td>
    `;

    fila.addEventListener("click", () => seleccionarLibro(libro.id));
    tbody.appendChild(fila);
  });
}

function moverAHistorial(libro) {
  historial.push({
    ...libro,
    fecha: new Date().toLocaleDateString()
  });

  inventario = inventario.filter(l => l.id !== libro.id);

  guardarInventario();
}

function renderizarHistorial() {
    const tbody = document.getElementById("tabla-historial-cuerpo");
    if(!tbody) return;
    tbody.innerHTML = "";

    historial.forEach(libro => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${libro.nombre}</td>
            <td>${libro.autor}</td>
            <td>${libro.categoria}</td>
            <td>${libro.cantidad}</td>
            <td><span class="badge-deteriorado">${libro.estado}</span></td>
        `;
        tbody.appendChild(fila);
    });
}

renderizarInventario();
renderizarHistorial();

//BOTONES MODIFICRA, AGREGAR Y ELIMINAR

// ==========================================
// 1. GESTIÓN DE MODALES (APERTURA Y CIERRE)
// ==========================================
const modalAgregar = document.getElementById("modal-agregar");
const modalModificar = document.getElementById("modal-modificar");
const modalEliminar = document.getElementById("modal-eliminar");

// Botones de apertura (Clases del HTML)
const btnAbrirAgregar = document.querySelector(".agregar-nuevo");
const btnAbrirModificar = document.querySelector(".modificar");
const btnAbrirEliminar = document.querySelector(".eliminar");

// --- ABRIR MODALES ---
if (btnAbrirAgregar) {
    btnAbrirAgregar.addEventListener("click", () => {
        modalAgregar.style.display = "flex";
        document.getElementById("form-agregar").reset();
        // IMPORTANTE: Aseguramos que se vean los campos del formulario
        const grupoNuevo = document.getElementById("grupo-nuevo");
        if(grupoNuevo) grupoNuevo.classList.remove("oculto");
    });
}

if (btnAbrirModificar) {
    btnAbrirModificar.addEventListener("click", () => {
        modalModificar.style.display = "flex";
        document.getElementById("form-modificar").reset();
        document.getElementById("grupo-cantidad").classList.add("oculto");
        document.getElementById("grupo-estado").classList.add("oculto");
    });
}

// --- FUNCION PARA LLENAR EL DATALIST ---
function actualizarSugerenciasEliminar(texto = "") {
    const dataList = document.getElementById("sugerencias-eliminar");
    if (!dataList) return;
    
    dataList.innerHTML = "";
    const filtro = texto.toLowerCase();

    const coincidencias = inventario.filter(l => l.nombre.toLowerCase().includes(filtro));

    coincidencias.forEach(libro => {
        const opcion = document.createElement("option");
        opcion.value = libro.nombre;
        dataList.appendChild(opcion);
    });
}

// --- EVENTOS DE APERTURA Y ESCRITURA ---
if (btnAbrirEliminar) {
    btnAbrirEliminar.addEventListener("click", () => {
        modalEliminar.style.display = "flex";
        document.getElementById("form-eliminar").reset();
        actualizarSugerenciasEliminar(""); // Carga inicial
    });
}

// Escuchar cuando el usuario escribe para filtrar sugerencias
document.getElementById("eli-nombre").addEventListener("input", (e) => {
    actualizarSugerenciasEliminar(e.target.value);
});


// --- CERRAR MODALES ---
document.getElementById("cerrar-modal-agregar").onclick = () => modalAgregar.style.display = "none";
document.getElementById("cerrar-modificar").onclick = () => modalModificar.style.display = "none";
document.getElementById("cerrar-eliminar").onclick = () => modalEliminar.style.display = "none";

// --- LÓGICA DE CAMPOS DINÁMICOS ---

// Modificar: Mostrar cantidad o estado según selección
document.getElementById("mod-opcion").addEventListener("change", (e) => {
    const gCant = document.getElementById("grupo-cantidad");
    const gEst = document.getElementById("grupo-estado");
    
    gCant.classList.add("oculto");
    gEst.classList.add("oculto");

    if (e.target.value === "cantidad") gCant.classList.remove("oculto");
    if (e.target.value === "estado") gEst.classList.remove("oculto");

    actualizarSugerenciasEliminarSugerenciasEliminar("");
});
  document.getElementById("mod-nombre").addEventListener("input", (e) => {
    actualizarSugerenciasEliminar(e.target.value);
  });


// 2. PROCESAMIENTO (SUBMITS)


// Función auxiliar para actualizar todo el sistema
function finalizarOperacion(modal) {
    sincronizarLocalStorage(); // Guarda todo de una vez
    renderizarInventario();
    renderizarHistorial();
    mostrarCatalogo();
    modal.style.display = "none";
    alert("Operación realizada con éxito");
}

// SUBMIT AGREGAR
document.getElementById("form-agregar").addEventListener("submit", e => {
    e.preventDefault();
    const nuevo = {
        id: Date.now(),
        nombre: document.getElementById("nuevo-nombre").value,
        autor: document.getElementById("nuevo-autor").value,
        categoria: document.getElementById("nuevo-categoria").value,
        cantidad: parseInt(document.getElementById("nuevo-cantidad").value),
        imagen: document.getElementById("nuevo-imagen").value,
        deteriorados: 0,
        estado: "activo"
    };
    inventario.push(nuevo);
    finalizarOperacion(modalAgregar);
});


// 3. LÓGICA DEL SUBMIT: MODIFICAR
document.getElementById("form-modificar").addEventListener("submit", e => {
    e.preventDefault();

    const nombreBusqueda = document.getElementById("mod-nombre").value.trim().toLowerCase();
    const opcion = document.getElementById("mod-opcion").value;
    
    // 1. Buscar el libro en el array global 'inventario'
    const libro = inventario.find(l => l.nombre.toLowerCase() === nombreBusqueda);

    if (!libro) {
        alert("❌ El libro '" + nombreBusqueda + "' no existe en el inventario.");
        return;
    }

    // 2. Procesar según la opción elegida (Cantidad o Estado)
    if (opcion === "cantidad") {
        const nuevaCantidad = parseInt(document.getElementById("mod-cantidad").value);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
            alert("⚠️ Por favor, ingrese una cantidad total válida.");
            return;
        }
        libro.cantidad = nuevaCantidad;

    } else if (opcion === "estado") {
        const estadoSeleccionado = document.getElementById("mod-estado").value;
        const cantAfectada = parseInt(document.getElementById("mod-cantidad-estado").value);

        if (isNaN(cantAfectada) || cantAfectada <= 0 || cantAfectada > libro.cantidad) {
            alert("❌ Cantidad inválida. No puede ser mayor al stock actual (" + libro.cantidad + ").");
            return;
        }

        // Si se reporta como deteriorado, sale del inventario activo y va al historial
        if (estadoSeleccionado === "deteriorado") {
            libro.cantidad -= cantAfectada;
            
            // Añadir al historial de bajas
            historial.push({
                nombre: libro.nombre,
                autor: libro.autor,
                categoria: libro.categoria,
                cantidad: cantAfectada,
                estado: "Deteriorado",
                fecha: new Date().toLocaleDateString()
            });

            // Si el stock llega a cero, eliminamos el libro del catálogo
            if (libro.cantidad === 0) {
                inventario = inventario.filter(l => l.nombre.toLowerCase() !== nombreBusqueda);
            }
        }
    }

    // 3. Guardar y Refrescar (Usa la función auxiliar que definimos antes)
    finalizarOperacion(modalModificar);
});


// SUBMIT ELIMINAR (Usando el ID 'eli-nombre' de tu HTML)
document.getElementById("form-eliminar").addEventListener("submit", e => {
    e.preventDefault(); // Evita que la página se recargue y te saque de la sección

    const nombreBuscado = document.getElementById("eli-nombre").value.trim().toLowerCase();
    const cantAEliminar = parseInt(document.getElementById("eli-cantidad").value);
    
    const index = inventario.findIndex(l => l.nombre.toLowerCase() === nombreBuscado);
    
    if (index !== -1) {
        const libroOriginal = inventario[index];
        
        // Validación de cantidad
        if (cantAEliminar > libroOriginal.cantidad) {
            alert(`❌ Error: Solo hay ${libroOriginal.cantidad} disponibles.`);
            return;
        }

        // Lógica de borrado
        if (cantAEliminar === libroOriginal.cantidad) {
            inventario.splice(index, 1);
        } else {
            inventario[index].cantidad -= cantAEliminar;
        }
        
        // REFRESCAR TODO (Esto evita que "parezca" que no se borró nada)
        finalizarOperacion(modalEliminar); 
    } else {
        alert("Libro no encontrado. Asegúrate de seleccionar uno de la lista.");
    }
});

// ==========================
// INICIALIZACIÓN DEL SISTEMA
// ==========================
cargarInventario();
cargarHistorial();
renderizarInventario();
renderizarHistorial();
