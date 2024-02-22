import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708609291638 implements MigrationInterface {
    name = 'Migrations1708609291638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "isVisible" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "isVisible"`);
    }

}
