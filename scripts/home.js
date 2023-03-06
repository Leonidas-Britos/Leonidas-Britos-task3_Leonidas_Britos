let eventos = data.events;


const homeFiltrado = data.events;
let fragmento = document.createDocumentFragment();

const crearObjeto = (homeFiltrado) => {
    const contenedorTarjetas = document.getElementById('cards_homeId');
    homeFiltrado.forEach(element => {
      const tarjeta = document.createElement("div");
      tarjeta.id = 'card';
      tarjeta.innerHTML = `
      <div class="tarjeta">
      <img class="tarjeta-imagen" src="${element.image}" alt="imagen de la card">
        <div class="tarjeta-cuerpo">
          <h5 class="tarjeta-titulo">${element.name}</h5>
          <p class="tarjeta-texto">${element.description}</p>
        </div>
        <div class="tarjeta-elementos">
          <p class="tarjeta-precio">Price: $${element.price}</p>
          <a class="tarjeta-boton" href="./details.html">View more</a>
        </div>
    </div>`;
      fragmento.appendChild(tarjeta);
      contenedorTarjetas.appendChild(fragmento);
    });
  };
  crearObjeto(homeFiltrado);

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
        HTMLchecks += `<label><input type="checkbox" id="${(category.toLowerCase()).replace(/\s+/g, '')}" value="${(category.toLowerCase()).replace(/\s+/g, '')}_val">${category}</label><br>`
    }
    div.innerHTML = HTMLchecks;
}
generarChecksPorCategoria();

//funcionalidad para que muestre las categorias al hacer click en check
const DibujarCardsFiltradasCheck = () => {
    let divChecks = document.querySelectorAll("form label");
    divChecks.forEach(formulario => {
        formulario.onclick = () => {
            let HTMLresultados = "";
            acumuladorCards = [];
            let category = formulario.innerText;
            eventos.filter(evento => category == evento.category).forEach(element => {
                HTMLresultados += `
            <div class="tarjeta">
            <img class="tarjeta-imagen" src="${element.image}" alt="imagen de la card">
              <div class="tarjeta-cuerpo">
                <h5 class="tarjeta-titulo">${element.name}</h5>
                <p class="tarjeta-texto">${element.description}</p>
              </div>
              <div class="tarjeta-elementos">
                <p class="tarjeta-precio">Price: $${element.price}</p>
                <a class="tarjeta-boton" href="./details.html">View more</a>
              </div>
          </div>`;
                acumuladorCards.push(HTMLresultados);
            });
            document.querySelector(".cards_home").innerHTML = HTMLresultados;
        }
    });
}

DibujarCardsFiltradasCheck();


