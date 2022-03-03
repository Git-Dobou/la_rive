import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
private loadingService: LoadingService) {
  }

  get<T>(api: string) {
    this.loadingService.loading.next(true);
    console.log('get: ' + this.baseUrl + api);
    return this.http.get<T>(this.baseUrl + api);
  }

  post<T>(api: string, content: any) {
    this.loadingService.loading.next(true);
    console.log('post: ' +  this.baseUrl + api);
    return this.http.post<T>(this.baseUrl + api, content);
  }
}
