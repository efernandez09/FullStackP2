const Cards = require('../models/cards');
const Tasks = require('../models/tasks');

module.exports = {
    Query: {
        //Queries de las Cards
        async Cards(_, {ID}){
            return await Cards.findById(ID)
        },
        async getCards(){
            return await Cards.find() //-1 the most recent ,1 the oldest
        },

        //Queries de las Tasks
        async Task(_, {ID}){
            return await Task.findById(ID)
        },
        async getTasks(_, {cardId}){
            return await Task.find({_id : cardId}).sort({ dia: -1}) //-1 the most recent ,1 the oldest
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
            //primer crea l'objecte
            const createdCards = new Cards({
                semana: semana, 
                nombre: nombre, 
                color: color, 
                descripcion:descripcion, 
                year:year, 
                vacaciones:vacaciones
            });

            const res = await createdCards.save(); //MongoDb Saving
            console.log(res._doc);
            //retorna el resultat
            return {
                id: res.id, 
                ...res._doc
            }
        },

        async deleteCards(_, {ID}){
            const wasDeleted = (await Cards.deleteOne({_id: ID})).deleteCount;            
            return wasDeleted; //1 if somethins was delete, 0 if nothing was deleted
        },

        async editCards(_, {ID, CardsInput: {name, description}}){
            const wasEdited = (await Cards.updateOne({_id: ID}, { name: name, description: description})).modifiedCount;
            return wasEdited; //1 was edited, 0 nothing edited
        },
      
        /**
         * Mutations de Tasks
         */
        
        async createTask(_, {TaskInput: {idcard, nombre,  descripcion, color, dia, completada, horaI, horaF}}){
            //primer crea l'objecte
            const createdTask = new Task({
                idcard:idcard, 
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