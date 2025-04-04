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
const ProjectsController = () => import('#controllers/projects_controller')
const LayoutsController = () => import('#controllers/layouts_controller')

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
        router.resource('projects', ProjectsController)
        router.resource('layouts', LayoutsController)
      })
      .middleware(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
