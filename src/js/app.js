/**
 * JS funciones generales de control del FrontEnd
 */

// Paleta de colores
const DEFAULT_COLOR = "#edede9"; 
const DEFAULT_TASK_COLOR = "#eab676"
const WHT_COLOR = "#FAFAFA";

 

  // función que cargará las tarjetas obtenidas de la lectura de datos
  function loadWeeks(jsonWeek){
    jsonWeek.forEach(weekCard => {
      cards(weekCard);
    });
  }

  // incorpora los datos, en principio de un fichero json, más tarde cambiará a backend
  function fetchWeeks(){
    fetch('../src/data/mockcards.json')
    .then((response) => response.json())
    .then((json) => {
      loadWeeks(json);
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