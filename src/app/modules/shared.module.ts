import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { QueryPipe } from '../pipes/query.pipe';



@NgModule({
  declarations: [SearchPipe, QueryPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SearchPipe, QueryPipe]
})
export class SharedModule { }
