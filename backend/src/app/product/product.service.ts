import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async find(): Promise<Product[] | undefined> {
        return this.productModel.find({}).exec();
    }
    async addProductList(productList: Product[]): Promise<Product[]> {
        return this.productModel.insertMany(productList);
    }
}