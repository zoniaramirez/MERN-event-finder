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

  type Event {
    _id: ID
    image: String
    title: String
    date: String
    description: String
    link: String
    price: Float
  }

  type Query {
    events: [Event]!
    event(id: ID!): Event
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
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
      price: Float
    ): User
    removeEvent(id: ID!): User
  }
`;

module.exports = typeDefs;
