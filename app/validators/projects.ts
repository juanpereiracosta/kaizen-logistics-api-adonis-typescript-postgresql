import vine from '@vinejs/vine'

export const projectStoreValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim().optional(),
  })
)
