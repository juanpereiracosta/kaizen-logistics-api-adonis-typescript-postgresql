import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new User'

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    const name = await this.prompt.ask("Enter user's name")
    const email = await this.prompt.ask("Enter user's email")
    const password = await this.prompt.secure("Choose user's account password")

    // Step 1: Role selection
    const roles = ['admin']
    const userType = await this.prompt.choice("Choose user's role:", roles)

    // Step 2: Create and save the user
    const newUser = new User()

    newUser.name = name
    newUser.email = email
    newUser.password = password
    newUser.role = userType as 'admin'

    await newUser.save()

    if (newUser.$isPersisted) {
      this.logger.info(`User Created - Id: ${newUser.id}`)
    } else {
      this.logger.error('User creation failed')
    }
  }
}
