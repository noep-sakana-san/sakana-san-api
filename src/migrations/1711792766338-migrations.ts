import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711792766338 implements MigrationInterface {
    name = 'Migrations1711792766338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "coverImageId" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD "coverHealedId" integer`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-03-30T09:59:27.985Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-03-30T09:59:27.986Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-03-29 17:01:41.138'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-03-29 17:01:41.11'`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverHealedId"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverImageId"`);
    }

}
