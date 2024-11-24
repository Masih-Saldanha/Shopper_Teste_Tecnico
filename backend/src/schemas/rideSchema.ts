import Joi from "joi";

export type SendEstimateRide = {
  customer_id: string;
  origin: string;
  destination: string;
};

const sendEstimateRideData = Joi.object<SendEstimateRide>({
  customer_id: Joi.string().min(1).required().messages({
    "string.empty": "O ID do cliente não pode estar vazio.",
    "any.required": "O ID do cliente é obrigatório.",
    "string.base": "O ID do cliente deve ser uma string válida.",
  }),
  origin: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de origem não pode estar vazio.",
    "any.required": "O endereço de origem é obrigatório.",
    "string.base": "O endereço de origem deve ser uma string válida.",
  }),
  destination: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de destino não pode estar vazio.",
    "any.required": "O endereço de destino é obrigatório.",
    "string.base": "O endereço de destino deve ser uma string válida.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "A propriedade {#label} não é permitida.",
  })
  .custom((value, helpers) => {
    if (value.origin === value.destination) {
      return helpers.error("any.custom", {
        message: "Os endereços de origem e destino não podem ser iguais.",
      });
    }
    return value;
  });

export type SendRideConfirm = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

const sendRideConfirmData = Joi.object<SendRideConfirm>({
  customer_id: Joi.string().min(1).required().messages({
    "string.empty": "O ID do cliente não pode estar vazio.",
    "any.required": "O ID do cliente é obrigatório.",
    "string.base": "O ID do cliente deve ser uma string válida.",
  }),
  origin: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de origem não pode estar vazio.",
    "any.required": "O endereço de origem é obrigatório.",
    "string.base": "O endereço de origem deve ser uma string válida.",
  }),
  destination: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de destino não pode estar vazio.",
    "any.required": "O endereço de destino é obrigatório.",
    "string.base": "O endereço de destino deve ser uma string válida.",
  }),
  distance: Joi.number().greater(0).required().messages({
    "number.greater": "A distância deve ser maior que zero.",
    "any.required": "A distância é obrigatória.",
  }),
  duration: Joi.string().min(1).required().messages({
    "string.empty": "A duração não pode estar vazia.",
    "any.required": "A duração é obrigatória.",
  }),
  driver: Joi.object({
    id: Joi.number().integer().greater(0).required().messages({
      "number.base": "O ID do motorista deve ser um número.",
      "number.greater": "O ID do motorista deve ser maior que zero.",
      "any.required": "O ID do motorista é obrigatório.",
    }),
    name: Joi.string().min(1).required().messages({
      "string.empty": "O nome do motorista não pode estar vazio.",
      "any.required": "O nome do motorista é obrigatório.",
    }),
  }).required().messages({
    "any.required": "As informações do motorista são obrigatórias.",
  }),
  value: Joi.number().greater(0).required().messages({
    "number.greater": "O valor deve ser maior que zero.",
    "any.required": "O valor é obrigatório.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "A propriedade {#label} não é permitida.",
  })
  .custom((value, helpers) => {
    if (value.origin === value.destination) {
      return helpers.error("any.custom", {
        message: "Os endereços de origem e destino não podem ser iguais.",
      });
    }
    return value;
  });

const rideSchema = {
  sendEstimateRideData,
  sendRideConfirmData,
};

export default rideSchema;