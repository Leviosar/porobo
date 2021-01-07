import { ApiResponseDTO, SummonerV4DTO } from 'twisted/dist/models-dto';
import { Constants, LolApi } from 'twisted'

import BaseCommand from './base';
import DAO from '../database/dao';
import { Message } from 'discord.js';
import UserRepository from '../database/user';

const register: BaseCommand = {
    callback: async (message: Message, argv: Array<string>, database: DAO) => {
        const summonerName = argv[0]
        
        const api = new LolApi({
            key: process.env.RIOT_TOKEN
        })
        
        const user = await api.Summoner.getByName(
            summonerName, 
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<SummonerV4DTO>
        
        if (user.response.id) {
            const userRepository = new UserRepository(database)
            
            userRepository.upsert({
                'discord_id': message.author.id,
                'discord_user': message.author.username,
                'riot_id': user.response.id,
                'riot_user': user.response.name
            })

            message.reply('teje registrado.')
        } else {
            message.reply('Não consegui te encontrar colega, o nick ta certo mesmo?')
        }
    },
    name: 'register',
    help: 'Links discord account with riot username',
    usage: '!register <username>',
    argc: 1,
    hasRegisterParam: false
}

export default register