export type TValidateItem = {
  validate: TValidate;
  message: string;
};
export type TValidate = (value: never) => boolean;
export type TValidator = (value: never) => string;
export type TGetValidator = (validateItem: TValidateItem) => TValidator;
