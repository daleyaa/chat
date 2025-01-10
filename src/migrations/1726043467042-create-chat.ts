import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChat1726043467042 implements MigrationInterface {
  name = 'CreateChat1726043467042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."chat_type_enum" AS ENUM('group', 'pv', 'bot')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat" ("id" SERIAL NOT NULL, "username" character varying, "type" "public"."chat_type_enum" NOT NULL DEFAULT 'pv', "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "createById" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_subscriptions_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e6d146373bab5522b63d36f0364" PRIMARY KEY ("chatId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4272123e3152422203c0128458" ON "chat_subscriptions_user" ("chatId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_357ffd5c49e464833da911a963" ON "chat_subscriptions_user" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "message" ADD "chatId" integer`);
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_56fdecc75c3bf3098640730f28d" FOREIGN KEY ("createById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_subscriptions_user" ADD CONSTRAINT "FK_4272123e3152422203c0128458a" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_subscriptions_user" ADD CONSTRAINT "FK_357ffd5c49e464833da911a963a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_subscriptions_user" DROP CONSTRAINT "FK_357ffd5c49e464833da911a963a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_subscriptions_user" DROP CONSTRAINT "FK_4272123e3152422203c0128458a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_56fdecc75c3bf3098640730f28d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`,
    );
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chatId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_357ffd5c49e464833da911a963"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4272123e3152422203c0128458"`,
    );
    await queryRunner.query(`DROP TABLE "chat_subscriptions_user"`);
    await queryRunner.query(`DROP TABLE "chat"`);
    await queryRunner.query(`DROP TYPE "public"."chat_type_enum"`);
  }
}
