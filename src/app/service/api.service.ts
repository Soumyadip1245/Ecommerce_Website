import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'
import { Product} from '../product'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http : HttpClient) { }
  getProduct(){
    return this.http.get<any>("https://soumyadip1245.github.io/products/products.json")
    .pipe(map((res:any)=>{
      return res;
    }))
   
    }
    viewProduct(id: string){
      const baseUrl="https://soumyadip1245.github.io/products/products.json/"+id;
      return this.http.get<Product>(baseUrl);
  }
}
