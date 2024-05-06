import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714115135946 implements MigrationInterface {
    name = 'Migrations1714115135946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "zipCode" character varying NOT NULL DEFAULT '', "country" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "localPath" character varying NOT NULL DEFAULT '', "filename" character varying NOT NULL DEFAULT '', "type" character varying NOT NULL, "size" integer NOT NULL, "projectId" uuid, "healedsId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."project_type_enum" AS ENUM('TATTOO', 'FLASH', 'PRINT', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."project_type_enum" NOT NULL DEFAULT 'TATTOO', "date" TIMESTAMP NOT NULL DEFAULT '"2024-04-26T07:05:37.590Z"', "isVisible" boolean NOT NULL DEFAULT true, "isFavorite" boolean NOT NULL DEFAULT true, "title" character varying, "description" character varying, "coverImageId" character varying, "coverHealedId" character varying, "placeId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', "addressId" uuid, CONSTRAINT "REL_b827ce7039f2c65e99a276b09e" UNIQUE ("addressId"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "startDate" TIMESTAMP NOT NULL DEFAULT '"2024-04-26T07:05:37.591Z"', "endDate" TIMESTAMP, "isVisible" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "placeId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "paragraph1" character varying, "paragraph2" character varying, "password" character varying NOT NULL, "email" character varying, "phone" character varying, "instagram" character varying, "facebook" character varying, "placeId" uuid, CONSTRAINT "REL_62a2b002bd81c8912b20be6dca" UNIQUE ("placeId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_8fab58758ca6a3ba2c22d3722c1" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_6f4235d4dc481366dc1db340ab2" FOREIGN KEY ("healedsId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_163c11a6d003fcf65702084c246" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_62a2b002bd81c8912b20be6dcaf" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_62a2b002bd81c8912b20be6dcaf"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_163c11a6d003fcf65702084c246"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_6f4235d4dc481366dc1db340ab2"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_8fab58758ca6a3ba2c22d3722c1"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TYPE "public"."project_type_enum"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
