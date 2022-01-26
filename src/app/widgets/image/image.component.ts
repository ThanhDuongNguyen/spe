import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/interface/menu-item';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
@IMenuItem.register
export class ImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 //lấy tên để hiển thị trên list menu
 getNameMenu(): string {
  return 'Image';
}

//lấy icon
getIconClass():string{
  return  'image-icon';
}
}
