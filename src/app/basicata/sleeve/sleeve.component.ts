import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AllServices } from "../../AllServices.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-sleeve",
  templateUrl: "./sleeve.component.html",
  styleUrls: ["./sleeve.component.scss"],
})
export class SleeveComponent implements OnInit {
  AllSleeves = [];
  addsleeveform: FormGroup;
  updatesleeveform: FormGroup;
  SelectedDeletedSleeve: any;
  SelectedUpdateSleeve: any;
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
    this.addsleeveform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.updatesleeveform = this.fb.group({
      Title: [null, Validators.required],
      Description: [null, Validators.required],
    });

    this.GetAllSleeves();
  }

  //here is the function needed to get all added fabrics
  GetAllSleeves() {
    this.apiServices.GetMethod("Sleeve").subscribe(
      (data: any) => {
        this.AllSleeves = data;
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

  //here is the function needed to open a modal needed to add a new sleeve
  AddNewSleeve(addnewsleeve) {
    this.modalService.open(addnewsleeve, { size: "xl" });
  }

  //here is the function needed to open a modal responsible for show a confirmation to delete the selected sleeve
  DeleteSelected(deletecontent, selected_Sleeve) {
    this.SelectedDeletedSleeve = selected_Sleeve.id;
    this.modalService.open(deletecontent);
  }

  //here is the function needed to open a modal responsible for update the selected fabric
  FabricImg: string;
  FabricImgError: string;
  UpdateSelected(updatecontent, selected_sleeve) {
    this.modalService.open(updatecontent, { size: "xl" });
    this.updatesleeveform.controls.Title.setValue(selected_sleeve.title);
    this.updatesleeveform.controls.Description.setValue(
      selected_sleeve.description
    );

    if (selected_sleeve.image == null) {
      this.FabricImgError = "There is no added image for the selected sleeve";
    } else {
      this.FabricImg = this.image_url + selected_sleeve.image;
    }
  }

  //here is the function needed to call an api to add a new sleeve
  AddSleeve() {
    for (const key in this.addsleeveform.value) {
      if (key != "File") {
        this.AddFabricFormData.append(key, this.addsleeveform.value[key]);
      }
    }
    this.apiServices.PostMethod("Sleeve", this.AddFabricFormData).subscribe(
      (data) => {
        alert("Done add a new sleeve");
        this.modalService.dismissAll();
        this.GetAllSleeves();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the fucntion needed to call an api to delete the selected sleeve
  DeleteFabric() {
    this.apiServices
      .DeleteMethod("Sleeve", this.SelectedDeletedSleeve)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllSleeves();
          alert("Done delete selected sleeve");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to call an api to update the selected sleeve
  UpdateSleeve() {
    //function body goes here
  }

  //here is the function needed to call an api close the modal
  Closemodal() {
    this.modalService.dismissAll();
  }
}
