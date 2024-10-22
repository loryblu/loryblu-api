-- CreateTable
CREATE TABLE "access_tokens" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "credential_id" TEXT NOT NULL,

    CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_accessToken_key" ON "access_tokens"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "access_tokens_credential_id_key" ON "access_tokens"("credential_id");

-- AddForeignKey
ALTER TABLE "access_tokens" ADD CONSTRAINT "access_tokens_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
