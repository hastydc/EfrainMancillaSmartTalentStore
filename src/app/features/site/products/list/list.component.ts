import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { catchError, of, finalize } from 'rxjs';
import { LoaderService } from '../../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { ToastConfig } from '../../../../shared/models/interfaces/toastConfig.interface';
import { DbService } from '../../../../shared/services/db/db.service';
import { ProductsService } from '../../../../shared/services/products/products.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ProductCartData } from '../../../../shared/models/interfaces/productCartData.interface';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    SectionNameComponent,
    CommonModule,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly cartService: CartService = inject(CartService);

  cdr = inject(ChangeDetectorRef);
  baseProducts: ProductData[] = [];
  products = signal<ProductData[]>([]);
  productStock: { [key: string]: number } = {};
  search: string = '';
  showCartBtn: boolean = false;

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

    this.productsService
      .getProducts()
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
          this.products.update(() => products);
          this.baseProducts = products;
        },
      });
  }

  deleteProduct(productId: number): void {
    let toastConfig: ToastConfig = {
      show: true,
      text: `productWasDeletedSuccessfully`,
    };

    this.productsService
      .deleteProduct(productId)
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
          this.productStock[productData.id] = 0;
          this.showCartBtn = true;
        },
      });
  }

  filterProductsBySearch(): void {
    this.products.update(() =>
      this.baseProducts.filter(
        (product: ProductData) =>
          product.name.toLowerCase().includes(this.search.toLowerCase()) ||
          product.description.toLowerCase().includes(this.search.toLowerCase())
      )
    );
  }
}
