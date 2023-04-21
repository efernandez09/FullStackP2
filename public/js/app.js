/**
 * JS funciones generales de control del FrontEnd
 */

// URL's de llamadas al Backend
const GET_CARDS_URL = "http://localhost:3000/api/cards/getCards"
const POST_CARDS_URL = "http://localhost:3000/api/cards/newCard"

const GRAPHQL_URL = "http://localhost:3000/graphql"

// Paleta de colores
const DEFAULT_COLOR = "#edede9"; 
const DEFAULT_TASK_COLOR = "#eab676"
const WHT_COLOR = "#FAFAFA";



  //  incorpora los datos, en principio de un fichero json, más tarde cambiará a backend
  function fetchWeeks(){
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: JSON.stringify({
          query: `{
            getCards{
                semana
                nombre
                color
                descripcion
                year
                vacaciones
              }
          }`
      })
  })
    .then((res) => res.json())
    .then((res) => {
      const cardList = document.getElementById('weekContainer');
      cardList.innerHTML = '';
     // console.log(res);
      res.data.getCards.map(card => {
        const cardElement = document.createElement('div');
        
        cardElement.innerHTML =     
      `<div  class="card mb-3 p-2" style="background-color: ${card.color}; border: 1px solid DEE2E6;  border-radius: 18px">
        <div class="card-body">
            <div class="d-flex justify-content-between">
            <h5 class="card-title "><strong>${card.nombre}</strong></h5>`+  ((card.vacaciones === "S") ? `<strong>¡VACACIONES!</strong>` : ``) + 
            `</div> <p class="card-text">${card.descripcion}</p>
                    <p class="card-text"><strong>Semana Número: </strong>${card.num_semana}</p>
                    <p class="card-text"><strong>Año: </strong>${card.year}</p>
                    <p class="card-text"><strong>Fecha Inicio Semana: </strong>${card.fechaInicio}</p>
                    <button class="btn btn-primary" onclick="weekTasks(${card.cardParms}, )"> Acceder </button>
                    <button class="btn btn-danger" onclick="deleteCardById('${card.cardId}')"> Eliminar </button>
                </div>
            </div>`;

        cardList.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error('Error al obtener tarjetas:', error);
    });
  }


  /**
   * pone el título en el navbar
   */

  function loadNavBar(t){
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = t;
  }

  /**
   *  Container donde se irán almacenando las tarjetas que se generen mediante el formulario, como en el enunciado
   *  se solicita explicitamente que se muestren algunos datos introducidos a mano, añadiremos tres tarjetas estáticas
   *  que estarán aquí siempre que refresques la página (aún y si las eliminas).
   */

  function loadDivCardWeeks(){
    let container = document.getElementById("container");
    container.innerHTML=`<button class="btn btn-primary mt-4 ml-5 mb-5 d-flex justify-content-center align-items-center" onclick="addWeekModal()">+ Añadir Semana</button>
    <div class="row" id="weekContainer">
    </div>`;
  }


  function loadMain(){
      loadNavBar("TARJETAS SEMANALES");
      loadDivCardWeeks();
      modalDialogCard();
      modalAddTask();
      modalDeleteTask();
      fetchWeeks();
  }


//carga las semanas.
document.onload = loadMain();