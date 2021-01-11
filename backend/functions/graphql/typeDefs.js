const gql = require('graphql-tag')

module.exports = gql`
    ####################types##################
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        profilePicture: String
        birthday: String
        mobileNumber: String
        gender: String
        token: String!
    }

    ####################Queries##################
    type Query {
        getPost: String
    }

    ####################Inputs##################
    input RegisterInput {
        username: String!
        password: String!
        birthday: String
        gender: String
        mobileNumber: String
        email: String!
    }
    
    ####################Mutations##################
    type Mutation {
        registerUser(registerInput: RegisterInput ): User! 
    }
`