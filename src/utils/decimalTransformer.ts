import { ValueTransformer } from "typeorm";

export const decimalTransformer: ValueTransformer = {
  from: (value) => {
    return typeof parseFloat(value);
  },
  to: (value) => (value ? value.toString() : null),
};
