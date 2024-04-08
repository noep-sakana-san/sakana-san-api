import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712416301813 implements MigrationInterface {
    name = 'Migrations1712416301813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-04-06T15:11:43.318Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-04-06T15:11:43.360Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-04-06 14:51:25.308'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-04-06 14:51:25.261'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
