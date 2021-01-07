import BaseCommand from './commands/base'
import { Collection } from "discord.js"
import elo from './commands/elo'
import match from './commands/match'
import register from './commands/register'
import summoner from './commands/summoner'
import winratio from './commands/winratio'

const commands = [summoner, winratio, elo, match, register]
const registered = new Collection<string, BaseCommand>()

for (const command of commands) {
    registered.set(command.name, command)
}

export default registered