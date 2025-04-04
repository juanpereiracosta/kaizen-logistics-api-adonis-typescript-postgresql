import Document from '#models/document'
import Layout from '#models/layout'
import { layoutStoreValidator } from '#validators/layouts'
import { HttpContext } from '@adonisjs/core/http'

export default class LayoutsController {
  async index({ }: HttpContext) {
    return Layout.all()
  }

  async show({ params }: HttpContext) {
    return Layout.findOrFail(params.id)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(layoutStoreValidator)
    // Create a new document
    const document = await Document.create({
      filename: 'payload.filename',
      path: 'payload.path',
      mimeType: 'payload.mimeType',
      type: 'layout',
    })

    // Create a new layout and associate it with the document
    const newLayout = await Layout.create({
      ...payload,
      documentId: document.id,
    })

    return `Created layout with ${JSON.stringify(newLayout)} and associated document ${JSON.stringify(document)}`
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(layoutStoreValidator)
    const updatedLayout = await Layout.query().where('id', params.id).update(payload)
    return `Update layout ${params.id} with ${JSON.stringify(updatedLayout)}`
  }

  async destroy({ params }: HttpContext) {
    await Layout.query().where('id', params.id).delete()
    return `Delete layout ${params.id}`
  }
}
