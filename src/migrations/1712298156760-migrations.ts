import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712298156760 implements MigrationInterface {
    name = 'Migrations1712298156760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-04-05T06:22:38.413Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-04-05T06:22:38.413Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-03-30 10:37:34.364'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-03-30 10:37:34.364'`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "isArchived"`);
    }

}
