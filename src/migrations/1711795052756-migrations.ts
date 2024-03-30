import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711795052756 implements MigrationInterface {
    name = 'Migrations1711795052756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-03-30T10:37:34.364Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-03-30T10:37:34.364Z"'`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverImageId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "coverImageId" character varying`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverHealedId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "coverHealedId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverHealedId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "coverHealedId" integer`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "coverImageId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "coverImageId" integer`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-03-30 09:59:27.986'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-03-30 09:59:27.985'`);
    }

}
