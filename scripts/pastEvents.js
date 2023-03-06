let eventos = data.events;


let currentDate = data.currentDate

function filtrarFecha(eventos) {
    const eventPast = []
    for (evento of eventos) {
        if (currentDate > evento.date) {
            eventPast.push(evento)
        }
    }
    return eventPast;
}

const pastFiltrado = filtrarFecha(data.events);
let fragmento = document.createDocumentFragment();

const crearObjeto = (pastFiltrado) => {
    const contenedorTarjetas = document.getElementById('cards_pastEventsId');
    pastFiltrado.forEach(element => {
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
  crearObjeto(pastFiltrado);