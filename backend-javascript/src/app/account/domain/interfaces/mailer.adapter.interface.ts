export interface MailerAdapterInterface {
  send(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void>;
}
