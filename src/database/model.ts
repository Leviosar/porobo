import DAO from "./dao";

export default class BaseModel {
    public name: string = 'model';

    private db: DAO;

    constructor(db: DAO) {
        this.db = db
    }

    insert(params: Record<string, any>) {
        const argc = Object.keys(params).length
        
        const fields = `${Object.keys(params).join(', ')}`
        
        let values = '?,'.repeat(argc)
        values = values.substring(0, values.length - 1)
        
        const sql = `INSERT INTO ${this.name} (${fields}) VALUES (${values})`
        
        this.db.run(sql, Object.values(params))
        
        return sql
    }
}