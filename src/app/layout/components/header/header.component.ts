import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DbService } from '../../../shared/services/db/db.service';
import { DBKey } from '../../../shared/models/enums/dbKey.enum';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    LogoComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private readonly dbService: DbService = inject(DbService);
  private readonly router: Router = inject(Router);
  private readonly cartService: CartService = inject(CartService);

  badge: number = 0;

  @Input() customer: boolean = false;

  constructor() {
    effect(() => {
      this.badge = this.cartService.getBadge();
    });
  }

  ngOnInit(): void {
    this.cartService.checkBadge();
  }

  signOut(): void {
    this.dbService.delete(DBKey.CURRENT_AUTH);
    this.router.navigate(['/session/sign-in']);
  }
}
