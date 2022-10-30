// import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import getDBClient from 'src/database/utils/getDBClient';
import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  async findByUserId(userId: string): Promise<Cart> {
    const dbClient = await getDBClient();
    const cart = await dbClient.query(
      'SELECT c.id, ci.product_id, ci.count FROM carts as c inner join cart_items as ci on c.id = ci.cart_id where user_id = $1;',
      [userId]
    );
    dbClient.end();

    // const productsDataResponse = await fetch('https://6b1jcnr1b2.execute-api.eu-west-1.amazonaws.com/products');
    // const productsData = await productsDataResponse.json();
    const cartIdsWithGroupedItems = cart.rows.reduce<{ [cartId: string]: CartItem[] }>((acc, row) => {
      if (!acc[row.id]) acc[row.id] = [];
      acc[row.id].push({ product: row.product_id /* productsData.find((product) => product.id === row.product_id) */, count: row.count, });
      return acc;
    }, {});

    const carts = Object.entries(cartIdsWithGroupedItems).map(([cartId, cartItems]) => ({ id: cartId, items: cartItems }));

    return carts[0];
  }

  async createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    const date = new Date().toJSON().split('T')[0];

    const dbClient = await getDBClient();
    await dbClient.query(
      `insert into carts (created_at, updated_at, user_id) values ($1, $2, $3);`,
      [date, date, userId]
    );
    dbClient.end();

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { product, count }: { product: string; count: number }): Promise<void> {
    const { id } = await this.findOrCreateByUserId(userId);
    const query = `INSERT INTO cart_items (product_id, cart_id, count) VALUES ('${product}', '${id}', ${count})
      ON CONFLICT ON CONSTRAINT unique_item DO UPDATE
      SET count = EXCLUDED.count;`;

    const dbClient = await getDBClient();
    await dbClient.query(query);
    dbClient.end();
  }

  async removeByUserId(userId): Promise<void> {
    const dbClient = await getDBClient();
    await dbClient.query(
      `DELETE FROM carts WHERE user_id = $1;`,
      [userId]
    );
    dbClient.end();
  }
}
