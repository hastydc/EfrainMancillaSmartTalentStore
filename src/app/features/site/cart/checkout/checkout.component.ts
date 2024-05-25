import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../../shared/design-system/toast/toast.service';
import { ProductCartData } from '../../../../shared/models/interfaces/productCartData.interface';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { DbService } from '../../../../shared/services/db/db.service';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutForm } from '../../../../shared/models/interfaces/checkoutForm.interface';
import { CheckoutFormKey } from '../../../../shared/models/enums/checkoutFormKey.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../../shared/services/users/users.service';
import { UserData } from '../../../../shared/models/interfaces/sessionForm.interface';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/design-system/input/input.component';
import { ButtonComponent } from '../../../../shared/design-system/button/button.component';
import { ProductsService } from '../../../../shared/services/products/products.service';
import { Router } from '@angular/router';
import { SectionNameComponent } from '../../../../shared/design-system/section-name/section-name.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SectionNameComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly cartService: CartService = inject(CartService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly usersService: UsersService = inject(UsersService);
  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly router: Router = inject(Router);

  cdr = inject(ChangeDetectorRef);
  products: ProductCartData[] = [];
  total: number = 0;
  form!: FormGroup;
  formKey = CheckoutFormKey;
  user!: UserData;

  ngOnInit(): void {
    this.getProducts();
    this.getUser();
  }

  async getProducts(): Promise<void> {
    this.loaderService.setVisible(true);
    this.dbService.delay();

    this.cartService
      .getProductsCart()
      .pipe(
        finalize(() => {
          this.loaderService.setVisible(false);
        })
      )
      .subscribe({
        next: (products) => {
          this.products = products;

          this.products.forEach(({ price, amount }) => {
            this.total += price * amount;
          });
        },
      });
  }

  async getUser(): Promise<void> {
    this.loaderService.setVisible(true);
    this.dbService.delay();

    this.usersService
      .getCurrentUser()
      .pipe(
        finalize(() => {
          this.loaderService.setVisible(false);
        })
      )
      .subscribe({
        next: (user) => {
          this.user = user;
          this.initForm();
        },
      });
  }

  initForm(): void {
    let controls: CheckoutForm = {
      [CheckoutFormKey.FULL_NAME]: ['', [Validators.required]],
      [CheckoutFormKey.ADDRESS]: ['', [Validators.required]],
      [CheckoutFormKey.PHONE]: ['', [Validators.required]],
      [CheckoutFormKey.PAYMENT_TYPE]: ['cash', [Validators.required]],
      [CheckoutFormKey.EMAIL]: [this.user.email, [Validators.required]],
    };

    this.form = this.formBuilder.group<CheckoutForm>(controls);
  }

  buy(): void {
    this.loaderService.setVisible(true);
    this.products.forEach((product) => {
      product = { ...product, stock: product.stock - product.amount };

      this.productsService.updateProduct(product);
      this.cartService.clearCart();

      setTimeout(() => {
        this.loaderService.setVisible(false);
        this.toastService.setConfig({
          show: true,
          text: 'purchaseSuccessfully',
        });
        this.router.navigate(['/site/cart/thanks']);
      }, 1000);
    });
  }
}
