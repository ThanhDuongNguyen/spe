import { DragData } from "./drag-data.model";

export class MenuItemModel{
  constructor(
    public name : string,
    public icon : string,
    public dragData : DragData
  ) {}
}
