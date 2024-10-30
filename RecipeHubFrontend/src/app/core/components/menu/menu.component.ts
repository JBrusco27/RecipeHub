import { Component, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { LoginService } from '../../../features/user/services/login.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.minLength(1), Validators.required, Validators.pattern(/^\S.*$/)])
  });

  isLogged: boolean = false;

  windowWidth = signal(window.innerWidth);
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set(window.innerWidth);
  }


  constructor(
    private loginService: LoginService,
    private dialogRef: MatDialogRef<MenuComponent>,
    private router: Router
  ){}

  ngOnInit(){
    this.loginService.logged().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }

  closeMenu(){
    this.dialogRef.close();
  }

  search() {
    if (!this.searchForm.valid) {
      return;
    }
    const searchTerm = this.searchForm.get('search')?.value;
    this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
  }

  logout(){
    this.loginService.logout();
  }

}
