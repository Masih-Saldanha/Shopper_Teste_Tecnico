-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "carro" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "taxa" DOUBLE PRECISION NOT NULL,
    "kmMinimo" INTEGER NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_nome_key" ON "drivers"("nome");
