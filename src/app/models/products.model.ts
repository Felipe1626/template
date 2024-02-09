export class Product {
  constructor(
      public name: string,
      public description: string,
      public price: number,
      public avalaible: boolean = false,
      public Category: string,
      public imageSm: string,
      public imageMd: string,
      public imageLg: string,
      public quantity?: number,
      public comment?: string,
      public id?: number
  ){}
}