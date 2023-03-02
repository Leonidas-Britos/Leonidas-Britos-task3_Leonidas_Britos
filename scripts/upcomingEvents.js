let eventos = data.events;


let currentDate = data.currentDate

function filtrarFecha(eventos) {
  const eventUpcoming = []
  for (evento of eventos) {
    if (currentDate < evento.date) {
      eventUpcoming.push(evento)
    }
  }
  return eventUpcoming
}

const upcomingFiltrado = filtrarFecha(data.events);
let fragmento = document.createDocumentFragment();

const crearObjeto = (upcomingFiltrado) => {
  const contenedorTarjetas = document.getElementById('cards_upcomingEventsId');
  upcomingFiltrado.forEach(element => {
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
crearObjeto(upcomingFiltrado);

