import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  public viewItemList: any=[]
  public viewproductList = new BehaviorSubject<any>([]);
  constructor() { }
  getViewProducts(){
    return this.viewproductList.asObservable();
  }
  setViewProduct(viewproduct: any){
    this.viewItemList.push(...viewproduct);
    this.viewproductList.next(viewproduct);
  }
  addtoView(viewproduct:any){
    this.viewItemList.push(viewproduct);
    this.viewproductList.next(this.viewItemList);
    console.log('ViewProduct: ',this.viewItemList)
  }
  removeViewItem(viewproduct:any){
    this.viewItemList.map((a:any, index:any)=>{
      if(viewproduct.id ===a.id){
        this.viewItemList.splice(index,1)
      }
    })
  }
}
