import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EVENT = gql`
    mutation saveEvent($eventId: ID!) {
        saveEvent(eventId: $eventId) {
            _id
            username
        }
    }
    `;
export const REMOVE_EVENT = gql`
    mutation removeEvent($eventId: ID!) {
        removeEvent(eventId: $eventId) {
            _id
            username
        }
    }
    `;

