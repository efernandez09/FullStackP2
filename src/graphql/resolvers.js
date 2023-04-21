const Card = require('../models/cardModel');
const Task = require('../models/taskModel');
const {getCards} = require('../controllers/cardControllers')

// IMPORTANTE, las querys/mutations se tienen que crear utilizando los métodos
// Ya definidos en los controllers.
module.exports = {
    Query: {
        //Queries de las Cards
        async Card(_, {ID}){
            return await Card.findById(ID)
        },
        // Ejemplo!!!
        async getCards(){
            try {
                getCards();
                console.log('Mostrando las Cards...');
            } catch (error) {
                console.log("No se han podido mostrar las cards: " + error );
            }
        } ,
        //Queries de las Tasks
        async Task(_, {ID}){
            return await Task.findById(ID)
        },
        async getTasks(){
            return await Task.find().sort({ dia: -1}) //-1 the most recent ,1 the oldest
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
        async createCard(_, {CardInput: {num_semana, nombre, color, descripcion, year, vacaciones}}){
            //primer crea l'objecte
            const createdCard = new Card({
                num_semana: num_semana, 
                nombre: nombre, 
                color:color, 
                descripcion:descripcion, 
                year:year, 
                vacaciones:vacaciones
            });

            const res = await createdCard.save(); //MongoDb Saving
            console.log(res._doc);
            //retorna el resultat el id el farem servir per identificar la card al html
            return {
                id: res.id, 
                ...res._doc
            }
        },

        async deleteCard(_, {ID}){
            const deleteOk = (await Card.deleteOne({_id: ID})).deleteCount;            
            return deleteOk; //1 if somethins was delete, 0 if nothing was deleted
        },

        async editCard(_, {ID, CardInput: { nombre, color, descripcion,  vacaciones}}){
            const updateOk = (await Card.updateOne({_id: ID}, { nombre:nombre, color:color, descripcion:descripcion, vacaciones:vacaciones})).modifiedCount;
            return updateOk; //1 was edited, 0 nothing edited
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