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
  static async update({ extinct }, id){
    const { rows } = await pool.query(
      'UPDATE species SET extinct = ($1) WHERE id = ($2) RETURNING *',
      [extinct, id]
    );
    return new Species(rows[0]);
  }
  static async getNonExtinct(){
    const { rows } = await pool.query(
      'SELECT * FROM species WHERE extinct = false'
    );
    console.log(rows);
    return rows;
  }
}
