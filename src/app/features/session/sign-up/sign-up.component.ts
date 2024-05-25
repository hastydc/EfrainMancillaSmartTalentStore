import { Component, inject } from '@angular/core';
import { SessionFormComponent } from '../components/session-form/session-form.component';
import { LoaderService } from '../../../shared/design-system/loader/loader.service';
import { ToastService } from '../../../shared/design-system/toast/toast.service';
import { SignUpService } from './services/sign-up.service';
import { ToastConfig } from '../../../shared/models/interfaces/toastConfig.interface';
import { catchError, finalize, of } from 'rxjs';
import { DbService } from '../../../shared/services/db/db.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserData } from '../../../shared/models/interfaces/sessionForm.interface';
import { LogoComponent } from '../../../layout/components/logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SessionFormComponent, LogoComponent, TranslateModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly signUpService: SignUpService = inject(SignUpService);
  private readonly dbService: DbService = inject(DbService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  async signUp(payload: UserData): Promise<void> {
    this.loaderService.setVisible(true);
    await this.dbService.delay();

    let toastConfig: ToastConfig = {
      show: true,
      text: 'userWasCreatedSuccessfully',
    };

    this.signUpService
      .createUser(payload)
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
          this.router.navigate(['/session/sign-in']);
        },
      });
  }
}
