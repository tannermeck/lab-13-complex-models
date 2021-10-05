DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    extinct BOOLEAN NOT NULL
);
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    species_id INTEGER,
    FOREIGN KEY(species_id) references species(id)
)