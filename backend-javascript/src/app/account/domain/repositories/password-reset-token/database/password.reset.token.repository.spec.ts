
import { DatabaseAdapter } from "@src/account/infra/adapters/database/database.adapter";
import { PasswordResetToken } from "@src/account/domain/entities/password-reset-token/password.reset.token.entity";
import { PasswordResetTokenRepository } from "./password.reset.token.repository";

describe("PasswordResetTokenRepository.getByHashToken - Integration Test", () => {
  let db: DatabaseAdapter;
  let repository: PasswordResetTokenRepository

  beforeAll(async () => {
    db = new DatabaseAdapter();
    repository = new PasswordResetTokenRepository(db);
    await db.query("DELETE FROM password_reset_token");
  });

  afterAll(async () => {
    await db.disconnect();
  });

  test("deve retornar um PasswordResetToken quando o hash existir", async () => {
    const hashToken = "hash_integra_abc123";
    const expiresAt = new Date(Date.now() + 3600000);
    const inserted = await db.query(
      `
      INSERT INTO password_reset_token (user_id, token_hash, expires_at, used)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [55, hashToken, expiresAt, false]
    );

    const result = await repository.getByHashToken(hashToken);

    expect(result).toBeInstanceOf(PasswordResetToken);
    expect(result?.getHashToken()).toBe(hashToken);
  });

  test("Deve retornar null quando o hash não existir", async () => {
    const result = await repository.getByHashToken("hash_inexistente_999");
    expect(result).toBeNull();
  });

  test("Deve lançar erro se o DB falhar", async () => {
    const brokenRepo = new PasswordResetTokenRepository({
      select: () => {
        throw new Error("DB ERROR SIMULADO");
      }
    } as any);

    await expect(brokenRepo.getByHashToken("qualquer")).rejects.toThrow();
  });
});
