let eventos = data.events;
let fragmento = document.createDocumentFragment();
/*------------------------------GENERO UN ARRAY CON CATEGORÍAS SIN REPETIR------------------------------ */

function extraerCategorias(eventos) {
  categorias = [];
  eventos.forEach(element => {
    if (!categorias.includes(element.category)) {
      categorias.push(element.category);
    }
  });
  return categorias;
}
const listaCategorias = extraerCategorias(eventos);

/*------------------------------GENERO LOS CHECKS EN EL HTML POR CADA CATEGORÍA------------------------------ */
const generarChecksPorCategoria = () => {
  let div = document.querySelector("form.form_check");
  let HTMLchecks = "";
  for (let category of listaCategorias) {
    HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category)}">${category}</label><br>`
  }
  div.innerHTML = HTMLchecks;
}
generarChecksPorCategoria();

/*----------------------------ESCUCHO LOS CAMBIOS EN LOS CHECKBOXES Y FILTRO------------------------------ */

let inputCheckeados = [];
//Escucha los cambios en los elementos inputs(checkbox), filtra y muestra únicamente a los checkbox seleccionados.
const escucharyFiltrarCheckBoxes = () => {
  //Creo una variable que captura todos los input de tipo checkbox.
  let divChecks = document.querySelectorAll("input[type=checkbox]");
  //Recorro a cada uno. 
  divChecks.forEach(inputCheck => {
    //Escucho si existe algún cambio en ellos y ejecutando una funcion.
    inputCheck.addEventListener("change", function tarjetaSeleccionada() {
      let ArrInputsChecked = [];
      divChecks.forEach(inputCheck => {
        //Si por cada variable inputCheck esta chequeada, la guardo dentro de un array con su respectivo valor.
        if (inputCheck.checked) {
          ArrInputsChecked.push(inputCheck.value);
        }
      });
      //Hora de imprimir cards:
      //Si no existe ningún input checkeado imprimo todas las cards disponibles.
      if (ArrInputsChecked.length === 0) {
        imprimirCards(eventos, '.cards_home')
      } else {
        //Si no hay texto en el buscador, imprimo las cards correspondientes a los checks marcados y guardo esa condicion en la variable inputCheckeados.
        if (inputBuscados.length == 0) {
          let categoriasSeleccionadas = eventos.filter(evento => ArrInputsChecked.includes(evento.category));

          imprimirCards(categoriasSeleccionadas, '.cards_home');
          inputCheckeados = categoriasSeleccionadas;
        } else {
          //Sino filtro en base a los resultados del buscador de texto que traigo desde la función: busquedaPorNombreyCoincidencia().
          let categoriasSeleccionadas = inputBuscados.filter(evento => ArrInputsChecked.includes(evento.category));

          imprimirCards(categoriasSeleccionadas, '.cards_home');
        }
      }
    });
  });
}

/*---------------------------BUSCAR POR NOMBRE Y COINCIDENCIA DE DESCRIPCION------------------------------ */

let inputBuscados = [];

const busquedaPorNombreyCoincidencia = () => {
  let form = document.getElementById('form_searchId');
  let input = document.getElementById('inputBusqueda');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Estandarizo el valor de input, convirtiendolo en minuscula y posteriormente quitandole espacios por delante y detras
    const busqueda = input.value.toLowerCase().trim();
    //declaro la variable coincidencias, que incluye el filtrado si coincide en el titulo o descripcion del evento.
    const coincidencias = eventos.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda)
    );

    //Si no hay ningun check presionado, filtra solamente las coincidencias con el buscador de texto y no guardo ningun input checkeado.
    if (inputCheckeados.length == 0) {
      const coincidencias = eventos.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda)
      );
      inputBuscados = 0;

      imprimirCards(coincidencias, '.cards_home');
      //Si hay algun check presionado, filtro las coincidencias del buscador de texto y guardo la condición de que existen inputBuscados;
    } else if (inputCheckeados.length > 0) {
      const coincidencias = eventos.filter(evento => evento.name.toLowerCase().includes(busqueda) || evento.description.toLowerCase().includes(busqueda)
      );
      inputBuscados = coincidencias;

      imprimirCards(coincidencias, '.cards_home');
    }
    //Sino existe ninguna coincidencia en la busqueda por texto, muestra un mensaje de error
    if (coincidencias == false) {
      eventos.filter(evento => !evento.name.toLowerCase().includes(busqueda) || !evento.description.toLowerCase().includes(busqueda)
      );
      imprimirCards(coincidencias, '.cards_home');
      let mensajeErrorFiltros = document.querySelector('.cards_home');
      mensajeErrorFiltros.innerHTML = "";
      mensajeErrorFiltros.innerHTML += `
    <div class="mensaje_error_filtros">
        <h5>¡ATENCIÓN!</h5>
        <p>¡No se han encontrado resultados, intente probando con otra combinación de filtros!</p>
    </div>
    `
    }
  });
};
busquedaPorNombreyCoincidencia();

/*-------------------------------------FUNCION PARA IMPRIMIR CARDS---------------------------------------- */

//Imprime las cards, hay que pasarle por parametro el array que se quiere filtrar y el contenedor donde se lo quiere colocar en el html
function imprimirCards(arrayAfiltrar, contenedorHtml) {
  let contenedorCards = document.querySelector(contenedorHtml);
  contenedorCards.innerHTML = "";
  arrayAfiltrar.forEach(elementObject => {
    contenedorCards.innerHTML += `
      <div class="tarjeta">
      <img class="tarjeta-imagen" src="${elementObject.image}" alt="imagen de la card">
        <div class="tarjeta-cuerpo">
          <h5 class="tarjeta-titulo">${elementObject.name}</h5>
          <p class="tarjeta-texto">${elementObject.description}</p>
          <p>Category: ${elementObject.category}</p>
        </div>
        <div class="tarjeta-elementos">
          <p class="tarjeta-precio">Price: $${elementObject.price}</p>
          <a class="tarjeta-boton" href="./details.html?id=${elementObject._id}">View more</a>
        </div>
    </div>`;
  });
}

escucharyFiltrarCheckBoxes();
imprimirCards(eventos, '.cards_home');