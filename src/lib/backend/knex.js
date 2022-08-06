import knexConfig from "../../../knexfile.js";
import knexInitializer from "knex";

export default knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);
