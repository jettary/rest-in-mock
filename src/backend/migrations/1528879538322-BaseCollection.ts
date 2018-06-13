import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseCollection1528879538322 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      CREATE TABLE public.collection (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        model JSONB NOT NULL DEFAULT '{}'::JSONB,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      ) WITH (
        OIDS = FALSE
      );
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`DROP TABLE IF EXISTS public.collection;`);

  }

}
