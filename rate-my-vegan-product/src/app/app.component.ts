import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rate-my-vegan-product';
  products: Observable<any>;
  postId;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getJsonData();
    this.sendJsonData("test");
  }

  getJsonData() {
    let url = 'http://localhost:3000/';
    fetch(url)
    .then(res => res.json())
    .then((out) => {
      console.log(out)
      this.products = out;      
    })
    .catch(err => { throw err });
  }

  sendJsonData(newProduct) {
    const data = JSON.stringify(newProduct)
    const httpOptions = {
      headers: ({
          'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    this.http.post("http://localhost:3000/newProduct", data, httpOptions)
    .subscribe(
        (val) => {
        console.log("POST call successful value returned in body", 
                    val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }
}

