exports.up = function (knex) {
  return knex.schema.createTable("palette", function (table) {
    table.increments("id");
    table.integer("red").notNullable();
    table.integer("green").notNullable();
    table.integer("blue").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("palette");
};
