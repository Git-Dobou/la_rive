import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../loging/user';
import { Category } from '../../models/category';
import { CategoryModel } from '../../models/categoryModel';
import { LoadingService } from '../loading/loading.service';
import { RequestService } from '../request/request.service';

@Injectable()
export class CategoryService {

  moduleCategories: BehaviorSubject<CategoryModel[]> = new BehaviorSubject([]);
  currentCategory: BehaviorSubject<CategoryModel> = new BehaviorSubject(new CategoryModel());
  principalCategory: BehaviorSubject<CategoryModel> = new BehaviorSubject(new CategoryModel());

  constructor(private http: HttpClient,
    private requestService: RequestService,
    private loadingService: LoadingService,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  getCategoryPrincipal() {
    this.requestService.get<CategoryModel>('category/get').subscribe(result => {
      this.principalCategory.next(result);
      this.selectCategory(this.principalCategory.value);
      this.loadingService.loading.next(false);
    },
      error => {
        console.error(error);
        this.loadingService.loading.next(false);
      });
  }

  selectCategory(category: CategoryModel) {
    this.currentCategory.next(category);
    var categories = this.moduleCategories.value;
    categories.push(category);

    this.moduleCategories.next(categories);
  }

  selectModuleCategory(category: CategoryModel) {
    var indexCurrent = this.moduleCategories.value.indexOf(this.currentCategory.value);
    var index = this.moduleCategories.value.indexOf(category);

    if (indexCurrent == index) {
      return;
    }

    var categories = this.moduleCategories.value;
    categories.splice(index + 1, this.moduleCategories.value.length - index + 1);
    this.moduleCategories.next(categories);
    this.currentCategory.next(this.moduleCategories.value[this.moduleCategories.value.length - 1])
  }
}
