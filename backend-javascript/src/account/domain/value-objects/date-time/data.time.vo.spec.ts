import { DateTime } from './data.time.vo';

describe('DateTime Value Object', () => {

  // ----------------------------
  // 1. Criação válida
  // ----------------------------
  it('deve criar DateTime a partir de TIMESTAMP do Postgres', () => {
    const dt = new DateTime('2025-12-01 10:30:00');
    expect(dt.toTimestamp()).toBe('2025-12-01 10:30:00');
  });

  it('deve criar DateTime a partir de ISO string', () => {
    const dt = new DateTime('2025-12-01T10:30:00Z');
    expect(dt.toISO()).toBe('2025-12-01T10:30:00.000Z');
  });

  it('deve criar DateTime a partir de um objeto Date', () => {
    const date = new Date('2025-12-01T10:30:00Z');
    const dt = new DateTime(date);
    expect(dt.toISO()).toBe('2025-12-01T10:30:00.000Z');
  });

  // ----------------------------
  // 2. Criação inválida
  // ----------------------------
  it('deve lançar erro ao criar com string inválida', () => {
    expect(() => new DateTime('data-invalida')).toThrowError();
  });

  it('deve lançar erro ao criar com Date inválida', () => {
    expect(() => new DateTime(new Date('invalid'))).toThrowError();
  });

  // ----------------------------
  // 3. Imutabilidade
  // ----------------------------
  it('não deve permitir mutação da data interna', () => {
    const dt = new DateTime('2025-12-01 10:30:00');
    const date = dt.toDate();

    date.setUTCFullYear(1999); // mutação externa

    expect(dt.toTimestamp()).toBe('2025-12-01 10:30:00'); // valor interno intacto
  });

  // ----------------------------
  // 4. Comparação equals()
  // ----------------------------
  it('equals() deve retornar true para datas iguais', () => {
    const dt1 = new DateTime('2025-12-01 10:30:00');
    const dt2 = new DateTime('2025-12-01 10:30:00');

    expect(dt1.equals(dt2)).toBe(true);
  });

  it('equals() deve retornar false para datas diferentes', () => {
    const dt1 = new DateTime('2025-12-01 10:30:00');
    const dt2 = new DateTime('2025-12-01 10:31:00');

    expect(dt1.equals(dt2)).toBe(false);
  });

  // ----------------------------
  // 5. Métodos utilitários
  // ----------------------------
  it('isPast() deve retornar true para datas passadas', () => {
    const dt = new DateTime('2000-01-01 00:00:00');
    expect(dt.isPast()).toBe(true);
  });

  it('isFuture() deve retornar true para datas futuras', () => {
    const future = new Date(Date.now() + 10_000); // 10s no futuro
    const dt = new DateTime(future);
    expect(dt.isFuture()).toBe(true);
  });

  // ----------------------------
  // 6. Formatação
  // ----------------------------
  it('toTimestamp() deve retornar no padrão PostgreSQL TIMESTAMP', () => {
    const dt = new DateTime('2025-12-01T10:30:00Z');
    expect(dt.toTimestamp()).toBe('2025-12-01 10:30:00');
  });

  it('toISO() deve retornar formato ISO válido', () => {
    const dt = new DateTime('2025-12-01 10:30:00');
    expect(dt.toISO()).toBe('2025-12-01T10:30:00.000Z');
  });
});
