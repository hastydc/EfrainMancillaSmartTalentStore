import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';
import { DbService } from '../../../../shared/services/db/db.service';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ToastConfig } from '../../../../shared/models/interfaces/toastConfig.interface';
import { ProductsService } from '../../../../shared/services/products/products.service';
import { catchError, finalize, of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    ButtonComponent,
    SectionNameComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly router: Router = inject(Router);

  products: ProductData[] = [];

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
          this.products = [];
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
        },
      });
  }

  goToEdit(productId: number): void {
    this.router.navigate(['/admin/products/create-or-update/', productId]);
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
}
