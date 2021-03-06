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
  static async getById(id){
    const { rows } = await pool.query(  
      'SELECT * FROM animals WHERE id = ($1)',
      [id]
    );
    return new Animal(rows[0]);
  }
  static async getSpecies(){
    const { rows } = await pool.query(
      'SELECT animals.id, animals.name, animals.color, species.type FROM animals LEFT JOIN species ON animals.species_id = species.id',
    );
    return rows.map(row => {
      return row;
    });
  }
  static async update({ name, color, species_id }, id){
    const { rows } = await pool.query(
      'Update animals SET name = ($1), color = ($2), species_id = ($3) WHERE id = ($4) RETURNING *',
      [name, color, species_id, id]
    );
    return new Animal(rows[0]);
  }
  static async delete(id){
    const { rows } = await pool.query(
      'DELETE FROM animals WHERE id = ($1) RETURNING *',
      [id]
    );
    return new Animal(rows[0]);
  }
  static async getSpeciesCount(){
    const { rows } = await pool.query(
      'SELECT species.type, COUNT(species_id) FROM animals INNER JOIN species ON species.id = animals.species_id GROUP BY GROUPING SETS(species.type)',
    );
    return rows;
  }
}
