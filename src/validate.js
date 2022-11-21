import Ajv from "ajv";
// Set up schema.
const ajv = new Ajv();
const schema = {
  properties: {
    epoch: {
      description:
        "The current server time, in epoch seconds, at time of processing the request.",
      type: "number",
    },
  },
  required: ["epoch"],
  type: "object",
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
