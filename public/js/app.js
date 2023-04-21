/**
 * JS funciones generales de control del FrontEnd
 */

// const {Query} = require('../../src/graphql/resolvers')

// URL's de llamadas al Backend
const GET_CARDS_URL = "http://localhost:3000"
const POST_CARDS_URL = "http://localhost:3000"

// Paleta de colores
const DEFAULT_COLOR = "#edede9"; 
const DEFAULT_TASK_COLOR = "#eab676"
const WHT_COLOR = "#FAFAFA";


  // incorpora los datos, en principio de un fichero json, más tarde cambiará a backend
  function fetchWeeks(){
    fetch(GET_CARDS_URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({quey: '{getCards {cardId num_semana}}'})
    })
    .then((response) => response.json())
    .then((data) => {
      const cardList = document.getElementById('weekContainer');
      cardList.innerHTML = '';
      const cardElement = document.createElement('div');
      data.forEach((card) => {
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

  // Test data

  const testData = [
    {cardId : "201313", num_semana : 13, nombre : "Tarjeta 1", color : "#E0CFFC", descripcion : "Semana mock 1", year : 2023, vacaciones : "S"},
    {cardId : "201315", num_semana : 15, nombre : "Tarjeta 2", color : "#F7D6E6", descripcion : "Semana mock 2", year : 2023, vacaciones : "N"},
    {cardId : "201318", num_semana : 18, nombre : "Tarjeta 3", color : "#FFF3CD", descripcion : "Semana mock 3", year : 2023, vacaciones : "N"}
  ];


  // Funcion para rellernar la base de datos de las tarjetas
  function fillData(card) {
    fetch(POST_CARDS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Tarjeta creada:', data);
      })
      .catch((error) => {
        console.error('Error al crear tarjeta:', error);
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
      // fillData(testData);
  }


//carga las semanas.
document.onload = loadMain();