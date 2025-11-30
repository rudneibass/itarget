import * as nodemailer from 'nodemailer';
import { MailerAdapter } from './mailer.adapter';

// Mock do nodemailer e do transporter
jest.mock('nodemailer');

describe('MailerAdapter', () => {
  let mailerAdapter: MailerAdapter;
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    // Cria mock do sendMail
    sendMailMock = jest.fn().mockResolvedValue(true);

    // Configura o mock do createTransport
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    } as any);

    // Instancia o adapter
    mailerAdapter = new MailerAdapter();
  });

  it('deve criar o transporter corretamente', () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  });

  it('deve enviar um email com os parâmetros corretos', async () => {
    const emailData = {
      to: 'nascimento.email@gmail.com',
      subject: 'Assunto de Teste',
      html: '<p>Olá!</p>',
    };

    await mailerAdapter.send(emailData);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.GMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });
  });
});
