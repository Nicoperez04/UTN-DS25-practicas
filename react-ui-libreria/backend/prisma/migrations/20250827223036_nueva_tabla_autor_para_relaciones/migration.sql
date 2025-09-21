-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "authorId" INTEGER,
ALTER COLUMN "descripcion" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Author" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_nombre_key" ON "public"."Author"("nombre");

-- CreateIndex
CREATE INDEX "Book_authorId_idx" ON "public"."Book"("authorId");

-- AddForeignKey
ALTER TABLE "public"."Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
