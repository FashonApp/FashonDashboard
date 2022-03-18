import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AllServices } from "../../AllServices.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-sleevehem",
  templateUrl: "./sleevehem.component.html",
  styleUrls: ["./sleevehem.component.scss"],
})
export class SleevehemComponent implements OnInit {
  public readonly image_url = environment.ImgUrl;
  addSleevehemform: FormGroup;
  updateSleevehemform: FormGroup;
  SelectedDeletedSleeveHem: any;
  selectedFile: File;
  AddSleeveHemFormData: FormData = new FormData();
  UpdateSleeveHemFormData: FormData = new FormData();

  AllSleeveHem = [];
  constructor(
    private fb: FormBuilder,
    private apiServices: AllServices,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.addSleevehemform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.updateSleevehemform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.GetAllSleeveHem();
  }

  //here is the function needed to get all added sleevehems
  GetAllSleeveHem() {
    this.apiServices.GetMethod("SleeveHem").subscribe(
      (data: any) => {
        this.AllSleeveHem = data;
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
      this.AddSleeveHemFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to open a modal needed to add a new sleevehem
  AddNewSleeveHem(addnewsleevehem) {
    this.modalService.open(addnewsleevehem, { size: "xl" });
  }

  //here is the function needed to open a modal responsible for show a confirmation to delete the selected sleevehem
  DeleteSelected(deletecontent, selected_SleeveHem) {
    this.SelectedDeletedSleeveHem = selected_SleeveHem.id;
    this.modalService.open(deletecontent);
  }

  //here is the function needed to call an api to add a new sleevehem
  AddSleeveHem() {
    for (const key in this.addSleevehemform.value) {
      if (key != "File") {
        this.AddSleeveHemFormData.append(key, this.addSleevehemform.value[key]);
      }
    }
    this.apiServices
      .PostMethod("SleeveHem", this.AddSleeveHemFormData)
      .subscribe(
        (data) => {
          alert("Done add a new fabric");
          this.modalService.dismissAll();
          this.GetAllSleeveHem();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the fucntion needed to call an api to delete the selected sleevehem
  DeleteSleeveHem() {
    this.apiServices
      .DeleteMethod("SleeveHem", this.SelectedDeletedSleeveHem)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllSleeveHem();
          alert("Done delete selected sleevehem");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to open a modal responsible for update the selected fabric
  FabricImg: string;
  FabricImgError: string;
  UpdateSelected(updatecontent, selected_Fabric) {
    this.modalService.open(updatecontent, { size: "xl" });
    this.updateSleevehemform.controls.Title.setValue(selected_Fabric.title);
    this.updateSleevehemform.controls.Description.setValue(
      selected_Fabric.description
    );

    if (selected_Fabric.image == null) {
      this.FabricImgError = "There is no added image for the selected fabric";
    } else {
      this.FabricImg = this.image_url + selected_Fabric.image;
    }
  }

  //here is the function needed to call an api to update the selected fabric
  UpdateSleeveHem() {
    //function body goes here
  }

  //here is the function needed to call an api close the modal
  Closemodal() {
    this.modalService.dismissAll();
  }
}
