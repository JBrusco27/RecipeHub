import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../user/services/login.service';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from './profile.service';
import { UtilsService } from '../../shared/services/utils.service';
import { RecipePreviewComponent } from '../../shared/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    RecipePreviewComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  isLogged: boolean = false;
  user: any;
  submitted: boolean = false;
  passwordLimits: number[] = [8, 64];
  nameLimits: number[] = [3, 100];
  lastnameLimits: number[] = [3, 100];


  form: FormGroup = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email, Validators.nullValidator]),
    user_name: new FormControl('', [Validators.required, Validators.minLength(this.nameLimits[0]), Validators.maxLength(this.nameLimits[1]), Validators.nullValidator]),
    user_lastname: new FormControl('', [Validators.required, Validators.minLength(this.lastnameLimits[0]), Validators.maxLength(this.lastnameLimits[1]), Validators.nullValidator]),
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private profileService: ProfileService,
    protected utilService: UtilsService,
    private router: Router
  ){}

  ngOnInit() {
    this.loginService.logged().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;

      if(!isLogged){
        this.router.navigate(['/home'])
      }

        this.userService.getUserDetailsFromToken()!.subscribe(
          data => {
            this.user = data;
            this.form.setValue({
              user_name: this.user.user_name,
              user_lastname: this.user.user_lastname,
              user_email: this.user.user_email,
            });
          }
        );
    });
  }

  editUser(){
    this.submitted = true;

    if(!this.isLogged){
      return;
    }

    if(!this.form.valid){
      return;
    }

    this.profileService.editUser(this.form.value).subscribe(user => {
      if(user){
        window.location.reload();
      }
    });

  }


}
