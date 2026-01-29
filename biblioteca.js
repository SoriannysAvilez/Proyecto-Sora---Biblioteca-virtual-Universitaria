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
    { id: 1, nombre: "Cien años de Soledad", autor: "Gabriel García Márquez", categoria: "Novela", imagen: "https://www.bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital/gaboteca/Imagenes/cien_aosdesolbsillo.jpg", cantidad: 3},
    { id: 2, nombre: "Gramática de la lengua castellana", autor: "Andres Bello", categoria: "Libro", imagen: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1677791699i/490908.jpg", cantidad:3 },
    { id: 3, nombre: "Ingenio Jul-Dic 2024", autor:"COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://revistaingenio.org/J2/public/journals/1/cover_issue_57_es_ES.jpg", cantidad:5 },
    { id: 4, nombre: "Doña Barbara", autor: "Romulo Gallegos", categoria: "Novela", imagen: "https://www.polifemo.com/static/img/portadas/_visd_0000JPG028J7.jpg", cantidad:3},
    { id: 5, nombre: "El Derecho Administrativo en la Constitución", autor: "Allan Brewer-Carías", categoria: "Libro", imagen: "https://m.media-amazon.com/images/I/61KZsqj9PWL._AC_UF1000,1000_QL80_.jpg", cantidad: 2},
    { id: 6, nombre: "De Auditu", autor: "COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://revistauirtus.org/public/journals/2/journalThumbnail_es_ES.jpg", cantidad:5 },
    { id: 7, nombre: "Casas Muertas", autor:"Miguel Otero Silva", categoria: "Novela", imagen: "https://m.media-amazon.com/images/I/416fkYPrloL._AC_UF1000,1000_QL80_.jpg", cantidad:2},
    { id: 8, nombre: "Formulario de Mat. Universitarias", autor: "E. Navarro", categoria: "Libro", imagen: "https://http2.mlstatic.com/D_NQ_NP_938578-MLV49638999531_042022-O.webp", cantidad: 5},
    { id: 9, nombre: "Defensa y Patria Vol.III, N°2 Mayo 2025 Edición Especial Postdoctorado", autor:"COMPROTIC / UNEFA", categoria: "Revista", imagen: "https://defensaypatria.org/public/journals/5/cover_issue_61_es_ES.jpg", cantidad:5 },  
    { id: 10, nombre: "El Alquimista", autor:"Paulo Coelho", categoria: "Novela", imagen: "https://www.resumenlibro.com/img/libros/el-alquimista.jpg", cantidad:3},
    { id: 11, nombre: "Cálculo (Trascendentes tempranas)", autor:"James Stewart", categoria: "Libro", imagen: "https://cengagelatam.editorialdc.com/wp-content/uploads/2024/08/9786075265483.jpg", cantidad:4},
    { id: 12, nombre: "Gestión y Gerencia", autor:"UCLA", categoria: "Revista", imagen: "https://revistas.uclave.org/public/journals/10/journalThumbnail_es_ES.jpg", cantidad: 3},
    { id: 13, nombre: "Don Quijote de la Mancha", autor:"Miguel de Cervantes", categoria: "Novela", imagen: "https://www.elejandria.com/covers/Don_Quijote_de_la_Mancha-Cervantes_Miguel-lg.png", cantidad:2 },
    { id: 14, nombre: "Auditoria en Sistemas Computacionales", autor:"Carlos Muñoz Lazo", categoria: "Libro", imagen: "https://deingenierias.com/wp-content/uploads/Libro-Auditor%C3%ADa-en-sistemas-computacionales.jpg", cantidad: 3},
    { id: 15, nombre: "Red de Investigación Educativa", autor:"UCLA", categoria: "Revista", imagen: "https://revistas.uclave.org/public/journals/19/journalThumbnail_es_ES.jpg", cantidad:4 },
    { id: 16, nombre: "Introd. a la Ing. en Sistemas Computacionales y al DOO", autor:"Bruno López Takeyas", categoria: "Libro", imagen: "https://nlaredo.tecnm.mx/takeyas/Libro/PortadaDOO.jpg", cantidad:4}     
];

let resumenPrestamo = JSON.parse(localStorage.getItem("resumenPrestamo")) || [];

let librosPrestados = JSON.parse(localStorage.getItem("librosPrestados")) || [];

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

    libros.forEach(libro => {
        const article = document.createElement("article");
        article.className = "libro-card";
        article.dataset.categoria = libro.categoria;

        article.innerHTML = `
            <img src="${libro.imagen}" class="libro-imagen">

            <div class="libro-separador"></div>

            <div class="libro-info">
                <p class="libro-categoria">${libro.categoria}</p>
                <h3 class="libro-titulo">${libro.nombre}</h3>
                <p class="libro-autor"> Autor: <span class="autor">${libro.autor}</span></p>
                
            </div>

            <button 
                class="btn-prestamo"
                data-id="${libro.id}">
                Solicitar
            </button>
        `;

        contenedorCat.appendChild(article);
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
      
    const libroSeleccionado = libros.find(p => p.id === id);
      
      
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
    const libro = libros.find(l => l.id === item.id);
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
      <h3>📄 Hoja de Préstamo</h3>

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








 
