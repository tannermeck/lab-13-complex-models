import pool from '../utils/pool.js';

export default class Species {

  constructor(row){
    this.id = row.id;
    this.type = row.type;
    this.extinct = row.extinct;
  }
  static async insert({ type, extinct }){
    const { rows } = await pool.query(
      'INSERT INTO species (type, extinct) VALUES ($1, $2) RETURNING *',
      [type, extinct]);
    return new Species(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM species ORDER BY id',
    );
    return rows.map(row => {
      return new Species(row);
    });
  }
  
}
