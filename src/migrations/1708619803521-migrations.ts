import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708619803521 implements MigrationInterface {
    name = 'Migrations1708619803521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flash" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isVisible" boolean NOT NULL DEFAULT true, "isAvailable" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0c01a2c1c5f2266942dd1b3fdbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD "flashId" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-02-22T16:36:44.665Z"'`);
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '"2024-02-22T16:36:44.665Z"'`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_ee5877e9d448e8894dd4fb29cd6" FOREIGN KEY ("flashId") REFERENCES "flash"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_ee5877e9d448e8894dd4fb29cd6"`);
        await queryRunner.query(`ALTER TABLE "tattoo" ALTER COLUMN "date" SET DEFAULT '2024-02-22 15:23:54.352'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-02-22 15:23:54.352'`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "flashId"`);
        await queryRunner.query(`DROP TABLE "flash"`);
    }

}
