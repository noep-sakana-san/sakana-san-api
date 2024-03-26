import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711188067191 implements MigrationInterface {
    name = 'Migrations1711188067191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-03-23T10:01:09.081Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-03-23T10:01:09.147Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-03-14 11:23:57.246'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-03-14 11:23:57.246'`);
    }

}
