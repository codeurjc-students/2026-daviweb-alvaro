import { Environment, envValidationSchema } from './env.validation.js';

const MONGODB_URI = 'mongodb://localhost:27017/daviweb';

describe('envValidationSchema', () => {
  it('applies defaults when optional variables are missing', () => {
    const { error, value } = envValidationSchema.validate({ MONGODB_URI });

    expect(error).toBeUndefined();
    expect(value).toEqual({
      NODE_ENV: Environment.Development,
      PORT: 3000,
      MONGODB_URI,
    });
  });

  it('converts PORT to a number', () => {
    const { value } = envValidationSchema.validate({
      MONGODB_URI,
      PORT: '8080',
    });

    expect(value?.PORT).toBe(8080);
  });

  it('rejects a PORT outside the valid range', () => {
    const { error } = envValidationSchema.validate({
      MONGODB_URI,
      PORT: '70000',
    });

    expect(error?.message).toContain('"PORT"');
  });

  it('rejects an unknown NODE_ENV', () => {
    const { error } = envValidationSchema.validate({
      MONGODB_URI,
      NODE_ENV: 'staging',
    });

    expect(error?.message).toContain('"NODE_ENV"');
  });

  it('requires MONGODB_URI', () => {
    const { error } = envValidationSchema.validate({});

    expect(error?.message).toContain('"MONGODB_URI" is required');
  });

  it('rejects a MONGODB_URI that is not a MongoDB connection string', () => {
    const { error } = envValidationSchema.validate({
      MONGODB_URI: 'http://localhost',
    });

    expect(error?.message).toContain('"MONGODB_URI"');
  });
});
