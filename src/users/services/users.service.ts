import { Injectable } from '@nestjs/common';
import getDBClient from 'src/database/utils/getDBClient';

import { v4 } from 'uuid';

import { User } from '../models';

@Injectable()
export class UsersService {
  async findOne(userId: string): Promise<User> {
    const dbClient = await getDBClient();
    const users = await dbClient.query(
      'SELECT * FROM users where user_id = $1;',
      [userId]
    );
    dbClient.end();
    const user = users?.rows?.[0];
    return user;
  }

  async createOne({ name, password }: User): Promise<User> {
    const id = v4(v4());
    const newUser = { id: name || id, name, password };

    const dbClient = await getDBClient();
    await dbClient.query(
      'insert into users (id, name, password) values ($1, $2, $3);',
      [id, name, password]
    );
    dbClient.end();

    return newUser;
  }

}
