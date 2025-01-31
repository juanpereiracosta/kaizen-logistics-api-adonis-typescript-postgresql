import vine from '@vinejs/vine'

export const authPostValidator = vine.compile(
  vine.object({
    //name: vine.string().trim(),
    email: vine.string().trim().escape().email(),
    password: vine.string().trim(),
  })
)

export const authRegisterValidator = vine.compile(
  vine.object({
    //name: vine.string().trim(),
    email: vine.string().trim().escape().email(),
    password: vine.string().trim(),
    role: vine.enum(['admin']),
  })
)
