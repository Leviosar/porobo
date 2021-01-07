import * as sqlite3 from 'sqlite3'

import { Database, open } from 'sqlite'

export default class DAO {
    // ! é uma decoração para identificar que a propriedade instance só terá
    // valor durante o runtime. Sem ela, o Typescript indica um erro de propriedade
    // não inicializada.    
    public instance!: Database<sqlite3.Database, sqlite3.Statement>;

    private databasePath;

    constructor(databasePath: string) {
        this.databasePath = databasePath
    }

    async init() {
        this.instance = await open({
            filename: this.databasePath,
            driver: sqlite3.Database
        })
    }

    async run(query: string, params: Array<any> = []) {
        try {
            return await this.instance.run(query, params)
        } catch (error) {
            console.log(error)
        }
    }
}