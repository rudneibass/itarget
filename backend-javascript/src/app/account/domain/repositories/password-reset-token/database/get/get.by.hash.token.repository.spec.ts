import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
import { GetByHashTokenRepository } from "./get.by.hash.token.repository";
import { PasswordResetToken } from "@src/account/domain/entities/password-reset-token/password.reset.token.entity";
import { DomainException } from "@src/account/infra/exceptions/domain.exception";

describe("GetByHashTokenRepository - Integration Test", () => {
  let db: DatabaseAdapter;
  let repository: GetByHashTokenRepository;

  beforeAll(async () => {
    db = new DatabaseAdapter();
    repository = new GetByHashTokenRepository(db);
    await db.query("DELETE FROM password_reset_token");
    await db.query('DELETE FROM "user"');
  });

  afterAll(async () => {
    await db.disconnect();
  });

  test("deve retornar um PasswordResetToken quando o hash existir", async () => {
    const tokenHash = "hash_integra_valido_123";
    const userId = await db.insert(
      `INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      {name: 'nome', email: 'fake.email@gmail.com ', password_hash: 'password-hash-fake'}
    );
  
    await db.insert(
      `INSERT INTO "password_reset_token" (user_id, token_hash, expires_at, used) VALUES ($1, $2, $3, $4) RETURNING id`,
      { userId: userId , tokenHash: tokenHash, expiresAt: new Date(Date.now() + 3600000), used: false}
    );

    const result = await repository.handle(tokenHash);
    expect(result).toBeInstanceOf(PasswordResetToken);
    expect(result?.getHashToken()).toBe(tokenHash);
  });

  test("deve retornar null quando o hash não existir", async () => {
    const result = await repository.handle("hash_que_nao_existe_999");
    expect(result).toBeNull();
  });

  test("deve lançar DomainException quando ocorrer erro no banco", async () => {
    const brokenRepo = new GetByHashTokenRepository({
      select: () => { throw new Error("DB ERROR SIMULADO")}
    } as any);

    await expect(brokenRepo.handle("qualquer")).rejects.toThrow(DomainException);
  });

});
