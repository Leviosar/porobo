import BaseCommand from './models/BaseCommand'
import { Collection } from "discord.js"
import elo from './commands/elo'
import match from './commands/match'
import summoner from './commands/summoner'
import winratio from './commands/winratio'

const commands = [summoner, winratio, elo, match]
const registered = new Collection<string, BaseCommand>()

for (const command of commands) {
    registered.set(command.name, command)
}

export default registered