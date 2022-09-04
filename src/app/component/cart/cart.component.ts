import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/service/cart.service';
declare let Swal: any;
declare let timerInterval: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products : any = []
  public grandTotal !: number ;
  constructor(private cartService : CartService, private router: Router) { }
  paymentpopup(){
    console.log("Hello testing")
    // alert("Hi")
    Swal.fire({
      title: 'Your Order Has Been Placed Successfully',
      imageUrl: 'https://cdn.dribbble.com/users/143127/screenshots/2475556/media/3d00af4a31c2902aea8bc05b0e1dbdde.gif',
      imageWidth: 400,
      imageHeight: 250,
      imageAlt: 'Custom image',
      
      customClass: 'swal-buywide',
      
      showConfirmButton: false,
      // timer: 4000,
      html: 'This will close in 4 seconds.',
      timer: 4000,
    
    
    })
  }
  ngOnInit(): void {
    this.cartService.getProduct().subscribe(res=>{
      this.products=res;
      console.log("Product going in cart: ",this.products)
      this.grandTotal=this.cartService.getTotalPrice();
      this.TotalCart();
    })
  }
  removeItem(item: any){
    console.log('Remove: ',this.products)
    
   this.cartService.removeCartItem(item);
}
  emptyCart(){
    this.cartService.removeAllCart();
  }
  cartNumber:number=0;
  cartNumberFunc(){
    var cartValue=JSON.parse(localStorage.getItem('localCart')||'{}');
    this.cartNumber=cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }
  // inc(id: any,quantity: any){
    
  //   console.log(id);
  //   console.log(quantity);
  // }
  // dec(item: any){
  //   item.quantity = item.quantity-1;
   
  //   console.log("Decreement: ",item.quantity)
  // }
  incQnt(id: any, quantity: any){
    // item.quantity = item.quantity+1;
    console.log(id);
    console.log(quantity);
    for(let i =0;i<this.products.length;i++){
      if(this.products[i].id===id){
        this.products[i].quantity=parseInt(quantity) + 1;
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.products));
    this.cartNumberFunc();
    this.TotalCart();
  }
  decQnt(id: any, quantity: any){
    // item.quantity = item.quantity+1;
    console.log(id);
    console.log(quantity);
    for(let i =0;i<this.products.length;i++){
      if(this.products[i].id===id){
        if(quantity!=1){
          this.products[i].quantity=parseInt(quantity) - 1;
        }
        
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.products))
    this.TotalCart();
  }
  total: number=0;
 TotalCart(){
    if(localStorage.getItem('localCart')){
      this.products=JSON.parse(localStorage.getItem('localCart')|| '{}');
      this.total = this.products.reduce(function(acc: any,val: any){
        return acc+(val.price*val.quantity)
      },0)
    }
  }
  removeall(){
    console.log("Remove testing")
    localStorage.removeItem('localCart');
    this.products=[];
    this.total=0;
    this.cartNumberFunc();
    localStorage.clear();
    this.emptyCart();
    
  }
  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.products=JSON.parse(localStorage.getItem('localCart')||'{}');
    }
  }
  singledelete(item: any){
    
    console.log(item);
    console.log('Remove: ',this.products);
    // console.log("-->",this.cartService.removeCartItem(item))
    if(localStorage.getItem('localCart')){
      this.products=JSON.parse(localStorage.getItem('localCart')|| '{}');
      for(let i =0;i<this.products.length;i++){
        if(this.products[i].id===item){
          this.products.splice(i,1);
          // this.removeItem(item);

          localStorage.setItem('localCart', JSON.stringify(this.products));
          
          // window.localStorage.clear();
          // this.cartService.removeCartItem(item);
          // this.TotalCart();
         
          
          
        }
      }
      this.TotalCart();
    }
  }
}
