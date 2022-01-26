import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ColumnNode } from '../model/column-node.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {


  dropListConnectedTo$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  columnTree!: ColumnNode;
  constructor() {
    //Khởi tạo node root
    this.columnTree = new ColumnNode('tweb-column-tree',[]);
    let dropListConnectedToTemp :any[] = [];
    this.treeToList([this.columnTree], dropListConnectedToTemp, 0);
    console.log(dropListConnectedToTemp);
    for (let i = 0; i < dropListConnectedToTemp.length; i++) {
      // this.dropListConnectedTo.push(dropListConnectedToTemp[i].dropListId);
      this.dropListConnectedTo$.next(this.dropListConnectedTo$.getValue().concat(dropListConnectedToTemp[i].dropListId))
    }
  }

  reloadColumnTree(){
    //xử lý sắp xếp dropListConnectedTo theo tree mới
    // this.dropListConnectedTo
    // while(this.dropListConnectedTo$.value.length > 0){
    //   this.dropListConnectedTo.pop()
    // }
    this.dropListConnectedTo$.next([]);

    let dropListConnectedToTemp :any[] = [];
    this.treeToList([this.columnTree], dropListConnectedToTemp, 0);
    dropListConnectedToTemp = dropListConnectedToTemp.sort((a:any,b:any)=>b.score - a.score)

    for (let i = 0; i < dropListConnectedToTemp.length; i++) {
      // this.dropListConnectedTo.push(dropListConnectedToTemp[i].dropListId);
      this.dropListConnectedTo$.next(this.dropListConnectedTo$.getValue().concat(dropListConnectedToTemp[i].dropListId))

    }
    // console.log(this.columnTree);
    // console.log(this.dropListConnectedTo$.value)
  }

  addNodeToTreeString(dropListIdParent:string, dropListIdChild:string){
    //thêm node vào tree
    this.addNodeToTreeRecursive([this.columnTree], dropListIdParent, dropListIdChild);
  }
  //hàm đệ quy thêm node vào tree
  private addNodeToTreeRecursive(columns:ColumnNode[] ,dropListIdParent:string, dropListIdChild:string){
    for (let i = 0; i < columns.length; i++) {
      if(columns[i].dropListId == dropListIdParent){
        columns[i].children.push(new ColumnNode(dropListIdChild, []));
        break;
      }
      else{
        this.addNodeToTreeRecursive(columns[i].children, dropListIdParent, dropListIdChild);
      }
    }
    this.reloadColumnTree()
  }

  addNodeToTreeNode(columns:ColumnNode[] ,dropListIdChild:ColumnNode, dropListIdParent:string){
    for (let i = 0; i < columns.length; i++) {
      if(columns[i].dropListId == dropListIdParent){
        columns[i].children.push(dropListIdChild);
        break;
      }
      else{
        this.addNodeToTreeNode(columns[i].children, dropListIdChild, dropListIdParent);
      }
    }
    this.reloadColumnTree()
  }

  moveNode(dropListId: string, dropListIdNewParent:string){
    var dropListChildNode = this.cutChildNode([this.columnTree], dropListId);
    this.addNodeToTreeNode([this.columnTree], dropListChildNode, dropListIdNewParent)
    console.log(this.columnTree);
  }

  cutChildNode(columns:ColumnNode[], dropListId: string):any{
    for (let i = 0; i < columns.length; i++) {
      if(columns[i].dropListId == dropListId){
        let nodeCopy =JSON.parse(JSON.stringify(columns[i]))
        const index = columns.indexOf(columns[i], 0);
        columns.splice(index,1);
        return nodeCopy;
      }
      else{
        let rs = this.cutChildNode(columns[i].children, dropListId);
        if(rs != undefined)
          return rs;
      }
    }
    return undefined
  }


  treeToList(columns:ColumnNode[], dropListConnectedTo:any[], score:number):any{
    let currScore = score;
    for (let i = 0; i < columns.length; i++) {
        this.treeToList(columns[i].children, dropListConnectedTo, currScore + 1);
        dropListConnectedTo.push({ dropListId :columns[i].dropListId, score: currScore});
    }
  }
}
