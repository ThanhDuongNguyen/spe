
export enum DragFrom{
  DragFromMenu,
  DragFromPage
}

export class DragData{
  public data:any;
  public dragFrom: DragFrom;

  constructor(data:any, dragFrom:DragFrom){
    this.data = data
    this.dragFrom = dragFrom
  }
}
