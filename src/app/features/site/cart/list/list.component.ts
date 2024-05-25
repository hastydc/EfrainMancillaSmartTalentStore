import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, of, finalize } from 'rxjs';
import { LoaderService } from '../../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';
import { ProductCartData } from '../../../../shared/models/interfaces/productCartData.interface';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { ToastConfig } from '../../../../shared/models/interfaces/toastConfig.interface';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { DbService } from '../../../../shared/services/db/db.service';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { RouterModule } from '@angular/router';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    ButtonComponent,
    RouterModule,
    SectionNameComponent,
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly cartService: CartService = inject(CartService);

  cdr = inject(ChangeDetectorRef);
  products: ProductCartData[] = [];
  productStock: { [key: string]: number } = {};

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts(): Promise<void> {
    this.loaderService.setVisible(true);
    this.dbService.delay();

    let toastConfig: ToastConfig = {
      show: true,
      text: `productsWasLoadedSuccessfully`,
    };

    this.cartService
      .getProductsCart()
      .pipe(
        catchError((e) => {
          toastConfig = {
            ...toastConfig,
            error: true,
            text: `${e.message}`,
          };
          return of();
        }),
        finalize(() => {
          this.loaderService.setVisible(false);
          this.toastService.setConfig(toastConfig);
        })
      )
      .subscribe({
        next: (products) => {
          this.products = products;
          this.products.forEach(({ id, amount }) => {
            this.productStock[id] = amount;
          });
        },
      });
  }

  deleteProduct(productId: number): void {
    let toastConfig: ToastConfig = {
      show: true,
      text: `productWasDeletedSuccessfully`,
    };

    this.cartService
      .removeFromCart(productId)
      .pipe(
        catchError((e) => {
          toastConfig = {
            ...toastConfig,
            error: true,
            text: `${e.message}`,
          };
          return of();
        }),
        finalize(() => {
          this.loaderService.setVisible(false);
          this.toastService.setConfig(toastConfig);
        })
      )
      .subscribe({
        next: () => {
          this.getProducts();
        },
      });
  }

  checkStock({ id, stock }: ProductData): void {
    setTimeout(() => {
      if (this.productStock[id] > parseInt(`${stock}`, 10)) {
        this.productStock[id] = parseInt(`${stock}`, 10);
      }
    }, 1000);
  }

  addToCart(productData: ProductData): void {
    const payload: ProductCartData = {
      ...productData,
      amount: this.productStock[productData.id],
    };
    let toastConfig: ToastConfig = {
      show: true,
      text: `productWasAddedToCartSuccessfully`,
    };

    this.cartService
      .addToCart(payload)
      .pipe(
        finalize(() => {
          this.toastService.setConfig(toastConfig);
        })
      )
      .subscribe({
        next: () => {
          this.getProducts();
        },
      });
  }
}
