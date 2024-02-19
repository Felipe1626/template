import { Injectable, Type } from '@angular/core';
import { Product } from '../models/products.model';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../models/environment';
import { Reviews } from '../models/reviews.model';
import { Images } from '../models/images.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey)

  product: Product[] = []
  constructor() { }

  async getAllAvalaibleProducts(category: string): Promise<Product[]> {
    let { data: _products, error } = await this.supabase
      .from('product')
      .select('*').eq('avalaible', true).eq('Category', category)

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const imageFetchPromises = _products!.map(async (product) => {
      product.imageSm = await this.getImageUrl(product.imageSm);
      product.imageMd = await this.getImageUrl(product.imageMd);
      product.imageLg = await this.getImageUrl(product.imageLg);
      return product;
    });
  
    const products = await Promise.all(imageFetchPromises);
  
    return products;

  }

  async getAllProducts(): Promise<Product[]> {
    let { data: _products, error } = await this.supabase
      .from('product')
      .select('*')

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    const imageFetchPromises = _products!.map(async (product) => {
      product.imageSm = await this.getImageUrl(product.imageSm);
      product.imageMd = await this.getImageUrl(product.imageMd);
      product.imageLg = await this.getImageUrl(product.imageLg);
      return product;
    });
  
    const products = await Promise.all(imageFetchPromises);
  
    return products;

  }

  
  categories: string[] = []
  servings: string[] = []

  async getServings(){
    this.servings = []
    let { data, error } = await this.supabase
    .from('product')
    .select('name').eq('Category', 'porciones')
    if (data) {
      this.servings = data.map(item => item.name);
    }
  }
  async getAllCategories() {
    this.categories = []
    let { data, error } = await this.supabase
      .from('product')
      .select('Category')
      if (data) {
        const uniqueCategories = [...new Set(data.map((item: any) => item.Category))];
        this.categories = uniqueCategories;        
      }
      
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
  
  }
  
  

  async getImageUrl(imageName: string): Promise<string> {
    const { data, error } = await this.supabase
      .storage
      .from('product_img')
      .createSignedUrl(`public/${imageName}`, 6000);

    if (error) {
      console.error(`Error getting the signed URL for image: ${imageName}`);
      return 'error';
    }
    return data.signedUrl;
  }


  async addImage(name: string, data: Blob | null): Promise<string | undefined> {
    if (!data) {
      return undefined;
    }
  
    const { data: response, error } = await this.supabase
      .storage
      .from('product_img')
      .upload(`public/${name}`, data, {
        cacheControl: '3600',
        upsert: false,
      });
  
    if (error) {
      console.error('Error uploading an image:', error);
      return undefined;
    }
  
    return 
  }

  async changeImage(name: string, data: Blob | null): Promise<string | undefined> {
    if (!data) {
      return undefined;
    }
  
    const { data: response, error } = await this.supabase
      .storage
      .from('product_img')
      .update(`public/${name}`, data, {
        cacheControl: '3600',
        upsert: false,
      })
  
    if (error) {
      console.error('Error uploading an image:', error);
      return undefined;
    }
  
    return 
  }
  

  async addProduct(product: Product){
    this.product.push(product);
    const { data, error } = await this.supabase
    .from('product')
    .insert(product)
    .select()
    if (error) {
      console.error('here we have an error:', error)
    }else{
      console.log('Productd added');
    }
  }

  async updateProduct(id: number, updateProduct: Product){
    const { data, error } = await this.supabase
    .from('product')
    .update( {name: updateProduct.name, description: updateProduct.description, price: updateProduct.price, Category: updateProduct.Category, avalaible: updateProduct.avalaible, imageSm: updateProduct.imageSm, imageMd: updateProduct.imageMd, imageLg: updateProduct.imageLg} )
    .eq('id', id)
    .select()
    if (error) {
      console.error('here we have an error on updateProduct():', error)
    }else{
      console.log('Productd updated');

    }
  }

  async updateProductName(name: string, value: string){
    const { data, error } = await this.supabase
    .from('product')
    .update({'name': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductName():', error)
    }else{
      console.log('Product updated');
    }
  }

    async updateProductDescription(name: string, value: string){
    const { data, error } = await this.supabase
    .from('product')
    .update({'description': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductDescription():', error)
    }else{
      console.log('Product updated');
    }
  }

  async updateProductPrice(name: string, value: number){
    const { data, error } = await this.supabase
    .from('product')
    .update({'price': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductPrice():', error)
    }else{
      console.log('Product updated');
    }
  }


  async updateProductCategory(name: string, value: string){
    const { data, error } = await this.supabase
    .from('product')
    .update({'Category': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductCategory():', error)
    }else{
      console.log('Product updated');
    }
  }

  async updateProductAvalaibility(name: string, value: boolean){
    const { data, error } = await this.supabase
    .from('product')
    .update({'avalaible': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductAvalaibility():', error)
    }else{
      console.log('Product updated');
    }
  }

  async updateProductSmallImg(name: string, value: string){
    const { data, error } = await this.supabase
    .from('product')
    .update({'imageSm': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductAvalaibility():', error)
    }else{
      console.log('Product updated');
    }
  }

  async updateProductBaseImg(name: string, value: string){
    const { data, error } = await this.supabase
    .from('product')
    .update({'imageMd': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductBaseImg():', error)
    }else{
      console.log('Product updated');
    }
  }

  async updateProductBigImg(name: string, value: boolean){
    const { data, error } = await this.supabase
    .from('product')
    .update({'imageLg': value})
    .eq('name', name)
    if (error) {
      console.error('here we have an error on updateProductBigImg():', error)
    }else{
      console.log('Product updated');
    }
  }

  async deleteProduct(name:string){
    const { error } = await this.supabase
    .from('product')
    .delete()
    .eq( 'name', name)
    if (error) {
      console.error('here we have an error on deleteProduct():', error)
    }else{
      console.log('Productd Deleted succesfully');
    }
  }

  async getReviews(){
    let { data, error } = await this.supabase
      .from('Reviews')
      .select('*')

      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
      
      return data as Reviews[]
  
  }

  async getReviewByStatus(statusCol: string, statusValue: string | boolean){
    let { data, error } = await this.supabase
      .from('Reviews')
      .select('*').eq(statusCol, statusValue )

    if (error) {
      console.error('Error fetching Reviews:', error);
    }

    return data as Reviews[]

  }

  async addReview(review: Reviews){
    const { data, error } = await this.supabase
    .from('Reviews')
    .insert(review)
    .select()
    if (error) {
      console.error('here we have an error adding the review error:', error)
    }else{
      console.log('review added');
    }
  }

  async makePublic(id: number, value: boolean){
    const { data, error } = await this.supabase
    .from('Reviews')
    .update({'publish': value})
    .eq('id', id)
    if (error) {
      console.error('here we have an error on updateReview():', error)
    }else{
      console.log('Review updated');
    }
  }

  async deleteReview(id: number){
    const { error } = await this.supabase
    .from('Reviews')
    .delete()
    .eq( 'id', id)
    if (error) {
      console.error('here we have an error on deleteReview():', error)
    }else{
      console.log('Review Deleted succesfully');
    }
  }

  async addImagesNames(_name: string, db: string){
    const { data, error } = await this.supabase
    .from(db)
    .insert({name: _name})
    .select()
    if (error) {
      console.error('Error uploading image name:', error)
    }else{
      console.log('Image name:', _name,', added succesfully', data)
    }
  }

  async deleteImage(ImgName: string, bucket: string, db: string){
    const { data, error } = await this.supabase
    .storage
    .from(bucket)
    .remove([`public/${ImgName}`])
    if(error){
      console.error('error deleting an image:', error)
    }else{
      console.log('Image Deleted Form The Bucket Succesfully', data);
      
    }
    this.deleteImageName(ImgName, db)
    
  }

  async deleteImageName(_imgName: string, _db: string){
    const { status, error } = await this.supabase
    .from(_db)
    .delete()
    .eq( 'name', _imgName)
    if (error) {
      console.error('Error Deleting The Image Name', error)
    }
  }

  async getAllImages(dbName: string, bucket: string){
    let { data, error } = await this.supabase
      .from(dbName)
      .select('*')
      const _images: Images[] = []
      if (data) {
        for (let img of data) {
          const newUrl = await this.getImageUrl(img.name)
          const _img = new Images(img, newUrl, img.avalaible) 
          _images.push(_img)
        }
      }
    if (error) {
      console.error('Error fetching Images:', error);
    }
    return _images as Images[];

  }


}
