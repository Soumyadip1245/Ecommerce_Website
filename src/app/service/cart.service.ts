import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductsComponent } from '../component/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);
  public  search = new BehaviorSubject<string>("");
  cartSubject = new Subject<any>();
  http: any;

  constructor( ) { }
  getProduct(){
    return this.productList.asObservable();
  }
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
    localStorage.setItem('localCart',JSON.stringify(this.cartItemList))
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal = grandTotal+a.price*a.quantity;
    })
    return grandTotal;
  }
  removeCartItem(product : any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }

  
    
  }

