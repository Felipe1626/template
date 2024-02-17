export class Reviews {
  constructor(
    public clientName: string,
    public rate: number,
    public review: string,
    public date: string,
    public publish?: boolean,
    public id?: number,
  ){}
}