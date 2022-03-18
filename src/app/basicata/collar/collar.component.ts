import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { environment } from "../../../environments/environment";
import { AllServices } from "../../AllServices.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-collar",
  templateUrl: "./collar.component.html",
  styleUrls: ["./collar.component.scss"],
})
export class CollarComponent implements OnInit {
  AllCollars = [];
  selectedFile: File;
  addcollarform: FormGroup;
  updatecollarform: FormGroup;
  SelectedDeletedFabric: any;
  SelectedUpdateFabric: any;

  AddCollarFormData: FormData = new FormData();
  UpdateCollarFormData: FormData = new FormData();

  public readonly image_url = environment.ImgUrl;

  constructor(
    private fb: FormBuilder,
    private apiServices: AllServices,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.addcollarform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.updatecollarform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.GetAllCollars();
  }

  //here is the functionn needed to handle file upload
  holdFile: File[] = [];
  fileUploader(e: any): void {
    this.selectedFile = e.target.files[0];
    if (e.target.files.length > 0) {
      this.AddCollarFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to get all the added collars
  GetAllCollars() {
    this.apiServices.GetMethod("Collar").subscribe(
      (data: any) => {
        this.AllCollars = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to open a modal to add a new collar
  AddNewCollar(addnewcollar) {
    this.modalService.open(addnewcollar, { size: "xl" });
  }

  //here is the function needed to open a modal to update the selected collar

  CollarImg: string;
  CollarImgError: string;
  UpdateSelected(updatecontent, selected_collar) {
    this.SelectedUpdateFabric = selected_collar.id;
    this.modalService.open(updatecontent);
    this.updatecollarform.controls.Title.setValue(selected_collar.title);
    this.updatecollarform.controls.Description.setValue(
      selected_collar.description
    );

    if (selected_collar.image == null) {
      this.CollarImgError = "There is no added image for the selected fabric";
    } else {
      this.CollarImg = this.image_url + selected_collar.image;
    }
  }

  //here is the function needed to open a modal to confirm delete selected collar
  DeleteSelected(deletecontent, selected_collar) {
    this.SelectedDeletedFabric = selected_collar.id;
    this.modalService.open(deletecontent, { size: "xl" });
  }

  //here is the function needed to call an api to add a new collar
  AddCollar() {
    for (const key in this.addcollarform.value) {
      if (key != "File") {
        this.AddCollarFormData.append(key, this.addcollarform.value[key]);
      }
    }
    this.apiServices.PostMethod("Collar", this.AddCollarFormData).subscribe(
      (data) => {
        alert("Done add a new collar");
        this.modalService.dismissAll();
        this.GetAllCollars();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to call an api to delete the selected collar
  DeleteCollar() {
    this.apiServices
      .DeleteMethod("Collar", this.SelectedDeletedFabric)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllCollars();
          alert("Done delete selected collar");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to call an api to update the selected collar
  UpdateCollar() {
    //function body go here
  }

  //here is the function needed to close the opened modals
  Closemodal() {
    this.modalService.dismissAll();
  }
}
