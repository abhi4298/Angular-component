import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from './../../bs-component/components/alert/alert.component';
import { GlobalService } from './../../../service/global.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  item = {
    userid: '',
    name: '',
    phone: '',
    email: '',
    designation: '',
    alternateEmail: '',
    alternatePhone: '',
    officePhone: '',
    companyName: '',
    userRole: '',
    companyId: '',
    officeLocation: '',
    image: ''
  };
  isDisabled = false;
  addUserForm = new FormGroup({
    id: new FormControl(this.item.userid),
    name: new FormControl(this.item.name, Validators.required),
    phone: new FormControl(this.item.phone, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(this.item.email, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    designation: new FormControl(this.item.designation, Validators.required),
    alternateEmail: new FormControl(this.item.alternateEmail, Validators.required),
    alternatePhone: new FormControl(this.item.alternatePhone, Validators.required),
    officePhone: new FormControl(this.item.officePhone, Validators.required),
    companyName: new FormControl(this.item.companyName, Validators.required),
    userRole: new FormControl(this.item.userRole, Validators.required),
    companyId: new FormControl(this.item.companyId, Validators.required),
    officeLocation: new FormControl(this.item.officeLocation, Validators.required),
    image: new FormControl(this.item.image, Validators.required)
  });
  submitted = false;
  data: any;
  loading = false;
  errorShow = false;
  apiError = '';
  formType = 1;
  isReadOnly = false;
  buttonShow = false;
  editButton = true;
  makeEditButton = true;
  passwordShow = true;
  emailEdit = false;
  nameEdit = false;
  isData = true;

  constructor(
    private globalService: GlobalService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    if (this.route.snapshot.params.userid) {
      this.loading = true;
      this.formType = 2;
      this.isReadOnly = true;
      this.buttonShow = true;
      this.makeEditButton = false;
      this.passwordShow = false;
      this.emailEdit = true;
      this.nameEdit = true;
      (await this.globalService.getUser({ userId: this.route.snapshot.params.userid }))
        .subscribe(data => {
          this.item = data.data;
          this.addUserForm.patchValue({ 'id': this.route.snapshot.params.userid });
          this.isDisabled = true;
          this.addUserForm.patchValue(this.item);
          this.addUserForm.get('password').disable();
          this.loading = false;
        },
          e => {
            this.loading = false;
            this.errorShow = true;
            this.apiError = 'No data found';
            this.makeEditButton = true;
            this.isData = false;
          });
    }
  }

  get f() { return this.addUserForm.controls; }

  makeFormEditable() {
    this.makeEditButton = true;
    this.editButton = false;
    this.isReadOnly = false;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  addUser() {
    if (this.formType === 1) {        // add user
      this.submitted = true;
      if (this.addUserForm.invalid) {
        return;
      }
      this.loading = true;
      this.data = JSON.stringify(this.addUserForm.value, null, 4);
      this.globalService.addUser(this.addUserForm.value)
        .subscribe(data => {
          if (data) {
            this.loading = false;
            this.router.navigate(['users']);
          } else {
            this.loading = false;
          }
        }, e => {
          this.loading = false;
          this.errorShow = true;
          this.apiError = e;
        });
    } else if (this.formType === 2) {         // edit user
      this.submitted = true;
      if (this.addUserForm.invalid) {
        return;
      }
      this.loading = true;
      this.data = JSON.stringify(this.addUserForm.value, null, 4);
      this.addUserForm.value.id = this.route.snapshot.params.userid;
      this.globalService.editUser(this.addUserForm.value)
        .subscribe(data => {
          if (data) {
            this.loading = false;
            this.router.navigate(['users']);
          } else {
            this.loading = false;
          }
        }, e => {
          this.loading = false;
          this.errorShow = true;
          this.apiError = e;
        });
    }
  }

}
