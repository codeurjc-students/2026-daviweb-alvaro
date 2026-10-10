import { Environment, envValidationSchema } from './env.validation.js';

describe('envValidationSchema', () => {
  it('applies defaults when variables are missing', () => {
    const { error, value } = envValidationSchema.validate({});

    expect(error).toBeUndefined();
    expect(value).toEqual({ NODE_ENV: Environment.Development, PORT: 3000 });
  });

  it('converts PORT to a number', () => {
    const { value } = envValidationSchema.validate({ PORT: '8080' });

    expect(value?.PORT).toBe(8080);
  });

  it('rejects a PORT outside the valid range', () => {
    const { error } = envValidationSchema.validate({ PORT: '70000' });

    expect(error?.message).toContain('"PORT"');
  });

  it('rejects an unknown NODE_ENV', () => {
    const { error } = envValidationSchema.validate({ NODE_ENV: 'staging' });

    expect(error?.message).toContain('"NODE_ENV"');
  });
});
