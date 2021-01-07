import { ParseResult, parse } from './helpers/argparser'

import { Client } from 'discord.js'
import DAO from './database/dao'
import UserRepository from './database/user'
import { argv } from 'process'
import commands from './loader'

require('dotenv').config({path: __dirname + '/../.env'})

async function main() {
    const client = new Client();
    
    const database = new DAO(process.env.DB_URL!)
    await database.init()

    client.once('ready', async () => {
        console.log('To vivo irmão')
    })
    
    client.on('message', async (message) => {
        // Caso a mensagem recebida não comece com o prefix ou tenha sido enviada pelo bot
        // não tem como ser um comando. 
        if (!message.content.startsWith(process.env.PREFIX as string) || message.author.bot) return;

        const result: ParseResult = parse(message)
        const command = commands.get(result.command)

        if (command === undefined) return
        
        if (command.hasRegisterParam && result.argv.length === 0) {
            const userRepository = new UserRepository(database)
            const user = await userRepository.get(message.author.id)
            
            if (user !== undefined) {
                result.argv.push(user.riot_user)
            }
        }
        
        // Caso o comando tenha a mesma quantidade de argumentos necessários
        // que a string recebida, tenta executar
        if (command?.argc === result.argv.length) {
            try {
                command.callback(message, result.argv, database)
            } catch (error) {
                console.error("Ehhh, não sei o que rolou não, olha o log (mentira não tem log)")
                message.reply("Ta pegando fogo bicho")
            }
        } else {
            message.reply("Amigão, ta errado ai amigo. \n" + command?.usage as string)
        }
        
    })
    
    client.login(process.env.DISCORD_TOKEN)
}

main()