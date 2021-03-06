import { DragDropService } from './../../services/drag-drop.service';
import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDragStart, CdkDropList, copyArrayItem, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, HostBinding, HostListener, OnChanges, OnInit, QueryList, SimpleChanges, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { IMenuItem } from '../../interface/menu-item'
import { DragData, DragFrom } from 'src/app/model/drag-data.model';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
@IMenuItem.register
export class ColumnComponent implements OnInit, AfterViewInit, OnChanges {


  parentDropListId!: string;
  parentContainer!: ViewContainerRef

  //test
  droplistId: string = "";
  placeHolderList: string[] = [];

  dropListConnectedTo!: any;


  static index: number = 0;
  currIndex!: number;
  dragData!: DragData;
  @ViewChild("dynamicComponent", { read: ViewContainerRef, static: true }) containerRef!: ViewContainerRef;
  @ViewChild("column", { read: ViewContainerRef, static: true }) widget!: ViewContainerRef;
  // @ViewChildren(ColumnComponent, { read: ViewContainerRef })
  // public children!:QueryList<ViewContainerRef>;

  constructor(private cfr: ComponentFactoryResolver, public dragDropService: DragDropService, private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {

    this.currIndex = ColumnComponent.index;
    ColumnComponent.index++;
    this.dragData = new DragData({
      containerRef: this,
      parentContainer: this.parentContainer
    }, DragFrom.DragFromPage);

    this.dragDropService.dropListConnectedTo$.subscribe((res: string[]) => {
      this.dropListConnectedTo = res.filter((x: string) => x != this.widget.element.nativeElement.id);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.droplistId = this.droplistId.concat(this.widget.element.nativeElement.id);
      this.dragDropService.addNodeToTreeString(this.parentDropListId, this.widget.element.nativeElement.id);
      this.dropListConnectedTo = this.dragDropService.dropListConnectedTo$.value.filter((x: string) => x != this.widget.element.nativeElement.id);
    });

  }

  //l???y t??n ????? hi???n th??? tr??n list menu
  getNameMenu(): string {
    return 'Column';
  }
  //l???y icon
  getIconClass(): string {
    return 'column-icon';
  }

  createChildComponent(componentType: any): ComponentRef<any> {
    const componentFactory = this.cfr.resolveComponentFactory(
      componentType
    );
    return this.containerRef.createComponent(componentFactory);
  }

  drop($event: CdkDragDrop<any, any>) {
    console.log($event)
    // debugger
    //n???u k??o th??? t??? menu DragFrom.DragFromMenu
    if ((<DragData>$event.item.data).dragFrom == DragFrom.DragFromMenu) {
      copyArrayItem(
        ['Placeholder'],
        $event.container.data,
        0,
        $event.currentIndex
      )
      //t???o dynamic component d???a tr??n type dragData truy???n v??o
      const componentRef = this.createChildComponent((<DragData>$event.item.data).data)
      //sau khi t???o ???????c component con, th???c hi???n th??m dropListID c???a parent v??o ????? t???o column tree
      let parentDropListId = this.widget.element.nativeElement.id;
      componentRef.instance.parentDropListId = parentDropListId;
      //sau khi t???o ???????c component con, th???c hi???n th??m ViewContainerRef c???a parent v??o ????? c?? th??? detach ph???n t??? con khi move
      componentRef.instance.parentContainer = this.containerRef;
      componentRef.changeDetectorRef.markForCheck();
      componentRef.changeDetectorRef.detectChanges();
      // console.log(this.children)

    } //n???u k??o th??? t??? c??c ph???n t??? ???? t???n t???i (move) DragFrom.DragFromPage
    else if ((<DragData>$event.item.data).dragFrom == DragFrom.DragFromPage) {
      console.log('detachIndex', $event.previousIndex)

      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex,
      )

      //l???y ViewContainerRef ph???n t??? con ???????c truy???n qua dragData d??ng detach v?? insert ????? move component
      var viewChildRef = (<ViewContainerRef>$event.item.data.data.parentContainer).detach($event.previousIndex)
      if (viewChildRef != null) {
        this.containerRef.insert(viewChildRef, $event.currentIndex);
        this.cdr.markForCheck();
        viewChildRef.markForCheck();
        viewChildRef.detectChanges();
        //c???p nh???t ViewContainerRef parent m???i, reload dragData m???i
        (<ViewContainerRef>$event.item.data.data.containerRef.parentContainer) = this.containerRef;
        $event.item.data.data.containerRef.reloaDragData();
        //c???p nh???t parentDropListId m???i
        $event.item.data.data.containerRef.parentDropListId = this.widget.element.nativeElement.id;
        this.dragDropService.moveNode((<ViewContainerRef>$event.item.data.data.containerRef.widget).element.nativeElement.id, this.widget.element.nativeElement.id)

      }
      else {
        console.log('null rooif')
      }

    }
  }

  dragStartTest($event: CdkDragStart) {
    console.log($event)
    $event.source.reset()
    console.log($event)

  }

  reloaDragData() {
    this.dragData = new DragData({
      containerRef: this,
      parentContainer: this.parentContainer
    }, DragFrom.DragFromPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`column ${this.currIndex} change`)
  }

}
