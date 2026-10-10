import Joi from 'joi';

export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export interface EnvironmentVariables {
  NODE_ENV: Environment;
  PORT: number;
}

export const envValidationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().port().default(3000),
});
