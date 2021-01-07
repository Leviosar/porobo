import { ApiResponseDTO, CurrentGameInfoDTO, SpectatorNotAvailableDTO, SummonerV4DTO } from 'twisted/dist/models-dto'
import { Constants, LolApi } from 'twisted'

import ActiveGamePresenter from '../presenters/ActiveGamePresenter'
import BaseCommand from './base'
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

        const match = await api.Spectator.activeGame(
            user.response.id,
            Constants.Regions.BRAZIL,
        ) as SpectatorNotAvailableDTO | ApiResponseDTO<CurrentGameInfoDTO>
        
        if (Object.keys(match).includes('message')) {
            message.channel.send('O invocador não está em nenhuma partida ativa')
        } else {
            const activeMatch: CurrentGameInfoDTO = (match as ApiResponseDTO<CurrentGameInfoDTO>).response 
            message.channel.send(new ActiveGamePresenter(user.response, activeMatch).show())
        }
    },
    name: 'match',
    help: 'Shows summoner\'s current match',
    usage: '!match username',
    argc: 1,
    hasRegisterParam: true
}

export default match