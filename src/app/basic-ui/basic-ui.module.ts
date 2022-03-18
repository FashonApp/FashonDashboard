import { CategoriesComponent } from "./categories/categories.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductsComponent } from "./products/products.component";
import { OrdersComponent } from "./orders/orders.component";

import { NotificationsComponent } from "./notifications/notifications.component";

const routes: Routes = [
  // { path: "accordions", component: AccordionsComponent },
  // { path: "buttons", component: ButtonsComponent },
  // { path: "badges", component: BadgesComponent },
  // { path: "breadcrumbs", component: BreadcrumbsComponent },
  // { path: "dropdowns", component: DropdownsComponent },
  // { path: "dropdowns", component: DropdownsComponent },
  // { path: "modals", component: ModalsComponent },
  // { path: "progressbar", component: ProgressbarComponent },
  // { path: "pagination", component: PaginationComponent },
  // { path: "tabs", component: TabsComponent },
  // { path: "tooltips", component: TooltipsComponent },
  // { path: "typography", component: TypographyComponent },
  // { path: "notifications", component: NotificationsComponent },

  { path: "products", component: ProductsComponent },
  { path: "orders", component: OrdersComponent },
  { path: "categories", component: CategoriesComponent },
];

@NgModule({
  declarations: [ProductsComponent, OrdersComponent, CategoriesComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class BasicUiModule {}
