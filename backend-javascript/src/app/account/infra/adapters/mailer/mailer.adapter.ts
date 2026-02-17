
import { Injectable } from '@nestjs/common';
import { MailerAdapterInterface } from '@src/account/domain/interfaces/mailer.adapter.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerAdapter implements MailerAdapterInterface {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async send(options: { to: string; subject: string; html: string }): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}