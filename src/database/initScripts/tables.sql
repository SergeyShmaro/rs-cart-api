create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	created_at date,
	updated_at date
	user_id uuid not null,
	foreign key (user_id) references users(id),
);

create table users (
	id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  email text not null default '',
  password text not null default ''
);

create extension if not exists "uuid-ossp";

create table cart_items (
	product_id uuid not null primary key,
	count integer not null default 0
);

alter table cart_items add column cart_id uuid references carts(id);
ALTER TABLE public.cart_items ADD CONSTRAINT unique_item UNIQUE (product_id,cart_id);

create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	cart_id uuid not null,
	payment json,
	delivery json,
	comments text,
	status text not null,
	total integer not null,
	foreign key (user_id) references users(id),
	foreign key (cart_id) references carts(id)
);