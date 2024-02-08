import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1707426664363 implements MigrationInterface {
  name = 'Migrations1707426664363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "placeId" uuid, CONSTRAINT "REL_359b48411878a60ae7df2d5f25" UNIQUE ("placeId"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_359b48411878a60ae7df2d5f25e" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_359b48411878a60ae7df2d5f25e"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
