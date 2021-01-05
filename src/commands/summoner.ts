import { ApiResponseDTO, SummonerV4DTO } from 'twisted/dist/models-dto';
import { Constants, LolApi } from 'twisted'

import BaseCommand from '../models/BaseCommand';
import { Message } from "discord.js";

const summoner: BaseCommand = {
    callback: async (message: Message, argv: Array<string>) => {
        const summonerName = argv[0]
        
        const api = new LolApi({
            key: process.env.RIOT_TOKEN
        })
        
        const user = await api.Summoner.getByName(
            summonerName, 
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<SummonerV4DTO>
        
        const league = await api.League.bySummoner(user.response.id, Constants.Regions.BRAZIL)
        console.log(league)
        message.channel.send(JSON.stringify(":D"))
    },
    name: 'summoner',
    help: 'Shows summoner',
    usage: '!summoner username',
    argc: 1,
}

export default summoner