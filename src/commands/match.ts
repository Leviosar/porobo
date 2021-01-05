import { ApiResponseDTO, MatchListingDto, SummonerLeagueDto, SummonerV4DTO } from 'twisted/dist/models-dto';
import { Constants, LolApi } from 'twisted'

import BaseCommand from '../models/BaseCommand'
import { Message } from 'discord.js'

const match: BaseCommand = {
    callback: async (message: Message, argv: Array<string>) => {
        const summonerName = argv[0]
        
        const api = new LolApi({
            key: process.env.RIOT_TOKEN
        })
        
        const user = await api.Summoner.getByName(
            summonerName, 
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<SummonerV4DTO>

        const matches = await api.Match.list(
            user.response.accountId,
            Constants.Regions.BRAZIL
        ) as ApiResponseDTO<MatchListingDto>
        console.log(matches)
        message.channel.send("Grande p caralho")
    },
    name: 'match',
    help: 'Shows summoner\'s current match',
    usage: '!match username',
    argc: 1,
}

export default match