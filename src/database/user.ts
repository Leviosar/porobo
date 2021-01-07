import BaseModel from "./model";
import DAO from "./dao";

export default class UserRepository extends BaseModel {
    private dao;

    public name = 'user'

    constructor(dao: DAO) {
        super(dao)
        this.dao = dao
        this.create()
    }
  
    create() {
        const sql = `
        CREATE TABLE IF NOT EXISTS user (
            discord_id TEXT PRIMARY KEY,
            discord_user TEXT,
            riot_user TEXT,
            riot_id TEXT
        )`
        
        return this.dao.run(sql)
    }

    upsert(params: Record<string, any>) {
        const argc = Object.keys(params).length
        
        const fields = `${Object.keys(params).join(', ')}`
        
        let values = '?,'.repeat(argc)
        values = values.substring(0, values.length - 1)

        const sql = `
        INSERT INTO user (${fields}) VALUES (${values})
        ON CONFLICT(discord_id) DO
            UPDATE SET  
            discord_user = excluded.discord_user, 
            riot_id = excluded.riot_id,
            riot_user = excluded.riot_user;
        `

        this.dao.run(sql, Object.values(params))
    }

    get(id: string) {
        const sql = `SELECT * FROM user WHERE discord_id = ?`
        return this.dao.instance.get(sql, [id])
    }
}