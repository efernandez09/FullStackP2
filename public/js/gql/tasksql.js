 /**
  *  Función que igual te crea una task si hay conjunción con Saturno
  */
 function createTask(cardId, nombre,  descripcion, color, dia, completada, horaI, horaF){
  const vacaciones = (vacas === "S");
  const query = JSON.stringify({
    query: `mutation CreateTask {
      createTask( 
          TasksInput: {cardId: ${cardId}, nombre: "${nombre}", color: "${color}", descripcion: "${descripcion}", dia: ${dia}, completada: ${completada}, horaI: ${horaI}, horaF: ${horaF}}
      ) {
          taskId
          cardId
          nombre
          descripcion
          color
          dia
          completada
          horaI
          horaF
      }
  }`
  })

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      cards(res.data.createTask); //pon la card en el tablero con esmero.
      return res.data.createTask;
    })
    .catch((error) => {
      console.error('Error al crear la tarea:', error);
      return {"taskId": -1};
    });
  }


/**
  *  Función que te actualiza la task pero no te la hace
  */
function editTask(cardId, nombre,  descripcion, color, dia, completada, horaI, horaF){
  const vacaciones = (vacas === "S");
  const query = JSON.stringify({
    query: `mutation editTask {
      editTask(taskId: "${taskId}",
          TasksInput: {cardId: ${cardId}, nombre: "${nombre}", color: "${color}", descripcion: "${descripcion}", dia: ${dia}, completada: ${completada}, horaI: ${horaI}, horaF: ${horaF}}
      ) {
          taskId
          cardId
          nombre
          descripcion
          color
          dia
          completada
          horaI
          horaF
      }
  }`
  })

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      cards(res.data.createTask); //pon la card en el tablero con esmero.
      return res.data.createTask;
    })
    .catch((error) => {
      console.error('Error al crear la tarea:', error);
      return {"taskId": -1};
    });
  }


   /**
  *  Función que te recupera las cards de weeks y te las pinta
  */
 function fetchTasks(taskId){
  fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        query: `{
          getTasks(taskId: "${taskId}"){
            taskId
            cardId
            nombre
            descripcion
            color
            dia
            completada
            horaI
            horaF
            }
        }`
    })
})
  .then((res) => res.json())
  .then((res) => {
    res.data.getTasks.map(task => {
      tasks(task); 
      generateTask();//pintamos las cards
    });
  })
  .catch((error) => {
    console.error('Error al obtener tarjetas:', error);
  });
}

/**
 * Función que elimina una tarea
 */

function deleteTasks(id, taskId){
  const query = JSON.stringify({
    query: `mutation DeleteTask {
      deleteTask(taskId: "${taskId}")
  }`
  })

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      if (res.data.deleteTasks) taskRemove(id);
      return res.data.deleteTasks;
    })
    .catch((error) => {
      console.error('Error al crear la tarjeta:', error);
      return {"cardId": -1};
    });
  }