import { Message } from 'discord.js'

export interface ParseResult {
    flags: Record<string, any>[],
    argv: any[],
    command: string,
}

export const parse = function (message: Message) : ParseResult {
    // Quebra a mensagem (removendo o prefixo) em palavras
    const words = message.content.slice(process.env.PREFIX?.length).trim().split(/ +/);
        
    // Extrai dos argumentos o nome do comando
    const commandName = words.shift()?.toLowerCase();

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
    argv = argv.filter(el => el !== '""' && el !== '')

    return {
        flags: [],
        argv: argv,
        command: commandName!
    }
} 