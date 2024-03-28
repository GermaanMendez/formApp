import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveModule } from '../../../reactive/reactive.module';


interface MenuItem{
  title: string;
  route: string;
}


@Component({
  selector: 'shared-side-menu',
  templateUrl:'./sideMenu.component.html',
  styleUrl: './sideMenu.component.css',
})
export class SideMenuComponent {


  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos', route: './reactive/basic' },
    { title: 'Dinamicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ]


  public authMenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ]

 }
