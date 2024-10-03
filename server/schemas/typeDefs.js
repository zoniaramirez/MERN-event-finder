const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    saveEvent: [Event]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
  }
  
  type Event {
    _id: ID
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    saveEvent(eventId: ID!): User
    removeEvent(eventId: ID!): User
  }
`;

module.exports = typeDefs;
