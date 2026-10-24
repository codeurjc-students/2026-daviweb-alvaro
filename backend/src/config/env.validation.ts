import Joi from 'joi';

export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export interface EnvironmentVariables {
  NODE_ENV: Environment;
  PORT: number;
  MONGODB_URI: string;
}

export const envValidationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().port().default(3000),
  MONGODB_URI: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required(),
});
