import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItem: any;
  public searchTerm!:string;
  constructor(private cartService : CartService) { }
  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res=>{
      this.totalItem = res.length;
    })
  }
search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
console.log(this.searchTerm);
this.cartService.search.next(this.searchTerm);
}
}
