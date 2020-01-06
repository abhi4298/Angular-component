import { UsersService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsersModule } from './users.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
  items: any;
  public loading = true;
  constructor(
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    this.loading = true;
    (await this.usersService.listUsers())
      .subscribe(data => { this.items = data.data; this.loading = false; }, e => { this.loading = false; });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.items = pageOfItems;
  }
}
