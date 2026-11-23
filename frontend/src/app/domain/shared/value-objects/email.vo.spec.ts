import { Email } from './email.vo';

describe('Email', () => {
  it('normalizes the address to trimmed lower case', () => {
    expect(new Email('  Ana@Example.COM ').getValue()).toBe('ana@example.com');
  });

  it('exposes the local part and the domain', () => {
    const email = new Email('ana@example.com');
    expect(email.getLocalPart()).toBe('ana');
    expect(email.getDomain()).toBe('example.com');
  });

  it('rejects empty and malformed addresses', () => {
    expect(() => new Email('   ')).toThrow();
    expect(() => new Email('not-an-email')).toThrow();
  });

  it('compares by value', () => {
    expect(new Email('a@b.com').equals(new Email('A@B.com'))).toBeTrue();
  });
});
