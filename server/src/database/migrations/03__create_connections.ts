import Knex from 'knex';

//Fazer alteração no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
        //id do prof e a hora registrada
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();     
        
    })
}



//Desfazer alteração no banco caso de algo errado 
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}