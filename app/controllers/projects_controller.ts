import Project from '#models/projects'
import { projectStoreValidator } from '#validators/projects'
import { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {
  async index({}: HttpContext) {
    return Project.all()
  }

  async show({ params }: HttpContext) {
    return Project.findOrFail(params.id)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(projectStoreValidator)
    const newProject = await Project.create(payload)
    return `Create project with ${JSON.stringify(newProject)}`
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(projectStoreValidator)
    const updatedProject = await Project.query().where('id', params.id).update(payload)
    return `Update project ${params.id} with ${JSON.stringify(updatedProject)}`
  }

  async destroy({ params }: HttpContext) {
    await Project.query().where('id', params.id).delete()
    return `Delete project ${params.id}`
  }
}
