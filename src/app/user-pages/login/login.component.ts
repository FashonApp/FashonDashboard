import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AllServices } from "../../AllServices.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  //define the needed form to login
  LoginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: AllServices
  ) {}

  ngOnInit() {
    //initialise login form controls here
    this.LoginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  //here is the function needed to call an api and make correctly login operation
  //this login api needed a body , body instances :-
  //username , password
  //after succesfull login the user redirects to the main page for the dashbord
  //uses this line of code (this.router.navigateByUrl(['/']))
  //the previous line of code use an instance called router , this defines the navigation for the needed page
  //router instance called a function may take a single path or take a
  Login() {
    if (this.LoginForm.invalid) {
      alert("invalid form ");
    } else {
      let body = {
        username: this.LoginForm.controls.username.value,
        password: this.LoginForm.controls.password.value,
      };
      this.apiService.PostMethod("Users/Login", body).subscribe(
        (data) => {
          this.router.navigateByUrl("/dashboard");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
