import { Champions, getChampionNameCapital } from 'twisted/dist/constants'
import { CurrentGameInfoDTO, SummonerV4DTO } from 'twisted/dist/models-dto'
import { EmbedFieldData, MessageEmbed, MessageEmbedOptions } from 'discord.js'

export default class ActiveGamePresenter {
    public game: CurrentGameInfoDTO
    public user: SummonerV4DTO

    constructor(user: SummonerV4DTO, game: CurrentGameInfoDTO) {
        this.game = game
        this.user = user
    }

    show () : MessageEmbed {
        const fields: EmbedFieldData[] = []
        
        let team = 'Blue Team'
        let players = ''
        
        for (let i = 0; i < this.game.participants.length / 2; i++) {
            const nick = this.game.participants[i].summonerName
            const champion = getChampionNameCapital(this.game.participants[i].championId)
            players += `${nick} (${champion})\n`
        }

        fields.push({
            name: team,
            value: players,
            inline: true
        })
        
        team = 'Red Team'
        players = ''
        
        for (let i = this.game.participants.length / 2; i < this.game.participants.length; i++) {
            const nick = this.game.participants[i].summonerName
            const champion = getChampionNameCapital(this.game.participants[i].championId)
            players += `${nick} (${champion})\n`
        }

        fields.push({
            name: team,
            value: players,
            inline: true
        })

        console.log(fields)
        
        const options: MessageEmbedOptions = {
            title: `Partida de ${this.user.name}`,
            fields: fields,
        }

        return new MessageEmbed(options)
    }
}