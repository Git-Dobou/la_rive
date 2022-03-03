import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogingService } from '../services/loging/loging.service';
import { ModuleService } from '../services/module/module.service';
import { User } from './user';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
})

export class LogingComponent {

  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(public logingService: LogingService,
    private moduleService: ModuleService,
    private router: Router) {

  }

  onFormSubmit(): void {
    console.log('UserName:' + this.userForm.get('userName').value);
    var user = new User();
    user.userName = this.userForm.get('userName').value;
    user.password = this.userForm.get('password').value;
    this.logingService.getUser(user);
  }
}
