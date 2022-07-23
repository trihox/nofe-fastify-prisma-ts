-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "dob" TEXT,
    "description" TEXT,
    "image" TEXT,
    "type" TEXT,
    "order" INTEGER NOT NULL DEFAULT 999999,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "domain" UUID,
    "creator" UUID,
    "updater" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "domain" TEXT,
    "type" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "image" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 999999,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "creator" UUID,
    "updater" UUID,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "domain_domain_key" ON "domain"("domain");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_creator_fkey" FOREIGN KEY ("creator") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_updater_fkey" FOREIGN KEY ("updater") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_domain_fkey" FOREIGN KEY ("domain") REFERENCES "domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain" ADD CONSTRAINT "domain_creator_fkey" FOREIGN KEY ("creator") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain" ADD CONSTRAINT "domain_updater_fkey" FOREIGN KEY ("updater") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
