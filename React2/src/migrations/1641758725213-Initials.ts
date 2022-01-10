import {MigrationInterface, QueryRunner} from "typeorm";

export class Initials1641758725213 implements MigrationInterface {
    name = 'Initials1641758725213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_f3b521fe4729cfad477690ca29d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "sport_pitch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pricePerHour" integer NOT NULL, "StartTime" character varying NOT NULL, "EndTime" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9cb463aeabf3ea14641893ebffb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "text" character varying NOT NULL, "points" integer NOT NULL DEFAULT 0, "creatorId" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_has_booking" ("bookingid" integer NOT NULL, "userid" integer NOT NULL, CONSTRAINT "REL_dd7f0bc2222894cdd9209b8354" UNIQUE ("bookingid"), CONSTRAINT "PK_a5a5c7c401a0b681422c1797721" PRIMARY KEY ("bookingid", "userid"))`, undefined);
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "RequestedOn" character varying NOT NULL, "StartTime" character varying NOT NULL, "EndTime" character varying NOT NULL, "sportpitchid" integer, "statusid" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_has_booking" ADD CONSTRAINT "FK_dd7f0bc2222894cdd9209b83544" FOREIGN KEY ("bookingid") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_has_booking" ADD CONSTRAINT "FK_8aff20a9d32ac00527bb26d5c07" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_580dcc532bb18256cd27ae71ad1" FOREIGN KEY ("sportpitchid") REFERENCES "sport_pitch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_231d39513c49eb1aafcbc8ab1c5" FOREIGN KEY ("statusid") REFERENCES "booking_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_231d39513c49eb1aafcbc8ab1c5"`, undefined);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_580dcc532bb18256cd27ae71ad1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_has_booking" DROP CONSTRAINT "FK_8aff20a9d32ac00527bb26d5c07"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_has_booking" DROP CONSTRAINT "FK_dd7f0bc2222894cdd9209b83544"`, undefined);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`, undefined);
        await queryRunner.query(`DROP TABLE "booking"`, undefined);
        await queryRunner.query(`DROP TABLE "user_has_booking"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "post"`, undefined);
        await queryRunner.query(`DROP TABLE "sport_pitch"`, undefined);
        await queryRunner.query(`DROP TABLE "booking_status"`, undefined);
    }

}
