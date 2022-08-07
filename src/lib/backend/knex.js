import knexConfig from "../../../knexfile.js";
import knexInitializer from "knex";

const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

export default knex;