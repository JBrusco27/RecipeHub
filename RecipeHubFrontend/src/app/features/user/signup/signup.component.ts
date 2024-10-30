import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatIcon, MatButtonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(
    private router: Router,
    private signupService: SignupService,
    private loginService: LoginService
  ){}

  submitted: boolean = false;
  passwordLimits: number[] = [8, 64];
  nameLimits: number[] = [3, 100];
  lastnameLimits: number[] = [3, 100];
  fileName?: string;
  selectedFile!: ImageSnippet

  form: FormGroup = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email, Validators.nullValidator]),
    user_password: new FormControl('', [Validators.required, Validators.minLength(this.passwordLimits[0]), Validators.maxLength(this.passwordLimits[1]), Validators.nullValidator]),
    user_name: new FormControl('', [Validators.required, Validators.minLength(this.nameLimits[0]), Validators.maxLength(this.nameLimits[1]), Validators.nullValidator]),
    user_lastname: new FormControl('', [Validators.required, Validators.minLength(this.lastnameLimits[0]), Validators.maxLength(this.lastnameLimits[1]), Validators.nullValidator]),
    user_profile_image: new FormControl('', [Validators.required])
  });

  ngOnInit(){
    this.loginService.logged().subscribe((isLogged: boolean) => {
      if(isLogged){
        this.router.navigate(['/home'])
      }
    });


    this.form.setValue({
      user_name: '',
      user_lastname: '',
      user_email: '',
      user_password: '',
      user_profile_image: 'default'
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = new ImageSnippet(URL.createObjectURL(file), file);
      this.fileName = file.name;

    }
  }


  signup(){
    this.submitted = true;

    if(!this.form.valid){
      return;
    }

    let formData: FormData = new FormData
    formData.append('file', this.selectedFile.file)

    this.signupService.uploadImage(formData).subscribe(
      {
        next: (file) => {
          this.form.patchValue({
            user_profile_image: file.filename
          })

          this.signupService.signup(this.form.value).subscribe(user => {
            if(user){
              this.router.navigate(['/login']);
            }
          });
        }
      }
    )




  }

}
