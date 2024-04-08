import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712391763755 implements MigrationInterface {
    name = 'Migrations1712391763755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-04-06T08:22:44.814Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-04-06T08:22:44.814Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-04-05 06:22:38.413'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-04-05 06:22:38.413'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
