
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTimeSlots extends BaseSchema {
    protected tableName = 'appointments'

    public async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer("teacher_id").notNullable();
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}