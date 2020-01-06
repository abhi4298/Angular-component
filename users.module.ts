import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared/modules';
import { NgxLoadingModule, ngxLoadingAnimationTypes  } from 'ngx-loading';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
    imports: [CommonModule, UsersRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.rotatingPlane,
            backdropBackgroundColour: 'rgba(1,1,1,0.5)',
            backdropBorderRadius: '4px' })],
    declarations: [UsersComponent, AdduserComponent, JwPaginationComponent]
})
export class UsersModule {}
