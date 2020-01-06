import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
    {
        path: '', component: UsersComponent
    },
    {
        path: 'user', component: AdduserComponent
    },
    {
        path: 'user/:userid', component: AdduserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
