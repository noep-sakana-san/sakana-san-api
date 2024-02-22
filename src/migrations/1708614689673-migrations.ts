import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708614689673 implements MigrationInterface {
    name = 'Migrations1708614689673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tattoo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL DEFAULT '"2024-02-22T15:11:31.988Z"', "isVisible" boolean NOT NULL DEFAULT true, "title" character varying, "description" character varying, "placeId" uuid, CONSTRAINT "PK_b430bbbf0a0a294fe6061ea0a4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD "tattooId" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" SET DEFAULT '"2024-02-22T15:11:31.962Z"'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_a498c1a9a346109f870a5206ad3" FOREIGN KEY ("tattooId") REFERENCES "tattoo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tattoo" ADD CONSTRAINT "FK_0bfe9f0aa67ea774f4c8012d646" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tattoo" DROP CONSTRAINT "FK_0bfe9f0aa67ea774f4c8012d646"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_a498c1a9a346109f870a5206ad3"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "endDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "startDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "tattooId"`);
        await queryRunner.query(`DROP TABLE "tattoo"`);
    }

}
