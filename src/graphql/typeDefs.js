const { gql } = require('apollo-server-express'); 

module.exports = gql`
type Task {
    cardId: String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int
  }

type Cards{
    cardId: String!
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
    cardId:  String!,
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
    getTasks(cardId: ID!): [Task]
    Cards(ID: ID!): Cards!
    getCards: [Cards]
}

type Mutation {
    createCards(CardsInput: CardsInput): Cards!
    deleteCards(cardId: String!): Boolean
    editCards(cardId: String!, CardsInput: CardsInput): Boolean
  
    createTask(taskInput: TaskInput): Task!
    deleteTask(cardId: String!): Boolean
    deleteTasksOfTheWeek(cardId: ID!): Int
    editTask(cardId: String!, taskInput: TaskInput): Boolean
}
`

