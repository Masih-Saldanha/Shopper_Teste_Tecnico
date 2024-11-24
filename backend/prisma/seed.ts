import prisma from "./../src/config/database.js";

async function main() {
  console.log("Running Seed...");

  const motoristas = [
    {
      nome: "Homer Simpson", 
      descricao: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      carro: "Plymouth Valiant 1973 rosa e enferrujado",
      pontuacao: 2,
      avaliacao: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      taxa: 2.5,
      kmMinimo: 1
    },
    {
      nome: "Dominic Toretto", 
      descricao: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      carro: "Dodge Charger R/T 1970 modificado",
      pontuacao: 4,
      avaliacao: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      taxa: 5.0,
      kmMinimo: 5
    },
    {
      nome: "James Bond", 
      descricao: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      carro: "Aston Martin DB5 clássico",
      pontuacao: 5,
      avaliacao: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      taxa: 10.0,
      kmMinimo: 10
    },
  ]

  await prisma.drivers.createMany({
    data: motoristas,
    skipDuplicates: true
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})