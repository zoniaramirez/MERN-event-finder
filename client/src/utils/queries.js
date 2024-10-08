import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($id: ID!) {
    user(id: $id) {
      _id
      username
      savedEvents {
        _id
        title
        description
        image
        date
        price
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      savedEvents {
        _id
        title
        description
        image
        date
        price
      }
    }
  }
`;

export const EVENTS = gql`
  query events {
    events {
        _id
        title
        description
        image
        price
        date
      }
  }
`;
