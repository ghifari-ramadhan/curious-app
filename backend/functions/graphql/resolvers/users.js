//firebase
const firebase = require('firebase')
firebase.initializeApp(config)

//GraphQl
const { UserInputError } = require('apollo-server-express')

//Utility
const encrypt = require('bcrypt')
const config = require('../../utility/config')
const { db } = require('../../utility/admin')
const { validateRegisterInput } = require('../../utility/validator')

        
module.exports = {
    Mutation: {
        async registerUser(_, args) {
            const { registerInput: { mobileNumber, email, password, gender, birthday, username } } = args;

            const { valid, errors } = validateRegisterInput(username, password, birthday, gender, mobileNumber, email)

            if (!valid) throw new UserInputError("Errors", { errors })

            let newUser = {
                username,
                email,
                mobileNumber,
                gender,
                birthday,
                createdAt: new Date().toISOString(),
                profilePicture: "link ke foto profile",
            }

            const hash = await encrypt.hash(password, 12)

            try {
                await db.doc(`users/${username}`).get()
                    .then(doc => {
                        if (doc.exists) {
                            throw new UserInputError("username tidak tersedia")
                        }
                        else return firebase.auth().createUserWithEmailAndPassword(email, password)
                    })
                    .then(data => {
                        newUser.id = data.user.uid
                        return data.user.getIdToken()
                    })
                    .then(idToken => {
                        newUser.token = idToken

                        const saveUserData = {
                            id: newUser.id,
                            username,
                            email,
                            mobileNumber,
                            gender,
                            birthday,
                            createdAt: new Date().toISOString(),
                            profilePicture: newUser.profilePicture,
                            _private: []
                        }
                        saveUserData._private.push({
                            hash,
                            lastUpdate: new Date().toISOString()
                        })

                        return db.doc(`/users/${username}`).set(saveUserData)
                    })
                
                return newUser
            }
            catch (err) {
                if (err.code == 'auth/email-already-in-use') throw new UserInputError("Email sudah terdaftar dengan akun lain")
                throw new Error(err)
            }
        }
    }
}