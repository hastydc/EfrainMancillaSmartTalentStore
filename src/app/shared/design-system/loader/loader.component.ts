import { Component, Input, effect, inject } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() show: boolean = false;

  private readonly loaderService: LoaderService = inject(LoaderService);

  constructor() {
    effect(() => {
      this.show = this.loaderService.getVisible();
    });
  }
}
