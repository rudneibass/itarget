import { stat } from "fs";

export class NotificationEntity {
  private _uuid: string;
  private _message: string;
  private _status: string;

  constructor({uuid, message, status} : {uuid: string, message: string, status: string}) {
    this.setUuid(uuid);
    this.setMessage(message);
    this.setStatus(status);
  }

  get uuid(): string {
    return this._uuid;
  }

  get message(): string {
    return this._message;
  }

  get status(): string {
    return this._status;
  }

  private setUuid(uuid: string) {
    if (!uuid) {
      throw new Error('O campo uuid não pode ser vazio');
    }
    this._uuid = uuid;
  }

  setMessage(message: string) {
    if (!message) {
      throw new Error('O campo message não pode ser vazio');
    }
    this._message = message;
  }

  setStatus(status: string) {
    if (!status) {
      throw new Error('O campo status não pode ser vazio');
    }
    this._status = status;
  }
}

