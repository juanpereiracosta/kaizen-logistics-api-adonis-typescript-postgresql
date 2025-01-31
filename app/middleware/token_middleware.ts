import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.request.header('Authorization') === env.get('DB_ACTIVITY_VIEW_USER_PASSWORD')) {
      return next()
    } else {
      ctx.response.status(401).send('Unauthorized access')
      return
    }
  }
}
