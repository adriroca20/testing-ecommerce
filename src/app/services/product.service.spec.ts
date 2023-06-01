import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductService } from './product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let httpClientMock: HttpClientTestingModule;

  const PRODUCTS = [
    {
      "productId": 84,
      "productSku": "vivi",
      "productName": "samsung pro 13",
      "productPrice": 23000.0,
      "productShortName": "smpro13",
      "productDescription": "basic info",
      "createdDate": "2023-05-09T21:36:58.447",
      "deliveryTimeSpan": "4days", "categoryId": 2,
      "productImageUrl": "https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM",
      "categoryName": "Laptop"
    },
    {
      "productId": 85,
      "productSku": "vivi",
      "productName": "samsung pro 13",
      "productPrice": 23000.0,
      "productShortName": "smpro13",
      "productDescription": "basic info",
      "createdDate": "2023-05-09T21:36:58.447",
      "deliveryTimeSpan": "4days", "categoryId": 2,
      "productImageUrl": "https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM",
      "categoryName": "Laptop"
    },
    {
      "productId": 86,
      "productSku": "vivi",
      "productName": "samsung pro 13",
      "productPrice": 23000.0,
      "productShortName": "smpro13",
      "productDescription": "basic info",
      "createdDate": "2023-05-09T21:36:58.447",
      "deliveryTimeSpan": "4days", "categoryId": 2,
      "productImageUrl": "https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM",
      "categoryName": "Laptop"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents()
  })
  beforeEach(() => {
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController)
    httpClientMock = TestBed.inject(HttpClientTestingModule);
  })
  afterEach(() => {
    jest.resetAllMocks();
    httpMock.verify();
  })
  it("Should create", () => {
    expect(service).not.toBeTruthy();
  })
  it("getAllProducts receives all products", () => {
    const URL = "http://onlinetestapi.gerasim.in/api/Ecomm/GetAllProducts";

    service.getAllProducts().subscribe((data) => {
      expect(data).toEqual(PRODUCTS);
    })

    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe("GET");
    req.flush(PRODUCTS);
  })
  it("addToCart adds a product to the cart", () => {
    const product = PRODUCTS[0];
    const URL = "http://onlinetestapi.gerasim.in/api/Ecomm/AddToCart";
    service.addToCart(product).subscribe((data)=>{
      expect(data).toBeTruthy();
    })
    const req = httpMock.expectOne(URL);

    expect(req.request.method).toBe("POST");
  })
  it("getCartItemsByCustId returns a product using the customer id given", () => {
    const URL = "http://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id=1";
    service.getCartItemsByCustId(1).subscribe((data)=>{
      expect(data).toEqual(PRODUCTS);
    })
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe("GET");
    //Hace que la request devuelva los PRODUCTS o error si no funciona
    //Solo es necesario en los GET
    req.flush(PRODUCTS);
  })

});
