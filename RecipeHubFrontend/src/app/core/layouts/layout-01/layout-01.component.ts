import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { HomeComponent } from '../../../features/home/home.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterState } from '@angular/router';
import { UtilsService } from '../../../shared/services/utils.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-01',
  standalone: true,
  imports: [ToolbarComponent, HomeComponent, RouterModule],
  templateUrl: './layout-01.component.html',
  styleUrl: './layout-01.component.scss'
})
export class Layout01Component {

  currentRoute: string = '';
  showToolbar: boolean = true;
  noToolbarRoutes = [
    RegExp('/login'),
    RegExp('/signup'),
  ];

  constructor(private utilsService: UtilsService, private router: Router) {}

  ngOnInit(): void {
    this.utilsService.getCurrentRoute().subscribe(route => {
      this.currentRoute = route;
      this.showToolbar = this.noToolbarRoutes.every(route => this.currentRoute.match(route) === null);
    });

  }

}
