import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/service/view.service';
import { CartService } from '../../service/cart.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
  public viewproduct : any = [];
  constructor(private cartService: CartService, private viewService : ViewService) { }

  ngOnInit(): void {
    this.viewService.getViewProducts().subscribe(res=>{
      this.viewproduct =res;
    })
  } 
  addtocart(item : any){
    this.cartService.addtoCart(item);
  }
  removeViewItem(item: any){
    this.viewService.removeViewItem(item);
  }
}

