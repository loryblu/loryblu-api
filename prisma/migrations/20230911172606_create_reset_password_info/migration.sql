-- CreateTable
CREATE TABLE "reset_password_info" (
    "id" SERIAL NOT NULL,
    "recovery_token" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "credential_id" INTEGER NOT NULL,

    CONSTRAINT "reset_password_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_info_recovery_token_key" ON "reset_password_info"("recovery_token");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_info_credential_id_key" ON "reset_password_info"("credential_id");

-- AddForeignKey
ALTER TABLE "reset_password_info" ADD CONSTRAINT "reset_password_info_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
