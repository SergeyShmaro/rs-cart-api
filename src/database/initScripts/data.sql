insert into users (name, id) values (SergeyShmaro, default);

insert into carts (created_at, updated_at, user_id) values (DATE '2022-10-30', DATE '2022-10-30', 'f5ebe938-8ab4-4b13-a5a6-4e9098057287');

insert into cart_items (cart_id, product_id, count) values ('acc0b14b-2bdf-479c-874c-65727c24bf6f', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 1);
insert into cart_items (cart_id, product_id, count) values ('acc0b14b-2bdf-479c-874c-65727c24bf6f', '7567ec4b-b10c-48c5-9345-fc73c48a80a1', 2);
insert into cart_items (cart_id, product_id, count) values ('acc0b14b-2bdf-479c-874c-65727c24bf6f', 'be7a0e86-ff64-42c0-b79c-db2db9610996', 3);