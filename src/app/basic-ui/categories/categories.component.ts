import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AllServices } from "../../AllServices.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  addcategory: FormGroup;
  updatecategory: FormGroup;
  Categories = [];
  selectedFile: File;
  SelectedCategory: any;
  UpdateNeededCategory: any;
  public readonly image_url = environment.ImgUrl;

  AddCategoryFormData: FormData = new FormData();
  UpdateCategoryFormData: FormData = new FormData();
  constructor(
    private fb: FormBuilder,
    private apiServices: AllServices,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.addcategory = this.fb.group({
      categoryName: [null, Validators.required],
    });

    this.updatecategory = this.fb.group({
      Id: [0],
      categoryName: [null, Validators.required],
    });

    this.GetAllCategories();
  }

  //here is the function needed to choose the selected image needed for upload for specific category
  holdFile: File[] = [];
  fileUploader(e: any): void {
    this.selectedFile = e.target.files[0];
    if (e.target.files.length > 0) {
      this.AddCategoryFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to choose a new image in case of update
  FileUploaderUpdate(e: any) {
    this.selectedFile = e.target.files[0];
    if (e.target.files.length > 0) {
      this.UpdateCategoryFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to open a modal responsible for adding a new category
  AddCategory(content) {
    this.modalService.open(content, { size: "xl" });
  }

  //here is the function needed to open a modal responsible for update an existing category
  CateogryImg: string;
  CategoryImgError: string;
  UpdateCategory(content, category) {
    this.UpdateNeededCategory = category.id;
    this.updatecategory.controls.categoryName.setValue(category.categoryName);
    if (category.categoryImage == null) {
      this.CategoryImgError =
        "There is no added image for the selected category";
    } else {
      this.CateogryImg = this.image_url + category.categoryImage;
    }
    this.modalService.open(content, { size: "xl" });
  }

  //here is the function needed to open a confirm modal responsible for show a message needed on delete a selected category
  ConfirmDelete(content, category) {
    this.SelectedCategory = category.id;
    this.modalService.open(content);
  }

  //here is the function needed to call an api needed to add a new category
  AddnewCategory() {
    for (const key in this.addcategory.value) {
      if (key != "File") {
        this.AddCategoryFormData.append(key, this.addcategory.value[key]);
      }
    }
    this.apiServices.PostMethod("Category", this.AddCategoryFormData).subscribe(
      (data) => {
        alert("Done add a new category");
        this.modalService.dismissAll();
        this.GetAllCategories();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to call an api needed to delete an existing category
  DeleteCategory() {
    this.apiServices.DeleteMethod("Category", this.SelectedCategory).subscribe(
      (data) => {
        this.GetAllCategories();
        this.modalService.dismissAll();
        alert("Done removing selected category");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to get all added categories
  GetAllCategories() {
    this.apiServices.GetMethod("Category").subscribe(
      (data: any) => {
        this.Categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to update the selected category
  UpdateSelectedCategory() {
    for (const key in this.updatecategory.value) {
      if (key != "File") {
        this.UpdateCategoryFormData.append(key, this.updatecategory.value[key]);
      }
    }
    this.apiServices
      .UpdateMethodWithPipe("Category", this.UpdateCategoryFormData)
      .subscribe(
        (data) => {
          this.modalService.dismissAll();
          this.GetAllCategories();
          alert("Done Update selected category");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to close the opened modal
  Closemodal() {
    this.modalService.dismissAll();
  }
}
