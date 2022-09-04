import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ViewService } from 'src/app/service/view.service';
import { ToastrService } from 'ngx-toastr';
declare let Swal: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList :  any;
  searchKey: string ="";
  public filterCategory : any;
  constructor(private api : ApiService, private cartService : CartService, private viewService : ViewService, private toastr: ToastrService) { }
  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }
  popUp(){
    console.log("alert")
    alert("Hi")
   }
  ngOnInit(): void {
   
    this.api.getProduct().subscribe(res=>{
      this.productList = res;
      this.filterCategory=res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total: a.price})
        // this.toastr.success('Hello world!', 'Toastr fun!');
      });
      console.log(this.productList)
    })
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey=val;
    })
  }
  addtocart(item : any){
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Added To Cart Successfully',
      showConfirmButton: false,
      timer: 1000,
      customClass: 'swal-modal'
    })
    
    console.log("checking alerts")
    this.cartService.addtoCart(item);
    
  }
 filter(category:string)
 {
  this.filterCategory=this.productList.filter((a:any)=>{

    if(a.category== category || category==''){
      return a;
    }
  })
 }
 addtoview(item: any){
  this.viewService.addtoView(item);
 }

}
