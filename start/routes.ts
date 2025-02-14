/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from './kernel.js'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    // unprotected routes
    // Auth login - returns an object
    router.post('login', [AuthController, 'login'])

    // protected routes with auth middleware
    router
      .group(() => {
        router.delete('logout', [AuthController, 'logout'])
        // Auth routes
        router.get('whois', [AuthController, 'whois'])
        router.get('/', async () => {
          return {
            status: 'ok',
          }
        })
      })
      .middleware(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
