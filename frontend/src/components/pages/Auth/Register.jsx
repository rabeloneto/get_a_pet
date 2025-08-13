import { useState, useContext } from 'react'
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom";

//contexts
import {Context} from '../../../context/UserContext'
function Register(){
  const [user,setUser] = useState({})
  const {register} = useContext(Context)

    function handleChange(e){
       setUser({...user, [e.target.name]: e.target.value })
    }
    
    function handleSubmit(e){
       e.preventDefault()
       //enviar o usuario para o banco
       register(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
              <Input
                text="Nome"
                type="text"
                name="name"
                placeholder="digite teu nome"
                handleOnChange={handleChange}
              />
              <Input
                text="Telefone"
                type="text"
                name="phone"
                placeholder="digite teu phone"
                handleOnChange={handleChange}
              />
              <Input
                text="E-mail"
                type="text"
                name="email"
                placeholder="digite teu email"
                handleOnChange={handleChange}
              />
              <Input
                text="Senha"
                type="password"
                name="password"
                placeholder="digite senha"
                handleOnChange={handleChange}
              />
              <Input
                text="Confirmação de senha"
                type="password"
                name="confirmpassword"
                placeholder="confirm digite senha"
                handleOnChange={handleChange}
              />
              <input type="submit" value="cadastrar" />
            </form>
            <p>
              Já tem conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </section>

    )
}

export default Register