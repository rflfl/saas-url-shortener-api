-- CreateTable
CREATE TABLE `shortened_links` (
    `id` VARCHAR(191) NOT NULL,
    `original_url` VARCHAR(191) NOT NULL,
    `shortened_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `shortened_links_shortened_code_key`(`shortened_code`),
    INDEX `shortened_links_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shortened_links` ADD CONSTRAINT `shortened_links_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
