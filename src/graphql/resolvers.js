const Cards = require('../controllers/cardscontroller.js');
const Tasks = require('../models/tasks');



module.exports = {
    Query: {
        //Queries de las Cards
        Cards(_, {ID}){
            return findCardById(ID);
        },
        getCards(){
            return Cards.qryCards();
        },

        //Queries de las Tasks
        async Task(_, {ID}){
            return await Tasks.findById(ID)
        },
        async getTasks(_, {cardId}){
            return await Tasks.find({_id : cardId}).sort({ dia: -1}) //-1 the most recent ,1 the oldest
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
            console.log(id);
            return Cards.delCard(id);
        },

        async editCards(_, {cardId:id, CardsInput: {color, descripcion, vacaciones}}){
            return Cards.updCard(id, color, descripcion, vacaciones);
        },
      
        /**
         * Mutations de Tasks
         */
        
        async createTask(_, {TaskInput: {cardId, nombre,  descripcion, color, dia, completada, horaI, horaF}}){
            //primer crea l'objecte
            const createdTask = new Task({
                cardId:cardId, 
                nombre:nombre,  
                descripcion:descripcion, 
                color:color, 
                dia:dia, 
                completada:completada, 
                horaI:horaI, 
                horaF:horaF
            });

            const res = await createdTask.save(); //MongoDb Saving
            console.log(res._doc);
            //retorna el resultat, el id el farem servir per identificar la tasca al html
            return {
                id: res.id, 
                ...res._doc
            }
        },

        async deleteTask(_, {ID}){
            const wasDeleted = (await Task.deleteOne({_id: ID})).deleteCount;            
            return wasDeleted; //1 if somethins was delete, 0 if nothing was deleted
        },

        async deleteTasksOfTheWeek(_, {ID}){
            const numDeleted = (await Task.deleteMany({cardId: ID})).deleteCount;            
            return numDeleted; //count of deleted tasks
        },

        async editTask(_, {ID, TaskInput: {name, description}}){
            const wasEdited = (await Task.updateOne({_id: ID}, { name: name, description: description})).modifiedCount;
            return wasEdited; //1 was edited, 0 nothing edited
        }

    }
}