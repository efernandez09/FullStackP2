const { gql } = require('apollo-server-express'); 

module.exports = gql`
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

input CardInput {
    cardId: ID!,
    num_semana: String!,
    nombre: String!,
    color: String!,
    descripcion: String!,
    year: String!,
    vacaciones: Boolean
} 


input TaskInput {
    taskId: ID!,
    idcard:  ID!,
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

    Card(ID: ID!): Card!
    getCardWeek(num_semana: String!): Card!
    getCardsYear(year: String!): [Card]
}

type Mutation {
    createCard(cardInput: CardInput): Card!
    deleteCard(ID: ID!): Boolean
    editCard(ID: ID!, cardInput: CardInput): Boolean
    
    createTask(taskInput: TaskInput): Task!
    deleteTask(ID: ID!): Boolean
    deleteTasksOfTheWeek(cardId: ID!): Int
    editTask(ID: ID!, taskInput: TaskInput): Boolean
}
`

