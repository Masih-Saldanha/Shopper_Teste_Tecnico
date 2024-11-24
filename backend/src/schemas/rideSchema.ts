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

const rideSchema = {
  sendEstimateRideData,
};

export default rideSchema;