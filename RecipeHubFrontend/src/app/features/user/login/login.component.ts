import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService, loginResponse } from '../services/login.service';
import { UtilsService } from '../../../shared/services/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  submitted: boolean = false;
  passwordLimits: number[] = [8, 64];

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.nullValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.passwordLimits[0]), Validators.maxLength(this.passwordLimits[1])]),
  })


  ngOnInit(){
    this.loginService.logged().subscribe((isLogged: boolean) => {
      if(isLogged){
        this.router.navigate(['/home'])
      }
    });
  }

  login(){
    this.submitted = true;

    if(!this.form.valid){
      return;
    }

    const userEmail = this.form.value.email.trim().toLocaleLowerCase();
    const userPassword = this.form.value.password.trim();

    this.loginService.loginJwt(userEmail, userPassword).subscribe((jwtData: loginResponse) => {
      if(jwtData){
        this.loginService.setJwtSession(jwtData);
        this.router.navigate(['/home']);
      }else{
        this.utilsService.openSnackBar(
          {
            message:'An error occurred while logging in, please try again later.',
            action: 'Close',
            duration: 2000
          }
        )
      }
    });
  }

}
