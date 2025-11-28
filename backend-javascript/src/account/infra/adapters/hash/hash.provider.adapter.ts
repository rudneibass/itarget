import { Injectable } from '@nestjs/common';
import { HashAdapterInterface } from '@src/account/domain/interfaces/hash.adapter.interface';
import bcrypt from 'bcryptjs';

@Injectable()
export class HashProviderAdapter implements HashAdapterInterface {
  private readonly saltRounds = 10;

  async hash(unhashed: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(unhashed, this.saltRounds, (err, hashed) => {
        if (err) { 
          return reject(err);
        }

        if (!hashed) { 
          return reject(new Error('Hashing failed'));
        }

        resolve(hashed);
      });
    });
  }

  async compare(unhashed: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(unhashed, hashed, (err, same) => {
        if (err) { 
          return reject(err);
        }

        if (typeof same !== 'boolean') { 
          return reject(new Error('Compare failed'));
        }

        resolve(same);
      });
    });
  }
}