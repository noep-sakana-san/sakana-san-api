import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708610305498 implements MigrationInterface {
    name = 'Migrations1708610305498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "REL_8266a404ae14f74d2b75b9cf22"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "REL_8266a404ae14f74d2b75b9cf22" UNIQUE ("placeId")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
