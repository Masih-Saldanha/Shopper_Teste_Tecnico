export type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number
}

export type DriverFromDatabase = {
  id: number;
  nome: string;
  descricao: string;
  carro: string;
  pontuacao: number;
  avaliacao: string;
  taxa: number;
  kmMinimo: number;
}
