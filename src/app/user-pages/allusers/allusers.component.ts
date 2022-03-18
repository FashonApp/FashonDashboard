import { User } from "./../../models/User.interface";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AllServices } from "../../AllServices.service";

@Component({
  selector: "app-allusers",
  templateUrl: "./allusers.component.html",
  styleUrls: ["./allusers.component.scss"],
})
export class AllusersComponent implements OnInit {
  adduserForm: FormGroup;
  updateuserform: FormGroup;
  passwordConfirmed: boolean;
  AllUsers = [];
  Allroles = [];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private apiServices: AllServices
  ) {}

  ngOnInit(): void {
    this.Allroles = [
      {
        id: true,
        name: "isAdmin",
      },
      {
        id: false,
        name: "User",
      },
    ];
    this.adduserForm = this.formBuilder.group({
      Username: [null, Validators.required],
      Firstname: [null, Validators.required],
      Middlename: [null, Validators.required],
      Lastname: [null, Validators.required],
      phonenumber: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}"),
        ],
      ],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    });

    this.updateuserform = this.formBuilder.group({
      Username: [null, Validators.required],
      Firstname: [null, Validators.required],
      Middlename: [null, Validators.required],
      Lastname: [null, Validators.required],
      phonenumber: [null, Validators.required],
      password: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}"),
        ],
      ],
    });
    this.GetAllUsers();
  }

  //here is the function needed to open a modal needed to add a new user
  AddUserAdminmodal(content) {
    this.modalService.open(content, { size: "xl" });
  }

  //here is the function needed to open a modal to update the selected
  //this function is responsible for set the data in form fields
  //this function also take two parameters : first parameter name as content , second parameter name as selected_item
  //selected_item parameter : an object carries all instances for the selected row
  SelectedUpdateUser: any;
  UpdateSelected(content, selected_user) {
    this.SelectedUpdateUser = selected_user.id;
    this.updateuserform.controls.Username.setValue(selected_user.username);
    this.updateuserform.controls.Firstname.setValue(selected_user.firstName);
    this.updateuserform.controls.Middlename.setValue(selected_user.middleName);
    this.updateuserform.controls.Lastname.setValue(selected_user.lastName);
    this.updateuserform.controls.phonenumber.setValue(selected_user.phone);
    this.updateuserform.controls.email.setValue(selected_user.email);
    this.updateuserform.controls.password.setValue(selected_user.password);
    this.modalService.open(content, { size: "xl" });
  }

  //here is the function needed to call an api to add a new user admin
  Sumbitnewuser() {
    let body = {
      Username: this.adduserForm.controls.Username.value,
      Email: this.adduserForm.controls.email.value,
      Password: this.adduserForm.controls.password.value,
      FirstName: this.adduserForm.controls.Firstname.value,
      LastName: this.adduserForm.controls.Lastname.value,
      MiddleName: this.adduserForm.controls.Middlename.value,
      Phone: this.adduserForm.controls.phonenumber.value,
      IsAdmin: true,
    };
    this.apiServices.PostMethod("Users", body).subscribe(
      (data) => {
        this.modalService.dismissAll();
        alert("Done add a new admin user");
        this.GetAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to check for the confirm password and password if there are the same
  //if not gives an error
  checkPassword() {
    if (
      this.adduserForm.controls.passwordConfirm.value ==
      this.adduserForm.controls.password.value
    ) {
      this.passwordConfirmed = false;
    } else {
      this.passwordConfirmed = true;
    }
  }

  //here is the function needed to open a modal needed to show a confirm modal on delete a seelcted
  //this function parameter needed to take a content as a parameter to pass it to the open function
  //open function is called by an instance for the modal service
  SelectedUser: User;
  DeleteSelected(content, selected_user) {
    this.SelectedUser = selected_user.id;
    this.modalService.open(content);
  }

  //here is the function needed to call an api resposible for update
  //this function call an endpoint api needed that update the selected data
  ConfirmUpdate() {
    let body = {
      Id: this.SelectedUpdateUser,
      Username: this.updateuserform.controls.Username.value,
      Email: this.updateuserform.controls.email.value,
      Password: this.updateuserform.controls.password.value,
      FirstName: this.updateuserform.controls.Firstname.value,
      LastName: this.updateuserform.controls.Lastname.value,
      MiddleName: this.updateuserform.controls.Middlename.value,
      Phone: this.updateuserform.controls.phonenumber.value,
      IsAdmin: true,
    };
    this.apiServices.UpdateMethodWithPipe("Users", body).subscribe(
      (data) => {
        alert("Done update selected user");
        this.modalService.dismissAll();
        this.GetAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to open a modal needed to update the selected

  //here is the function needed to call an api to delete the selected user
  //the endpoint api needed takes the selected user id needed to be deleted
  ConfirmDeleteSelected() {
    this.apiServices.DeleteMethod("Users", this.SelectedUser).subscribe(
      (data) => {
        this.modalService.dismissAll();
        this.GetAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to get all added users as admins
  GetAllUsers() {
    console.log("get function is fired");
    this.apiServices.GetMethod("Users").subscribe(
      (data: any) => {
        this.AllUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to close the modal needed to add a new user admin
  Closemodal() {
    this.modalService.dismissAll();
    this.adduserForm.reset();
  }
}
