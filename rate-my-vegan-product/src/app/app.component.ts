import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rate-my-vegan-product';
  products: Observable<any>;
  postId;
  showProductList = true;
  showAddProductPage = false;
  showPrivateList = false;
  searchText;
  serverIp = 'https://blank42.de:3030/';
  privateProducts = [];
  productList = [];
  dissallowedProducts = [];
  checkedProductList = [];

  element: HTMLElement;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.getJsonData();
    try {
      this.dissallowedProducts = localStorage.getItem('removedList').split(',');
    } catch (error) {
    }
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  getJsonData() {
    const url = this.serverIp;
    fetch(url)
    .then(res => res.json())
    .then((out) => {
      console.log(out);
      this.products = out;
      this.checkedProductList = [];
      this.products.forEach(product => {
        product.file = 'https://blank42.de/RMVP-Pictures/' + product.file + '.png';
      });
      this.products.forEach(product => {
        if (!this.dissallowedProducts.includes(product._id)) {
          this.checkedProductList.push(product);
        }
      });
    })
    .catch(err => { throw err; });
  }

  sendJsonData(jsonData) {
    const data = JSON.stringify(jsonData);

    const httpOptions = {
      headers: ({
          'Content-Type': 'application/json',
      })
    };
    this.http.post(this.serverIp + 'newProduct', data, httpOptions)
    .subscribe(
        (val) => {
        console.log('POST call successful value returned in body',
                    val);
        },
        response => {
            console.log('POST call in error', response);
        },
        () => {
            console.log('The POST observable is now completed.');
        });
  }

  addProduct() {
    this.showProductList = false;
    this.showAddProductPage = true;
  }

  sendProduct() {
    const productName = (document.getElementById('productName') as HTMLInputElement).value;
    const productTyp = (document.getElementById('productTyp') as HTMLInputElement).value;
    const productInfo = (document.getElementById('productInfo') as HTMLInputElement).value;
    const file = (document.getElementById('pictureAdd') as HTMLInputElement).files[0];


    const reader = new FileReader();
    let url;

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      url = event.target.result;
      console.log(url);
      const data = {productName: productName, productTyp: productTyp, productInfo: productInfo, file: url};
      this.sendJsonData(data);
      this.showAddProductPage = false;
      this.showProductList = true;
      this.sleep(500).then(() => {
        this.getJsonData();
      });
    };
  }

  upvote(productId) {
    if (!localStorage.getItem(productId)) {
      localStorage.setItem(productId, 'Voted');
      const data = JSON.stringify({id: productId});
      const httpOptions = {
        headers: ({
            'Content-Type': 'application/json',
        })
      };
      this.http.post(this.serverIp + 'upvote', data, httpOptions)
      .subscribe(
          (val) => {
          console.log('POST call successful value returned in body', val);
          },
          response => {
              console.log('POST call in error', response);
          },
          () => {
              console.log('The POST observable is now completed.');
          });
      this.sleep(500).then(() => {
        this.getJsonData();
      });
    }
  }

  downvote(productId) {
    if (!localStorage.getItem(productId)) {
      localStorage.setItem(productId, 'Voted');
      const data = JSON.stringify({id: productId});
      const httpOptions = {
        headers: ({
            'Content-Type': 'application/json',
        })
      };
      this.http.post(this.serverIp + 'downvote', data, httpOptions)
      .subscribe(
          (val) => {
          console.log('POST call successful value returned in body', val);
          },
          response => {
              console.log('POST call in error', response);
          },
          () => {
              console.log('The POST observable is now completed.');
          });
      this.sleep(500).then(() => {
        this.getJsonData();
      });
    }
  }

  removeFromOnlineList(productId) {
      const data = JSON.stringify({id: productId});
      const httpOptions = {
        headers: ({
            'Content-Type': 'application/json',
        })
      };
      this.http.post(this.serverIp + 'remove', data, httpOptions)
      .subscribe(
          (val) => {
          console.log('POST call successful value returned in body', val);
          },
          response => {
              console.log('POST call in error', response);
          },
          () => {
              console.log('The POST observable is now completed.');
          });
      this.sleep(500).then(() => {
        this.getJsonData();
      });
  }

  remove(productId) {
    if (localStorage.getItem('removedList')) {
      let removedList = localStorage.getItem('removedList');
      removedList = removedList + productId + ',';
      localStorage.setItem('removedList', removedList);
      this.dissallowedProducts = localStorage.getItem('removedList').split(',');
      this.getJsonData();
    } else {
      localStorage.setItem('removedList', productId + ',');
      this.dissallowedProducts = localStorage.getItem('removedList').split(',');
      this.getJsonData();
    }
  }

}

