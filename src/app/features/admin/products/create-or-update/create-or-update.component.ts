import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { InputSelectComponent } from '../../../../shared/design-system/input-select/input-select.component';
import { InputComponent } from '../../../../shared/design-system/input/input.component';
import { ProductFormKey } from '../../../../shared/models/enums/productFormKey.enum';
import { ProductForm } from '../../../../shared/models/interfaces/productForm.interface';
import { ProductData } from '../../../../shared/models/interfaces/productData.interface';
import { catchError, of, finalize } from 'rxjs';
import { LoaderService } from '../../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';
import { DbService } from '../../../../shared/services/db/db.service';
import { ToastConfig } from '../../../../shared/models/interfaces/toastConfig.interface';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products/products.service';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TranslateModule,
    CommonModule,
    InputComponent,
    InputSelectComponent,
    SectionNameComponent,
  ],
  selector: 'app-create-or-update',
  standalone: true,
  templateUrl: './create-or-update.component.html',
  styleUrl: './create-or-update.component.scss',
})
export class CreateOrUpdateComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly productsService: ProductsService = inject(ProductsService);

  form!: FormGroup;
  formKey = ProductFormKey;
  label: string = 'create';
  id: number = 0;

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute?.snapshot?.params['id'] ?? 0, 10);
    this.label = this.id > 0 ? 'edit' : 'create';
    this.getProduct();
  }

  async getProduct(hideToast?: boolean): Promise<void> {
    if (!this.id) return this.initForm();

    this.loaderService.setVisible(true);
    await this.dbService.delay();
    let toastConfig: ToastConfig = {
      show: true,
      text: `productWasLoadedSuccessfully`,
    };

    this.productsService
      .getProduct(this.id)
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
          if (!hideToast) this.toastService.setConfig(toastConfig);
        })
      )
      .subscribe({
        next: (productData) => {
          this.initForm(productData);
        },
      });
  }

  initForm(productData?: ProductData): void {
    let controls: ProductForm = {
      [ProductFormKey.ID]: [this.id, [Validators.required]],
      [ProductFormKey.NAME]: [productData?.name ?? '', [Validators.required]],
      [ProductFormKey.DESCRIPTION]: [
        productData?.description ?? '',
        [Validators.required],
      ],
      [ProductFormKey.PRICE]: [
        parseInt(`${productData?.price ?? 0}`, 10),
        [Validators.required],
      ],
      [ProductFormKey.STOCK]: [
        parseInt(`${productData?.stock ?? 0}`, 10),
        [Validators.required],
      ],
    };

    this.form = this.formBuilder.group<ProductForm>(controls);
  }

  async save(): Promise<void> {
    this.loaderService.setVisible(true);
    await this.dbService.delay();

    const payload: ProductData = this.form.getRawValue() as ProductData;
    const isCreate: boolean = this.id === 0;

    let toastConfig: ToastConfig = {
      show: true,
      text: `productWas${isCreate ? 'Created' : 'Edited'}Successfully`,
    };

    const request = isCreate
      ? this.productsService.createProduct(payload)
      : this.productsService.updateProduct(payload);

    request
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
          this.getProduct(true);
        },
      });
  }
}
