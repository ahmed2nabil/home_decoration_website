import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { Product } from './product.schema';
@Controller('productData')
export class ProductController {
    constructor(private productService: ProductService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    async getProdcutList() {
        return  this.productService.find();
    }
    @Post()
    async addProductList(@Body() productList: Partial<Product[]>): Promise<Product[]> {
        return this.productService.addProductList(productList);
    }
}