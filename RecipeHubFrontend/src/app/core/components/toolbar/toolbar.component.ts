import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../features/user/services/login.service';
import {jwtDecode} from 'jwt-decode';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../services/user.service';
import { throwError } from 'rxjs';
import { UtilsService } from '../../../shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ToolbarService } from './toolbar.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatMenuModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private userService: UserService,
    private utilsService: UtilsService,
    private toolbarService: ToolbarService,
    private router: Router
  ){
  }


  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.minLength(1), Validators.required, Validators.pattern(/^\S.*$/)])
  });

  userProfileImageUrl?: string;
  isHidden: boolean = false;
  lastScrollTop: number = 0;
  isLogged: boolean = false;
  user: any;

  ngOnInit() {
    this.loginService.logged().subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
      if (this.isLogged) {
        this.userService.getUserDetailsFromToken()?.subscribe(
          data => {
            this.user = data;
            this.userProfileImageUrl = 'http://localhost:3000/user/user-profile-image/' + this.user.user_profile_image
          }
        );
      }
    });

  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = document.documentElement.scrollTop;

    if(scrollTop > this.lastScrollTop){
      this.isHidden = true;
    }else{
      this.isHidden = false;
    }

    this.lastScrollTop = scrollTop;

  }


  openMenu(){
    this.dialog.open(MenuComponent, {
      disableClose: true,
      panelClass: 'menu-panel'
    });
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchTerm = this.searchForm.get('search')?.value;
    this.router.navigate(['/search'], { queryParams: { q: searchTerm } });
  }

}
