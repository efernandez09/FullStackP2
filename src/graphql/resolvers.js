const Cards = require('../controllers/cardscontroller.js');
const Tasks = require('../controllers/taskscontroller.js');


module.exports = {
    Query: {
        //Queries de las Cards
        Cards(_, {ID}){
            return Cards.findCard(ID);
        },
        getCards(){
            return Cards.qryCards();
        },

        //Queries de las Tasks
        async Task(_, {ID}){
            return Tasks.findTask(ID);
        },
        async getTasks(_, {cardId}){
            return Tasks.qryCards(cardId);
        }     
       
    },

    Mutation: {
        /**
         * Mutations de Cards
         */

        /**
         * Creamos la Card
         * @param {*} _ 
         * @param {*} param1 
         * @returns 
         */
        async createCards(_, {CardsInput: {semana, nombre, color, descripcion, year, vacaciones}}){
           return Cards.newCard(semana, nombre, color, descripcion, year, vacaciones);
        },

        async deleteCards(_, {cardId:id}){     
            return Cards.delCard(id);
        },

        async editCards(_, {cardId:id, CardsInput: {color, descripcion, vacaciones}}){
            return Cards.updCard(id, color, descripcion, vacaciones);
        },
      
        /**
         * Mutations de Tasks
         */
        
        async createTask(_, {TaskInput: {cardId, nombre,  descripcion, color, dia, completada, horaI, horaF}}){
            return Tasks.newTask(cardId, nombre, descripcion,  color, dia, completada, horaI, horaF);
        },

        async deleteTask(_, {ID}){
            return Tasks.delTask(ID);
        },

        async deleteTasksOfTheWeek(_, {ID}){
            return Tasks.delCardTasks(ID);
        },

        async editTask(_, {taskid, TaskInput: {nombre, descripcion,  color, dia,  horaI, horaF}}){
            return Tasks.updTask(taskid, nombre, descripcion,  color, dia,  horaI, horaF);
        }

    }
}