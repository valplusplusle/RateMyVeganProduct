import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rate-my-vegan-product';
  products: Observable<any>;
  
  constructor() { }

  ngOnInit(): void {
    this.getJsonData();
  }

  getJsonData() {
    let url = 'http://localhost:3000/';
    fetch(url)
    .then(res => res.json())
    .then((out) => {
      this.products = out["products"];      
    })
    .catch(err => { throw err });
  }
}
