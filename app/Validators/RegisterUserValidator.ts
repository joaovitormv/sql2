import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    name: schema.string({}, [
      rules.required()
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email'})
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(4)
    ])
  })


  public messages: CustomMessages = {
    required: "0 {{field}} é obrigatório para se registrar!!!",
    'email.unique': "E-mail já cadastrado!!!",
    'minLenght': "Tamanho de senha inválida"
  }
}
