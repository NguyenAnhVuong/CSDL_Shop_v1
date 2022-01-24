create schema `CSDL_Shop`;
 use CSDL_Shop;
-- drop database CSDL_Shop;

-- drop table if EXISTS users;

create table users(
	user_id int auto_increment ,
	user_name varchar(200) character set utf8mb4 default 'unknown' not null,
	email varchar(40) default 'unknown'not null unique,
    password varchar(200) not null,
	address varchar(1000) character set utf8mb4 default '',
    phone_number char(20) NOT NULL default '',
    gender char(10) character set utf8mb4 default 'unknown',
    birthday date,
	user_avatar varchar(200),
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	primary key(user_id)	
);

-- INSERT INTO users (user_id, full_name, user_name, email, password, address, gender)
-- VALUES (1, "Nguyễn", "Vương", "vuong2001", "navuong2001@gmail.com", "123456", "Hà Nội");

-- drop table if EXISTS product;
create table products(
	product_id int auto_increment primary key,
	product_name varchar(40) character set utf8mb4 default 'unknown',
	product_type varchar(100) character set utf8mb4,
	product_avatar varchar(500) character set utf8mb4,
	new_product int default 1,
    price int default 0,
	discount int default 0,
    bought_count int default 0
);

create table product_sizes(
	size_id int auto_increment primary key,
	product_id int,
    size int not null,
    quantity int not null,
    foreign key (product_id) references products(product_id)
);

create table images(
	image_id int auto_increment ,
    product_id int not null,
    image_name varchar(50),
    foreign key (product_id) references products(product_id),
    primary key(image_id)
);

-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "tee", "item1.jpg", "S", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "hoodie", "item2.jpg", "S", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "jacket", "item3.jpg", "S", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "accessory", "item4.jpg", "S", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "pant", "item5.jpg", "S", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "sweater", "item6.jpg", "M", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "sweater", "item7.jpg", "M", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "accessory", "item8.jpg", "M", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, new_product, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "hoodie", "item9.jpg", 1, "L", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, new_product, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "pant", "item9.jpg", 1, "L", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, new_product, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "tee", "item10.jpg", 1, "XL", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, new_product, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "tee", "item11.jpg", 1, "XL", 2, 50, 90, 100);
-- INSERT INTO products (product_name, product_type, product_avatar, new_product, size, quantity, price, discount, bought_count)
-- VALUES ("name test", "pant", "item12.jpg", 1, "XXL", 2, 50, 0, 100);
-- drop table products;

create table resetTokens(
	id int auto_increment,
    email varchar(50) not null,
    token varchar(200) not null,
    used boolean default false not null,
    expriration timestamp,
    primary key (id)
);

create table cart(
	cart_id int auto_increment  primary key,
	user_id int NOT NULL,
    status boolean default 0,
	foreign key(user_id) references users(user_id)
);
-- drop table cart;


create table cart_items(
id int auto_increment primary key,
cart_id int,
product_id int,
quantity int default 0,
size int not null,
foreign key(cart_id) references cart(cart_id),
foreign key(product_id) references products(product_id)
);

-- drop table if EXISTS transaction_table
create table orders(
	order_id int auto_increment primary key,
    user_id int not null,
    user_name varchar(100) character set utf8mb4 default "unkown",
    email varchar(100) character set utf8mb4 default "unkown",
    address varchar(1000) character set utf8mb4 not null,
    phone_number char(20) NOT NULL,
    total DECIMAL(10, 2) default 0 not null,
    note varchar(10000) character set utf8mb4 default "",
    send boolean default false,
    success boolean default false,
    foreign key(user_id) references users(user_id)
); 

create table order_items(
	id int auto_increment not null primary key,
	order_id int not null,
    product_id int not null,
    quantity int not null,
    size int not null,
    foreign key (order_id) references orders(order_id),
	foreign key (product_id) references products(product_id)

);

-- create table import(
-- 	import_id int auto_increment,
-- 	name_product varchar(40) character set utf8mb4 NOT NULL ,
-- 	source_product varchar(40) character set utf8mb4 default 'unknown',
-- 	time_import TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- 	price float default'0.0',
--     size int,
-- 	quantity int default '0',
--     image_link varchar(100),
--     primary key (import_id)
-- );



