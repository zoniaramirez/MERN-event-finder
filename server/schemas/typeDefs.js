const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedEvents: [Event]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    events: [Event]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
  }
  
  type Event {
    _id: ID
    image: String
    title: String
    date: String
    description: String
    link: String
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    saveEvent( 
      id: ID
      image: String
      title: String
      date: String
      description: String
    ): User
    removeEvent(id: ID!): User
  }
`;

module.exports = typeDefs;
