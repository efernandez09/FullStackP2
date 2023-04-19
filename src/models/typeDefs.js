const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
  type Task {
    taskId: ID!,
    idcard: String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int
  }

  type Card {
    cardId: ID!,
    num_semana: String!,
    nombre: String!,
    color: String!,
    descripcion: String!,
    year: String!,
    vacaciones: Boolean
  }

  type Query { 
    getTasks: [Task]
  }



`;

module.exports = typeDefs;