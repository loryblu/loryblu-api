-- CreateTable
CREATE TABLE "parent_account" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "policies_accepted_at" TIMESTAMP(3) NOT NULL,
    "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parent_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children_account" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "accepted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_id" TEXT NOT NULL,

    CONSTRAINT "children_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "children_account" ADD CONSTRAINT "children_account_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parent_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
