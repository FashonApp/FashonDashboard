import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollarComponent } from "./collar/collar.component";
import { FabricComponent } from "././fabric/fabric.component";
import { SleeveComponent } from "././sleeve/sleeve.component";
import { PocketComponent } from "././pocket/pocket.component";
import { SleevehemComponent } from "././sleevehem/sleevehem.component";
import { Routes, RouterModule } from "@angular/router";

import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "fabric", component: FabricComponent },
  { path: "pocket", component: PocketComponent },
  { path: "sleeve", component: SleeveComponent },
  { path: "sleevehem", component: SleevehemComponent },
  { path: "collar", component: CollarComponent },
];
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [
    CollarComponent,
    FabricComponent,
    SleeveComponent,
    PocketComponent,
    SleevehemComponent,
  ],
})
export class BasicataModule {}
