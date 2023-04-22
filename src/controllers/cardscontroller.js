const Cards = require('../models/cards');

exports.findCardById = async (id)=>{
    try{
        return await Cards.findOne({ cardId: id });
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.qryCards = async ()=>{
    try{
        return  await Cards.find({}).sort({year: -1, semana: -1}) //-1 the most recent ,1 the oldest
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.newCard = async (semana, nombre, color, descripcion, year, vacaciones)=>{
    try{
        //l'id de la card serà any i semana, no hi poden haver dos repetides
        const Id = year.toString() + semana.toString();
        //primer crea l'objecte
        const createdCards = new Cards({
            cardId: Id,
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
    }
    catch(e){
        console.log(e);
        return -1;
    }  
}

exports.delCard= async (id) => {
    try{
        const cardDeleted = (await Cards.deleteOne({cardId: id})).deleteCount;
        //llamar a borrado de tareas asociadas
        return cardDeleted;
    }
    catch(e){
        console.log(e);
        return -1;
    }
}

exports.updCard= async (id, color, descripcion, vacaciones) => {
    try{
        const cardMod = (await Cards.updateOne({cardId: id}, { color, descripcion, vacaciones})).modifiedCount;
        return cardMod;
    }
    catch(e){
        console.log(e);
        return -1;
    }
}