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
  }),
  origin: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de origem não pode estar vazio.",
    "any.required": "O endereço de origem é obrigatório.",
  }),
  destination: Joi.string().min(1).required().messages({
    "string.empty": "O endereço de destino não pode estar vazio.",
    "any.required": "O endereço de destino é obrigatório.",
  }),
}).custom((value, helpers) => {
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