import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708615433127 implements MigrationInterface {
    name = 'Migrations1708615433127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD "tattooAfterId" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-02-22T15:23:54.352Z"'`);
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '"2024-02-22T15:23:54.352Z"'`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_602ffbd6c682269e1bd46ca26b5" FOREIGN KEY ("tattooAfterId") REFERENCES "tattoo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_602ffbd6c682269e1bd46ca26b5"`);
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '2024-02-22 15:11:31.988'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-02-22 15:11:31.962'`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "tattooAfterId"`);
    }

}
