import {MigrationInterface, QueryRunner} from "typeorm";

export class comments1621482323408 implements MigrationInterface {
    name = 'comments1621482323408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "comment"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "like"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "like"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "post"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "post"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "post"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "post"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "like"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "like"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "comment"."createdAt" IS NULL`);
    }

}
