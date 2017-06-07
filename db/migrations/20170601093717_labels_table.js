
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('labels', (table) => {
      table.increments()
      table.string('color')
      table.integer('board_id')
      table.string('description')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('labels')
  ])
};
