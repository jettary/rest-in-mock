import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendModel1529314820107 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`
      ALTER TABLE public.collection 
        ADD title TEXT NULL,
        ADD description TEXT DEFAULT '' NOT NULL;
    `);
    await queryRunner.query(`UPDATE public.collection SET title = name;`);
    await queryRunner.query(`ALTER TABLE public.collection ALTER COLUMN title SET NOT NULL;`);

  }

  public async down(queryRunner: QueryRunner): Promise<any> {

    await queryRunner.query(`ALTER TABLE public.collection DROP COLUMN IF EXISTS title;`);
    await queryRunner.query(`ALTER TABLE public.collection DROP COLUMN IF EXISTS description;`);

  }

}
