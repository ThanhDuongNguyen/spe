import { DragDropService } from './../services/drag-drop.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IMenuItem } from '../interface/menu-item';
import { MenuItemModel } from '../model/menu-item.model'
import { ColumnComponent } from '../widgets/column/column.component';
import { DragData, DragFrom } from '../model/drag-data.model';
@Component({
  selector: 'app-landingpage-create',
  templateUrl: './landingpage-create.component.html',
  styleUrls: ['./landingpage-create.component.scss']
})
export class LandingpageCreateComponent implements OnInit {
  dropListConnectedTo!: any;
  @ViewChild("landingPageBody", { read: ViewContainerRef, static: true }) containerRef!: ViewContainerRef;
  listMenu!: MenuItemModel[];
  constructor(private cfr: ComponentFactoryResolver, public dragDropService: DragDropService) {
  }

  ngOnInit() {
    var menu = IMenuItem.GetAllMenuItem()
    this.listMenu = menu.map((item) => new MenuItemModel(
      item.prototype.getNameMenu(),
      item.prototype.getIconClass(),
      new DragData(item, DragFrom.DragFromMenu)));

    this.dropListConnectedTo = this.dragDropService.dropListConnectedTo$.value;
    this.dragDropService.dropListConnectedTo$.subscribe((res: string[]) => {
      this.dropListConnectedTo = res;
    })
  }
  createChildComponent(dragData: DragData): ComponentRef<any> {
    const componentFactory = this.cfr.resolveComponentFactory(
      ColumnComponent
    );
    return this.containerRef.createComponent(componentFactory);
  }

  drop($event: CdkDragDrop<any, any>) {
    if ((<DragData>$event.item.data).dragFrom == DragFrom.DragFromMenu) {
      const componentRef = this.createChildComponent((<DragData>$event.item.data).data)
      let parentDropListId = 'tweb-column-tree';
      componentRef.instance.parentDropListId = parentDropListId;
      componentRef.instance.parentContainer = this.containerRef;
    }
  }

  dragStart() {
    console.log("menu----", this.dropListConnectedTo)
  }
}
