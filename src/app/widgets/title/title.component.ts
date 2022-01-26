import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/interface/menu-item';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
@IMenuItem.register
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //lấy tên để hiển thị trên list menu
  getNameMenu(): string {
    return 'Title';
  }

  //lấy icon
  getIconClass():string{
    return  'title-icon';
  }
}
