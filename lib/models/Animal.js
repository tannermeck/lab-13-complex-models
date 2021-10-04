import pool from '../utils/pool.js';

export default class Animal{
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.species_id = row.species_id;
  }
  static async insert({ name, color, species_id }){
    const { rows } = await pool.query(
      'INSERT INTO animals (name, color, species_id) VALUES ($1, $2, $3) RETURNING *',
      [name, color, species_id]
    );
    return new Animal(rows[0]);
  }
}
