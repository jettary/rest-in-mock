import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseCollection1528879538322 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      CREATE TABLE public.collection (
        id SERIAL PRIMARY KEY,
        model JSONB NOT NULL DEFAULT '{}'::JSONB,
        "createdAt" TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      ) WITH (
        OIDS = FALSE
      );
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`DROP TABLE IF EXIST public.collection;`);

  }

}