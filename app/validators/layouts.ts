import vine from '@vinejs/vine'

export const layoutStoreValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim().optional(),
    aislesDirection: vine.boolean(),
    document: vine.file().optional(),
  })
)
