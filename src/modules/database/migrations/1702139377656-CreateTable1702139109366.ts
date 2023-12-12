import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable17021391093661702139377656 implements MigrationInterface {
    name = 'CreateTable17021391093661702139377656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "lastname" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
