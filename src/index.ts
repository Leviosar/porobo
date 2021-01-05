import { Client } from 'discord.js'
import commands from './loader'

require('dotenv').config({path: __dirname + '/../.env'})

const client = new Client()
console.log(commands)

client.once('ready', () => {
    console.log('To vivo irmão')
})

client.on('message', (message) => {
    // Caso a mensagem recebida não comece com o prefix ou tenha sido enviada pelo bot
    // não tem como ser um comando. 
    if (!message.content.startsWith(process.env.PREFIX as string) || message.author.bot) return;

    // Quebra a mensagem (removendo o prefixo) em palavras
    const words = message.content.slice(process.env.PREFIX?.length).trim().split(/ +/);
    
    // Extrai dos argumentos o nome do comando
    const commandName = words.shift()?.toLowerCase();
    const command = commands.get(commandName as string)

    // Caso o comando não esteja registrado retorna
    if (command === undefined) return

    // Trata parâmetros com aspas. Para passar um parâmetro com espaço no meio é necessário
    // fazer "parametro legal".
    let argv = []
    let args = words.join(' ')
    const ticked = args.match(/\"(.*?)\"/g)

    if (ticked !== null) {
        for (const word of ticked) {
            argv.push(word.toString().substr(1, word.length - 2))
            args = args.replace(word.toString().substr(1, word.length - 2), '')
        }
    }

    argv = argv.concat(args.split(/ +/))
    argv = argv.filter(el => el !== '""')

    // Caso o comando tenha a mesma quantidade de argumentos necessários
    // que a string recebida, tenta executar
    if (command?.argc === argv.length) {
        try {
            command.callback(message, argv)
        } catch (error) {
            console.error("Ehhh, não sei o que rolou não, olha o log (mentira não tem log)")
            message.reply("Ta pegando fogo bicho")
        }
    } else {
        message.reply("Amigão, faltou argumento ai. \n" + command?.usage as string)
    }
    
})

client.login(process.env.TOKEN)