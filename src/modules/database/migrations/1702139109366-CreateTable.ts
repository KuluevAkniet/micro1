import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTable1702139109366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE "users(
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "create_date" TIMESTAMP NOT NULL DEFAULT now(), 
            "update_date" TIMESTAMP NOT NULL DEFAULT now(),
            "name" character varying NOT NULL, 
            "lastname" character varying NOT NULL,
        )"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
