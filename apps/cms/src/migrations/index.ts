import * as migration_20261022_053522_initial from "./20261022_053522_initial";
import * as migration_20261022_191546_add_project_cast from "./20261022_191546_add_project_cast";

export const migrations = [
  {
    up: migration_20261022_053522_initial.up,
    down: migration_20261022_053522_initial.down,
    name: "20261022_053522_initial",
  },
  {
    up: migration_20261022_191546_add_project_cast.up,
    down: migration_20261022_191546_add_project_cast.down,
    name: "20261022_191546_add_project_cast",
  },
];
