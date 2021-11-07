import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1636275434630 implements MigrationInterface {
    name = 'migration1636275434630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `avatar` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sessions` (`id` varchar(44) NOT NULL, `user_id` int NULL, `content` text NOT NULL, `flash` text NOT NULL, `updated_at` int NOT NULL, `created_at` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `sessions`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
