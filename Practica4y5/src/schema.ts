import {gql} from "apollo-server-express";

const Schema = gql`
    type Ingredient{
        id: ID!
        name: String!
        recipes: [Recipe!]!
    }

    type Recipe{
        id: ID!
        name: String!
        description: String!
        ingredients: [Ingredient!]!
        author: User!
        token: String
    }
  
    type User{
        id: ID!
        email: String!
        token: String
        pwd: String!
        recipes: [Recipe!]!
    }

    input UserAcount{
        email: String!
        pwd: String!
    }

    input UserAcountT{
        email: String!
        pwd: String!
        token: String!
    }

    type Query{

    }

    type Mutation{
        SignIn(input: UserAcount!): String!
        SignOut: Boolean!
        Login:(input: UserAcountT!): String!
    }
`

export default Schema;