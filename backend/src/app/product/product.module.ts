import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {Product, ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    providers: [ProductService],
    exports: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}