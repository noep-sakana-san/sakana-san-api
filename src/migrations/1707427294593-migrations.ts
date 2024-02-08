import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707427294593 implements MigrationInterface {
    name = 'Migrations1707427294593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "placeId" uuid, CONSTRAINT "REL_8266a404ae14f74d2b75b9cf22" UNIQUE ("placeId"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
