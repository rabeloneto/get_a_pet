const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

//helpers 
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController{

  static async register(req,res){
    
    const {name, email, phone, password, confirmpassword } = req.body

    //validations
    if(!name){
        res.status(422).json({message:' O nome é Gugu'})
        return
    }
     if(!email){
        res.status(422).json({message:' O email é Gugu'})
        return
    }
     if(!phone){
        res.status(422).json({message:' O phone é Gugu'})
        return
    }
     if(!password){
        res.status(422).json({message:' O password é Gugu'})
        return
    }
     if(!confirmpassword){
        res.status(422).json({message:' O confirmpassword é Gugu'})
        return
    }

    if(password !== confirmpassword){
        res.status(422).json({message:'a senha e a confirmacao de senha precisam bater'})
        return
    }  
     
    //check if user exist
    const userExists = await User.findOne({email : email})

    if(userExists){
        res.status(422).json({message:'oto email patrao '})
        return
    }

    // create password 
    const salt = await bcrypt.genSalt(12)
    const passwordHash =  await bcrypt.hash(password, salt)

    //create a user 
    const user = new User({
        name,
        email,
        phone,
        password: passwordHash,

    })

    try {
        
        const newUser = await user.save()
       
        await createUserToken(newUser, req , res )
    } catch (error) {
        res.status(500).json({message: error })
    }
   
  }
  

  static async login(req,res){
    
    const {email, password} = req.body

    if(!email){
        res.status(422).json({message:' O email é obrigatorio'})
        return
    }

    if(!password){
        res.status(422).json({message:'A senha é obrigatoria'})
        return
    }

    //check if user exist
    const user = await User.findOne({email : email})

    if(!user){
        res.status(422).json({message:'Não há usuario cadastrado com esse email'})
        return
    }

    //check if password match's
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        res.status(422).json({message:'Senha invalida'})
        return
    }

    await createUserToken(user,req,res)
  }


  static async checkUser(req,res){
    let currentUser

    

    if(req.headers.authorization){

        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')

        currentUser = await User.findById(decoded.id)

        currentUser.password = undefined

    }else{
        currentUser = null
    }

    res.status(200).send(currentUser)
  }


  static async getUserById(req,res){

    const id = req.params.id
    const user = await User.findById(id).select("-password")

    if(!user){
        res.status(422).json({message:'Usuario nao encontrado!'})
        return
    }
     res.status(200).json({ user })
  }

  static async editUser(req,res){
    res.status(200).json({message:'Update feito com sucesso!'})
        return
  }
}