import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AllServices } from "../../AllServices.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-fabric",
  templateUrl: "./fabric.component.html",
  styleUrls: ["./fabric.component.scss"],
})
export class FabricComponent implements OnInit {
  AllFabrics = [];
  addfabricform: FormGroup;
  updatefabricform: FormGroup;
  SelectedDeletedFabric: any;
  SelectedUpdateFabric: any;
  AddFabricFormData: FormData = new FormData();
  UpdateFabricFormData: FormData = new FormData();
  selectedFile: File;

  public readonly image_url = environment.ImgUrl;

  constructor(
    private fb: FormBuilder,
    private apiServices: AllServices,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.addfabricform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.updatefabricform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.GetAllFabrics();
  }

  /**
   * Title
   * Description
   * File
   */

  //here is the function needed to get all added fabrics
  GetAllFabrics() {
    this.apiServices.GetMethod("Fabric").subscribe(
      (data: any) => {
        this.AllFabrics = data;
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
      this.AddFabricFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to open a modal needed to add a new fabric
  AddNewFabric(addnewfabric) {
    this.modalService.open(addnewfabric, { size: "xl" });
  }

  //here is the function needed to open a modal responsible for show a confirmation to delete the selected fabric
  DeleteSelected(deletecontent, selected_Fabric) {
    this.SelectedDeletedFabric = selected_Fabric.id;
    this.modalService.open(deletecontent);
  }

  //here is the function needed to open a modal responsible for update the selected fabric
  FabricImg: string;
  FabricImgError: string;
  UpdateSelected(updatecontent, selected_Fabric) {
    this.modalService.open(updatecontent, { size: "xl" });
    this.updatefabricform.controls.Title.setValue(selected_Fabric.title);
    this.updatefabricform.controls.Description.setValue(
      selected_Fabric.description
    );

    if (selected_Fabric.image == null) {
      this.FabricImgError = "There is no added image for the selected fabric";
    } else {
      this.FabricImg = this.image_url + selected_Fabric.image;
    }
  }

  //here is the function needed to call an api to add a new fabric
  AddFabric() {
    for (const key in this.addfabricform.value) {
      if (key != "File") {
        this.AddFabricFormData.append(key, this.addfabricform.value[key]);
      }
    }
    this.apiServices.PostMethod("Fabric", this.AddFabricFormData).subscribe(
      (data) => {
        alert("Done add a new fabric");
        this.modalService.dismissAll();
        this.GetAllFabrics();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the fucntion needed to call an api to delete the selected fabric
  DeleteFabric() {
    this.apiServices
      .DeleteMethod("Fabric", this.SelectedDeletedFabric)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllFabrics();
          alert("Done delete selected fabric");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to call an api to update the selected fabric
  UpdateFabric() {
    //function body goes here
  }

  //here is the function needed to call an api close the modal
  Closemodal() {
    this.modalService.dismissAll();
  }
}
