
export class ColumnNode{
  public dropListId:string;
  public children: ColumnNode[];
  constructor(dropListId:string, children:ColumnNode[]){
    this.dropListId = dropListId
    this.children = children
  }
  addNode(columnNode: ColumnNode){
    this.children.push(columnNode);
  }
}
