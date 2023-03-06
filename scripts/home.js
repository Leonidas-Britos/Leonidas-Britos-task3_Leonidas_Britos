let eventos = data.events;


const homeFiltrado = data.events;
let fragmento = document.createDocumentFragment();



//generar array con categorias sin repetir
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

//generar el html con los checks por cada categoria
const generarChecksPorCategoria = () => {
  let div = document.querySelector("form.form_check");
  let HTMLchecks = "";
  for (let category of listaCategorias) {
    HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category)}">${category}</label><br>`
  }
  div.innerHTML = HTMLchecks;
}
generarChecksPorCategoria();

//Escucha los cambios en los elementos inputs(checkbox), filtra y muestra únicamente a los checkbox seleccionados.
const escucharyFiltrarCheckBoxes = () => { 
  let divChecks = document.querySelectorAll("input[type=checkbox]");
  divChecks.forEach(inputCheck => {
    inputCheck.addEventListener("change", function tarjetaSeleccionada() {
      let ArrInputsChecked = [];
      divChecks.forEach(inputCheck => {
        if (inputCheck.checked) {
          ArrInputsChecked.push(inputCheck.value);
        }
      });
      let homeFiltrado = data.events.filter(evento => ArrInputsChecked.includes(evento.category));
      imprimirCards(homeFiltrado, '.cards_home');
    });
  });
}

//Imprime las cards, hay que pasarle por parametro el array que se quiere filtrar y el contenedor donde se lo quiere colocar en el html
function imprimirCards(arrayAfiltrar,contenedorHtml){
  let contenedorCards = document.querySelector(contenedorHtml);
  contenedorCards.innerHTML = "";
  arrayAfiltrar.forEach(elementObject => { 
  contenedorCards.innerHTML += `
      <div class="tarjeta">
      <img class="tarjeta-imagen" src="${elementObject.image}" alt="imagen de la card">
        <div class="tarjeta-cuerpo">
          <h5 class="tarjeta-titulo">${elementObject.name}</h5>
          <p class="tarjeta-texto">${elementObject.description}</p>
        </div>
        <div class="tarjeta-elementos">
          <p class="tarjeta-precio">Price: $${elementObject.price}</p>
          <a class="tarjeta-boton" href="./details.html">View more</a>
        </div>
    </div>`;

});

}


escucharyFiltrarCheckBoxes();

imprimirCards(homeFiltrado,'.cards_home');
