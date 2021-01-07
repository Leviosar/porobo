import { ApiResponseDTO, SummonerLeagueDto, SummonerV4DTO } from 'twisted/dist/models-dto';
import { Constants, LolApi } from 'twisted'

import BaseCommand from './base';
import { Message } from "discord.js";

const elo: BaseCommand = {
    callback: async (message: Message, argv: Array<string>) => {
        const summonerName = argv[0]
        
        const api = new LolApi({
            key: process.env.RIOT_TOKEN
        })
        
        const user = await api.Summoner.getByName(
            summonerName, 
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<SummonerV4DTO>
        
        const league = await api.League.bySummoner(
            user.response.id, 
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<SummonerLeagueDto[]>
        
        message.channel.send(`O cara é KKKKKKKKKKKK o cara é ${league.response[0].tier} ${league.response[0].rank} que piada`)
    },
    name: 'elo',
    help: 'Shows summoner\'s elo',
    usage: '!elo username',
    argc: 1,
    hasRegisterParam: true
}

export default elo