import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {

    public async register({ request }: HttpContextContract){
        const data = await request.validate(RegisterUserValidator) /*Usa o RegisterUserValidator validar os dados enviados; como o await, ele só passa pra linha de baixo quando dá certo */
        const user = await User.create(data)
        return user
    }

    public async login({request, auth, response}: HttpContextContract){
        try{
            const { email, password } = request.all()
            const token = await auth.use('api').attempt(email, password, { /*Usa o sistema de autenticação api, tenta autenticar o usuário com base no email e password recebidos; se der certo, ele gera um token.*/
                expiresIn: '1day'
            })
            const user = await User.findByOrFail("email", email) /*Verifica no banco de dados se esse email existe*/
            return { token, user}
        }catch (error){
            response.status(401).send("Login ou senha incorretos!") /*se alguma coisa der errado, ele retorna essa mensagem de erro*/
        }
    }

}
