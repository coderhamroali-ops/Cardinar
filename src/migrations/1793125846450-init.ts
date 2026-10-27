import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1793125846450 implements MigrationInterface {
    name = 'Init1793125846450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "colors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "color" character varying(12) NOT NULL, CONSTRAINT "UQ_e271c8fa9391b29979e3958146e" UNIQUE ("title"), CONSTRAINT "UQ_eb5c5063c1274699dc315aa0766" UNIQUE ("color"), CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carMakes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_e83baad1b6dc8f5c07f42a5a3f4" UNIQUE ("title"), CONSTRAINT "PK_855c76bf31fe62341435c1da826" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carModels" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carMakeId" integer NOT NULL, "title" character varying(64) NOT NULL, CONSTRAINT "UQ_60dbfed3c00e4630b7d8ce570cc" UNIQUE ("title"), CONSTRAINT "PK_c49cbe69bcd546eb0c0fd17e939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('new', 'sale', 'hit')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer NOT NULL, "title" character varying(128) NOT NULL, "price" numeric(12,2) NOT NULL, "description" text, "status" "public"."products_status_enum", "isPremium" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_c30f00a871de74c8e8c213acc4a" UNIQUE ("title"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productImages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, "image" character varying(256) NOT NULL, "position" integer NOT NULL, CONSTRAINT "PK_265744321363f94f5789402b70c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articuls" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, "carModelId" integer NOT NULL, CONSTRAINT "PK_792ee3681642c893a1f3e6768ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productColors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, "colorId" integer NOT NULL, CONSTRAINT "PK_43b99a8ca54a013cd4df14e80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying(128) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cartItems" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "productId" integer NOT NULL, "articulId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_bb4f983020f59696f40ea04d6a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."branches_branchtype_enum" AS ENUM('official', 'partner')`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "address" character varying(128) NOT NULL, "district" character varying(64), "region" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "longitude" numeric(12,9) NOT NULL, "latitude" numeric(12,9) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "branchType" "public"."branches_branchtype_enum" NOT NULL, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "description" character varying(512), CONSTRAINT "UQ_33f0482edfaafa7092d8f075823" UNIQUE ("title"), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."customModels_category_enum" AS ENUM('cover', 'carpet')`);
        await queryRunner.query(`CREATE TABLE "customModels" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "category" "public"."customModels_category_enum" NOT NULL, "title" character varying(128) NOT NULL, "image" character varying(256) NOT NULL, CONSTRAINT "UQ_b2f7ba07c9fb906493f7be48d0d" UNIQUE ("title"), CONSTRAINT "PK_7b2af79825a5fe4324ceb7cf5fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."parts_category_enum" AS ENUM('cover', 'carpet')`);
        await queryRunner.query(`CREATE TYPE "public"."parts_part_enum" AS ENUM('central', 'rare', 'side', 'stitch')`);
        await queryRunner.query(`CREATE TABLE "parts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "category" "public"."parts_category_enum" NOT NULL, "part" "public"."parts_part_enum" NOT NULL, "title" character varying(128), "materialId" integer NOT NULL, "colorId" integer NOT NULL, "image" character varying(256) NOT NULL, CONSTRAINT "PK_daa5595bb8933f49ac00c9ebc79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."customProducts_category_enum" AS ENUM('cover', 'carpet')`);
        await queryRunner.query(`CREATE TABLE "customProducts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64), "carMakeId" integer NOT NULL, "carModelId" integer NOT NULL, "category" "public"."customProducts_category_enum" NOT NULL, "modelId" integer NOT NULL, "withLogo" boolean NOT NULL, "image" character varying(256) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d2acc1826232f66ad803625a397" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymentmethod_enum" AS ENUM('cash', 'payme', 'click', 'uzum')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('processing', 'delivered', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "branchId" integer NOT NULL, "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64), "delivery" boolean NOT NULL, "paymentMethod" "public"."orders_paymentmethod_enum" NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'processing', CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderItems" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer NOT NULL, "productId" integer NOT NULL, "articulId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "price" numeric(12,2) NOT NULL, CONSTRAINT "PK_b1b864ba2b7d5762d34265cc8b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64), "comments" character varying(2000), CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "staticInfo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying(128) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "workingHours" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, CONSTRAINT "PK_49418aee1c05b46f78ef29743b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banners" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "image" character varying(256) NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phoneNumbers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying(16) NOT NULL, CONSTRAINT "UQ_d529b7a435f8267cc2a58d9c84e" UNIQUE ("value"), CONSTRAINT "PK_de6ffabe7497dc7855502e2a6ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "socialLinks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "link" character varying(256) NOT NULL, "icon" character varying(128) NOT NULL, CONSTRAINT "UQ_82546f0f7183430b48f82c7b6f5" UNIQUE ("link"), CONSTRAINT "PK_d966ef58ae57028444f2b596384" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carModels" ADD CONSTRAINT "FK_745cf7cafbf97b7eb5ca3715ab9" FOREIGN KEY ("carMakeId") REFERENCES "carMakes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productImages" ADD CONSTRAINT "FK_8dcf36b93879109c44a4ab49b77" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articuls" ADD CONSTRAINT "FK_fff9ed02774bc098c3b87cce561" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articuls" ADD CONSTRAINT "FK_2c19dbcf941c975af3c2aec8964" FOREIGN KEY ("carModelId") REFERENCES "carModels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productColors" ADD CONSTRAINT "FK_42baa5d067b7f9061b38fb7f99a" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productColors" ADD CONSTRAINT "FK_a30a1c239602d531ae56fd8ea95" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "FK_ff04c6f6a6d282ea2845c8407c2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "FK_f2c97dd179feb55be1b354fb548" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItems" ADD CONSTRAINT "FK_b5388a334d9ffa5b966c6e32fc5" FOREIGN KEY ("articulId") REFERENCES "articuls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parts" ADD CONSTRAINT "FK_9f44d210377eb2fcc3a073ea957" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parts" ADD CONSTRAINT "FK_7ad40dd1c6e968f76205229cc64" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customProducts" ADD CONSTRAINT "FK_783b7f76b9650182a0320b6062c" FOREIGN KEY ("carMakeId") REFERENCES "carMakes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customProducts" ADD CONSTRAINT "FK_db9c703385cbd73a96427730593" FOREIGN KEY ("carModelId") REFERENCES "carModels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customProducts" ADD CONSTRAINT "FK_fd99533997f9c1fc5333211da47" FOREIGN KEY ("modelId") REFERENCES "customModels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_873d9661d948ee484150cf4c73d" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_51d8fc35a95624166faeca65e86" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItems" ADD CONSTRAINT "FK_9750d899c978d2073886b3b3b7d" FOREIGN KEY ("articulId") REFERENCES "articuls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40"`);
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_9750d899c978d2073886b3b3b7d"`);
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_51d8fc35a95624166faeca65e86"`);
        await queryRunner.query(`ALTER TABLE "orderItems" DROP CONSTRAINT "FK_391c9e5d5af8d7d7ce4b96db80e"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_873d9661d948ee484150cf4c73d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "customProducts" DROP CONSTRAINT "FK_fd99533997f9c1fc5333211da47"`);
        await queryRunner.query(`ALTER TABLE "customProducts" DROP CONSTRAINT "FK_db9c703385cbd73a96427730593"`);
        await queryRunner.query(`ALTER TABLE "customProducts" DROP CONSTRAINT "FK_783b7f76b9650182a0320b6062c"`);
        await queryRunner.query(`ALTER TABLE "parts" DROP CONSTRAINT "FK_7ad40dd1c6e968f76205229cc64"`);
        await queryRunner.query(`ALTER TABLE "parts" DROP CONSTRAINT "FK_9f44d210377eb2fcc3a073ea957"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "FK_b5388a334d9ffa5b966c6e32fc5"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "FK_f2c97dd179feb55be1b354fb548"`);
        await queryRunner.query(`ALTER TABLE "cartItems" DROP CONSTRAINT "FK_ff04c6f6a6d282ea2845c8407c2"`);
        await queryRunner.query(`ALTER TABLE "productColors" DROP CONSTRAINT "FK_a30a1c239602d531ae56fd8ea95"`);
        await queryRunner.query(`ALTER TABLE "productColors" DROP CONSTRAINT "FK_42baa5d067b7f9061b38fb7f99a"`);
        await queryRunner.query(`ALTER TABLE "articuls" DROP CONSTRAINT "FK_2c19dbcf941c975af3c2aec8964"`);
        await queryRunner.query(`ALTER TABLE "articuls" DROP CONSTRAINT "FK_fff9ed02774bc098c3b87cce561"`);
        await queryRunner.query(`ALTER TABLE "productImages" DROP CONSTRAINT "FK_8dcf36b93879109c44a4ab49b77"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "carModels" DROP CONSTRAINT "FK_745cf7cafbf97b7eb5ca3715ab9"`);
        await queryRunner.query(`DROP TABLE "socialLinks"`);
        await queryRunner.query(`DROP TABLE "phoneNumbers"`);
        await queryRunner.query(`DROP TABLE "banners"`);
        await queryRunner.query(`DROP TABLE "staticInfo"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "orderItems"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymentmethod_enum"`);
        await queryRunner.query(`DROP TABLE "customProducts"`);
        await queryRunner.query(`DROP TYPE "public"."customProducts_category_enum"`);
        await queryRunner.query(`DROP TABLE "parts"`);
        await queryRunner.query(`DROP TYPE "public"."parts_part_enum"`);
        await queryRunner.query(`DROP TYPE "public"."parts_category_enum"`);
        await queryRunner.query(`DROP TABLE "customModels"`);
        await queryRunner.query(`DROP TYPE "public"."customModels_category_enum"`);
        await queryRunner.query(`DROP TABLE "materials"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TYPE "public"."branches_branchtype_enum"`);
        await queryRunner.query(`DROP TABLE "cartItems"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "productColors"`);
        await queryRunner.query(`DROP TABLE "articuls"`);
        await queryRunner.query(`DROP TABLE "productImages"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "carModels"`);
        await queryRunner.query(`DROP TABLE "carMakes"`);
        await queryRunner.query(`DROP TABLE "colors"`);
    }

}
