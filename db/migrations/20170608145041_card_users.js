exports.up = (knex, Promise) =>
  knex.schema.createTable('card_users', (table) => {
    table.integer('user_id').notNullable(),
    table.integer('card_id').notNullable()
  })

exports.down = (knex, Promise) =>
  knex.schema.dropTable('card_users')
