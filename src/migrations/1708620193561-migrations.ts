import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708620193561 implements MigrationInterface {
    name = 'Migrations1708620193561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-02-22T16:43:14.764Z"'`);
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '"2024-02-22T16:43:14.764Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '2024-02-22 16:36:44.665'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-02-22 16:36:44.665'`);
    }

}
