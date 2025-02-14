import User from '#models/user'
import { authPostValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const payload = await request.validateUsing(authPostValidator)

    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user, ['*'], {
      name: user.name!,
      expiresIn: '60 minutes',
    })

    const responseObject: any = {
      tokenData: token,
      userData: {
        role: user.role,
      },
    }

    return responseObject
  }

  async whois({ auth }: HttpContext) {
    const userData = auth.user?.serialize({
      fields: ['id', 'name', 'email', 'role'],
    })
    return userData
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user
    if (user) {
      const token = user.currentAccessToken
      try {
        await User.accessTokens.delete(user, token.identifier)
      } catch (error) {}
    }
  }
}
