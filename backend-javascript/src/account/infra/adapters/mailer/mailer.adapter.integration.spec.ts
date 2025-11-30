import { MailerAdapter } from './mailer.adapter';

describe('MailerAdapter - Integração REAL', () => {
  let adapter: MailerAdapter;

  beforeAll(() => {
    adapter = new MailerAdapter();

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('GMAIL_USER e GMAIL_APP_PASSWORD precisam estar definidos para o teste de integração.');
    }
  });

  it('deve enviar um email real usando Gmail', async () => {
    const to = process.env.MAIL_TEST_TO;

    if (!to) {
      throw new Error('MAIL_TEST_TO precisa estar definido nas variáveis de ambiente');
    }

    const subject = 'Teste de Integração - NodemailerAdapter';
    const html = `<h1>Teste de Integração</h1><p>Email enviado às ${new Date().toISOString()}</p>`;

    const start = Date.now();

    await expect(
      adapter.send({
        to,
        subject,
        html,
      })
    ).resolves.not.toThrow();

    const duration = Date.now() - start;
    console.log(`E-mail enviado com sucesso em ${duration}ms`);
  }, 20000); // aumenta timeout para 20s (Gmail pode demorar)
});
