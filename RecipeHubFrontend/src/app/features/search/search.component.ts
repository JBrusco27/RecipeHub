import { Component } from '@angular/core';
import { ToolbarService } from '../../core/components/toolbar/toolbar.service';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { Form, FormGroup } from '@angular/forms';
import { UtilsService } from '../../shared/services/utils.service';
import { RecipePreviewComponent } from '../../shared/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    RecipePreviewComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchTerm: string | null = null;
  items: any[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private route: ActivatedRoute,
    readonly utilService: UtilsService
  ){}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      this.toolbarService.search(this.searchTerm + '').subscribe(
        (data: any) => {
          this.items = data;
        }
      )
    });



  }

}
