import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711296619220 implements MigrationInterface {
    name = 'Migrations1711296619220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_163c11a6d003fcf65702084c246"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-03-24T16:10:20.376Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '"2024-03-24T16:10:20.404Z"'`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_163c11a6d003fcf65702084c246" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_163c11a6d003fcf65702084c246"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT '2024-03-23 10:01:09.147'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '2024-03-23 10:01:09.081'`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_163c11a6d003fcf65702084c246" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
