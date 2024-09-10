import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SearchPipe]
})
export class SharedModule { }
