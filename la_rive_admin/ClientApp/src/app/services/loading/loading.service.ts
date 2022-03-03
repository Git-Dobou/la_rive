import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../loging/user';
import { RequestService } from '../request/request.service';

@Injectable()
export class LoadingService {

  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }
}
