import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private route: Router) { }

  onSubmit(){
    // console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if(res.success){
        this.route.navigate(['/home']);
      }
    })
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
  }

}
