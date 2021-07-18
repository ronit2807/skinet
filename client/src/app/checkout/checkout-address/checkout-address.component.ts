import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styles: [
  ]
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  constructor(private accountService:AccountService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe(
      ()=>{
        console.log(1222);
        this.toastr.success('Address saved');
      },error => {
        this.toastr.error(error.Message);
        console.log(error);
      }
    )
  }

}
