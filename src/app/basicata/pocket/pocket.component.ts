import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { AllServices } from "../../AllServices.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pocket",
  templateUrl: "./pocket.component.html",
  styleUrls: ["./pocket.component.scss"],
})
export class PocketComponent implements OnInit {
  AllPockets = [];
  addpocketform: FormGroup;
  updatepocketform: FormGroup;
  SelectedDeletedPocket: any;
  SelectedUpdatePocket: any;
  AddPocketFormData: FormData = new FormData();
  UpdatePocketFormData: FormData = new FormData();
  selectedFile: File;

  public readonly image_url = environment.ImgUrl;

  constructor(
    private fb: FormBuilder,
    private apiServices: AllServices,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.addpocketform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.updatepocketform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.GetAllPockets();
  }

  //here is the function needed to get all added pockets
  GetAllPockets() {
    this.apiServices.GetMethod("Pocket").subscribe(
      (data: any) => {
        this.AllPockets = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the functionn needed to handle file upload
  holdFile: File[] = [];
  fileUploader(e: any): void {
    this.selectedFile = e.target.files[0];
    if (e.target.files.length > 0) {
      this.AddPocketFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to open a modal needed to add a new pocket
  AddNewPocket(addnewpocket) {
    this.modalService.open(addnewpocket, { size: "xl" });
  }

  //here is the function needed to open a modal responsible for show a confirmation to delete the selected pocket
  DeleteSelected(deletecontent, selected_pocket) {
    this.SelectedDeletedPocket = selected_pocket.id;
    this.modalService.open(deletecontent);
  }

  //here is the function needed to open a modal responsible for update the selected pocket
  FabricImg: string;
  FabricImgError: string;
  UpdateSelected(updatecontent, selected_Fabric) {
    this.modalService.open(updatecontent, { size: "xl" });
    this.updatepocketform.controls.Title.setValue(selected_Fabric.title);
    this.updatepocketform.controls.Description.setValue(
      selected_Fabric.description
    );

    if (selected_Fabric.image == null) {
      this.FabricImgError = "There is no added image for the selected fabric";
    } else {
      this.FabricImg = this.image_url + selected_Fabric.image;
    }
  }

  //here is the function needed to call an api to add a new pocket
  AddPocket() {
    for (const key in this.addpocketform.value) {
      if (key != "File") {
        this.AddPocketFormData.append(key, this.addpocketform.value[key]);
      }
    }
    this.apiServices.PostMethod("Pocket", this.AddPocketFormData).subscribe(
      (data) => {
        alert("Done add a new pocket");
        this.modalService.dismissAll();
        this.GetAllPockets();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the fucntion needed to call an api to delete the selected pocket
  DeletePocket() {
    this.apiServices
      .DeleteMethod("Pocket", this.SelectedDeletedPocket)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllPockets();
          alert("Done delete selected pocket");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to call an api to update the selected fabric
  UpdatePocket() {
    //function body goes here
  }

  //here is the function needed to call an api close the modal
  Closemodal() {
    this.modalService.dismissAll();
  }
}
