/*
  Warnings:

  - A unique constraint covering the columns `[titulo,autor,categoria]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Book_categoria_idx" ON "public"."Book"("categoria");

-- CreateIndex
CREATE UNIQUE INDEX "Book_titulo_autor_categoria_key" ON "public"."Book"("titulo", "autor", "categoria");
