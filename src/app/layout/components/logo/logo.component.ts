import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() customer: boolean = false;
  @Input() session: boolean = false;
  @Input() big: boolean = false;

  private readonly router: Router = inject(Router);

  redirect(): void {
    if (this.session) return;

    const path = this.customer ? '/site/products/list' : '/admin/products/list';

    this.router.navigate([path]);
  }
}
