-- CreateEnum
CREATE TYPE "public"."Categoria" AS ENUM ('DEPORTE', 'FICCION', 'HISTORIA', 'INFANTIL');

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" "public"."Categoria" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
