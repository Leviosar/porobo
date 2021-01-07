import BaseCommand from './base';
import { Message } from 'discord.js';

const winratio: BaseCommand = {
    callback: (message: Message, argv: Array<string>) => {
        // LÓGICA BAGA
        message.channel.send('0% amigão')
    },
    name: 'Winratio',
    help: 'Shows winratio',
    usage: '!winrate username',
    argc: 1,
    hasRegisterParam: true
}

export default winratio