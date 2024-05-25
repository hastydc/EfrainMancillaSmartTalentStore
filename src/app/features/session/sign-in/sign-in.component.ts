import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { catchError, of, finalize } from 'rxjs';
import { LoaderService } from '../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../shared/design-system/toast/toast.service';
import { ToastConfig } from '../../../shared/models/interfaces/toastConfig.interface';
import { DbService } from '../../../shared/services/db/db.service';
import { SignInService } from './services/sign-in.service';
import { SessionFormComponent } from '../components/session-form/session-form.component';
import { UserRole } from '../../../shared/models/enums/userRole.enum';
import { UserData } from '../../../shared/models/interfaces/sessionForm.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../../../layout/components/logo/logo.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SessionFormComponent, RouterModule, TranslateModule, LogoComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly dbService: DbService = inject(DbService);
  private readonly signInService: SignInService = inject(SignInService);
  private readonly router: Router = inject(Router);

  public redirectPath: { [key: string]: string } = {
    [UserRole.CUSTOMER]: '/site/products/list',
    [UserRole.ADMIN]: '/admin/products/list',
  };

  async signIn(payload: UserData): Promise<void> {
    this.loaderService.setVisible(true);
    await this.dbService.delay();

    let toastConfig: ToastConfig = {
      show: true,
      text: 'signInSuccessfully',
    };

    this.signInService
      .getUser(payload)
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
        next: ({ role }: UserData) => {
          this.router.navigate([this.redirectPath[role!.toString()]]);
        },
      });
  }
}
