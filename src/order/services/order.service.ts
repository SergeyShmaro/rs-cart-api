/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import getDBClient from 'src/database/utils/getDBClient';
import { v4 } from 'uuid';

import { Order } from '../models';

@Injectable()
export class OrderService {
  async findById(orderId: string): Promise<Order> {
    const dbClient = await getDBClient();
    const ordersResult = await dbClient.query(
      'SELECT * FROM orders where id = $1;',
      [orderId]
    );
    dbClient.end();

    return ordersResult?.rows?.[0];
  }

  async create(data: any, poolClient?: PoolClient) {
    const id = v4(v4())
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };
    const dbClient = poolClient ?? await getDBClient();
    await dbClient.query(
      `insert into orders (id, user_id, cart_id, payment, delivery, comments, status, total) values ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [id, data.userId, data.cartId, data.payment, data.delivery, data.comments, 'inProgress', data.total]
    );

    // @ts-expect-error end foesn't exist in pg.PoolClient but exist in pg.Client
    if (!poolClient) dbClient.end();

    return order;
  }

  async update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const dbClient = await getDBClient();
    await dbClient.query(
      `update orders set user_id = $1, cart_id = $2, payment = $3, delivery = $4, comments = $5, status = $6, total = $7 where id = $8;`,
      [data.userId, data.cartId, data.payment, data.delivery, data.comments, data.status, data.total, orderId]
    );
    dbClient.end();
  }
}
