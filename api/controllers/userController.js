const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { createJwtToken } = require('../utils/JWT')

const createToken = async (user) => {

    const payload = {
        id: user.id,
        email: user.email
    };
    console.log("createjwttoken=",createJwtToken(payload))
    return createJwtToken(payload);
    
};

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        let userexists = await User.findOne({ where: { email } })
            .catch((err) => {
                console.log("Error : ", err)
            })
        //Checking for email uniqueness
        if (userexists) {
            res.status(httpStatus.CONFLICT).json("User already exists.Try to log in..")
        }
        else {
            //Create User

            bcrypt.hash(password, 10).then(async (hash) => {

                const newUser = new User({ username, email, password: hash })
                const savedUser = await newUser.save().catch((err) => {
                    console.log("Error : ", err);
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Cannot register user at the moment!" })
                })


                if (savedUser)
                    res.status(httpStatus.CREATED).json(savedUser);
            })
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

exports.loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body

        let userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
            console.log("Error : ", err);
        })
        //If user with the given email is not found
        !userWithEmail && res.status(httpStatus.NOT_FOUND).json("User email not registered!!!..")

        //If user is found compare password with database password

        const dbpassword = userWithEmail.password
        bcrypt.compare(password, dbpassword).then(async (match) => {
            if (!match) {
                res.status(httpStatus.BAD_REQUEST).json({ error: "Wrong Username and Password combination" })
            }
            //If password is validated create a token
            else {
                const jwtToken = await createToken(userWithEmail)
                console.log("JWT token = ",jwtToken)

                res.status(httpStatus.OK).json({ message: `Welcome ${userWithEmail.username}!!!`, token: jwtToken });
            }
        })
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getHome = (req, res, next) => {
    try {
        res.status(httpStatus.OK).json("User authenticated. Token validated....")
    }
    catch (err) {
        next(err)
        res.json(err)
    }
}