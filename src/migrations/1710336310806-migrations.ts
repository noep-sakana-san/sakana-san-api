import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710336310806 implements MigrationInterface {
    name = 'Migrations1710336310806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "zipCode" character varying NOT NULL DEFAULT '', "country" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "startDate" TIMESTAMP NOT NULL DEFAULT '"2024-03-13T13:25:12.935Z"', "endDate" TIMESTAMP, "isVisible" boolean NOT NULL DEFAULT true, "placeId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', "addressId" uuid, CONSTRAINT "REL_b827ce7039f2c65e99a276b09e" UNIQUE ("addressId"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tattoo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL DEFAULT '"2024-03-13T13:25:12.935Z"', "isVisible" boolean NOT NULL DEFAULT true, "isFavorite" boolean NOT NULL DEFAULT true, "title" character varying, "description" character varying, "placeId" uuid, CONSTRAINT "PK_b430bbbf0a0a294fe6061ea0a4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "localPath" character varying NOT NULL DEFAULT '', "filename" character varying NOT NULL DEFAULT '', "type" character varying NOT NULL, "size" integer NOT NULL, "tattooId" uuid, "tattooAfterId" uuid, "flashId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flash" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isVisible" boolean NOT NULL DEFAULT true, "isAvailable" boolean NOT NULL DEFAULT true, "isFavorite" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0c01a2c1c5f2266942dd1b3fdbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying, "phone" character varying, "instagram" character varying, "facebook" character varying, "placeId" uuid, CONSTRAINT "REL_62a2b002bd81c8912b20be6dca" UNIQUE ("placeId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place" ADD CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tattoo" ADD CONSTRAINT "FK_0bfe9f0aa67ea774f4c8012d646" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_a498c1a9a346109f870a5206ad3" FOREIGN KEY ("tattooId") REFERENCES "tattoo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_602ffbd6c682269e1bd46ca26b5" FOREIGN KEY ("tattooAfterId") REFERENCES "tattoo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_ee5877e9d448e8894dd4fb29cd6" FOREIGN KEY ("flashId") REFERENCES "flash"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_62a2b002bd81c8912b20be6dcaf" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_62a2b002bd81c8912b20be6dcaf"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_ee5877e9d448e8894dd4fb29cd6"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_602ffbd6c682269e1bd46ca26b5"`);
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_a498c1a9a346109f870a5206ad3"`);
        await queryRunner.query(`ALTER TABLE "tattoo" DROP CONSTRAINT "FK_0bfe9f0aa67ea774f4c8012d646"`);
        await queryRunner.query(`ALTER TABLE "place" DROP CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_8266a404ae14f74d2b75b9cf229"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "flash"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "tattoo"`);
        await queryRunner.query(`DROP TABLE "place"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
