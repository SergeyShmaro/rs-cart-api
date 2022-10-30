create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	created_at date,
	updated_at date
);

create extension if not exists "uuid-ossp";

create table cart_items (
	product_id uuid not null primary key,
	count integer not null default 0
);

alter table cart_items add column cart_id uuid references carts(id);