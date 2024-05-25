import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-layout-common',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout-common.component.html',
  styleUrl: './layout-common.component.scss',
})
export class LayoutCommonComponent {}
