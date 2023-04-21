const { gql } = require('apollo-server-express'); 

module.exports = gql`
type Task {
    idcard: String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int
  }

type Cards{
    semana: Int!
    nombre: String!
    color: String!
    descripcion: String!
    year: Int
    vacaciones: Boolean
}

input CardsInput {
    semana: Int!
    nombre: String!
    color: String!
    descripcion: String!
    year: Int
    vacaciones: Boolean
}


input TaskInput {
    idcard:  String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int
}

type Query{    
    Task(ID: ID!): Task!
    getTasks(idcard: ID!): [Task]
    Cards(ID: ID!): Cards!
    getCards: [Cards]
}

type Mutation {
    createCards(CardsInput: CardsInput): Cards!
    deleteCards(ID: ID!): Boolean
    editCards(ID: ID!, CardsInput: CardsInput): Boolean
  
    createTask(taskInput: TaskInput): Task!
    deleteTask(ID: ID!): Boolean
    deleteTasksOfTheWeek(cardId: ID!): Int
    editTask(ID: ID!, taskInput: TaskInput): Boolean
}
`

