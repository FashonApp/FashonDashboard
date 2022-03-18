import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Product } from "../../models/Product.interface";
import { Category } from "../../models/Category.interface";

import { AllServices } from "../../AllServices.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  addproduct: FormGroup;
  updateproduct: FormGroup;
  AllProducts: Product[];
  Categories: any = [];
  DeleteSelectedProductId: any;

  AddProductFormData: FormData = new FormData();

  selectedFile: File;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private apiServices: AllServices
  ) {}

  ngOnInit(): void {
    this.addproduct = this.formBuilder.group({
      Name: [null, Validators.required],
      Details: [null, Validators.required],
      CategoryId: [null, Validators.required],
      Quantity: [null, Validators.required],
      Price: [null, Validators.required],
      Sizes: [[]],
      // productImage: [null, Validators.required],
      // productSizes : [[] , Validators.required],
    });

    this.updateproduct = this.formBuilder.group({
      Name: [null, Validators.required],
      Details: [null, Validators.required],
      CategoryId: [null, Validators.required],
      Quantity: [null, Validators.required],
      Price: [null, Validators.required],
      Sizes: [[]],
    });

    this.GetAllProducts();
  }

  //here is the function needed to open a modal responsible for adding a new product
  Addnewproduct(content) {
    this.modalService.open(content, { size: "xl" });
    this.GetAllCategories();
  }

  //here is the function needed to open a modal needed for update the added product
  UpdateSelected(updatecontent) {
    this.modalService.open(updatecontent, { size: "xl" });
  }

  //here is the function needed to open a modal needed for confirm delete the added product
  DeleteSelected(content, products) {
    this.DeleteSelectedProductId = products.id;
    this.modalService.open(content);
  }

  //here is the function needed to upload a selected image needed for the product
  //here is the functionn needed to handle file upload
  holdFile: File[] = [];
  fileUploader(e: any): void {
    this.selectedFile = e.target.files[0];
    if (e.target.files.length > 0) {
      this.AddProductFormData.append("File", this.selectedFile);
    }
  }

  //here is the function needed to call an endpoint api responsible for Add a new product
  //this function body contains an object called body
  //the pre-defined object contains :
  AddProduct() {
    for (const key in this.addproduct.value) {
      if (key != "File") {
        this.AddProductFormData.append(key, this.addproduct.value[key]);
      }
    }
    this.apiServices.PostMethod("Product", this.AddProductFormData).subscribe(
      (data) => {
        alert("Done add a new Product");
        this.modalService.dismissAll();
        this.GetAllProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to call an endpoint api responsible for update a selected project
  //this endpoint api call must contain the id of the selected row needed to update
  //also this function needed the same object sent in add new product called body
  //the pre-defined object contains :
  UpdateProduct() {
    let body = {};

    //api call go here
  }

  //here is the function needed to call an endpoint api responsible for delete a selected project
  //this endpoint api call must contain the id of the selected row needed to delete
  DeleteProduct() {
    this.apiServices
      .DeleteMethod("Product", this.DeleteSelectedProductId)
      .subscribe(
        (data) => {
          alert("Done delete selected product");
          this.GetAllProducts();
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //here is the function needed to Get all added products
  //this function calls an endpoint api to get all added products
  GetAllProducts() {
    this.apiServices.GetMethod("Product").subscribe(
      (data: any) => {
        this.AllProducts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //here is the function needed to get all added categories
  //this function calls an endpoint api to get all added categories
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

  //here is the function needed to close an opened modal
  Closemodal() {
    this.modalService.dismissAll();
    this.addproduct.reset();
  }
}
