import { ProductService } from "../../services/product.service";
import { SaleComponent } from "./sale.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Subject, of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("Sales component test", ()=>{
    let component:SaleComponent;
    let service:ProductService;
    let fixture:ComponentFixture<SaleComponent>;
    const PRODUCTS ={
        data:[
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
    } 
    const sale={
        result:true
    }
    const carSubj={
        next: (x:boolean)=> null
    } as any;
    const ProductServiceMock = {
        cartAddedSubject: carSubj,
        getCartItemsByCustId: (id:any)=> of(PRODUCTS),
        removeCartItemById: ()=>of(sale),
        makeSale: ()=>of(sale)
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //Es importante usar el testing module para que no se realicen llamadas a la API reales
                HttpClientTestingModule,
            ],
            declarations: [
                SaleComponent
            ],
            providers: [
                {
                    provide:ProductService,
                    useValue:ProductServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    })
    beforeEach(() => {
        fixture = TestBed.createComponent(SaleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(ProductService);
    })
    afterEach(()=>{
        fixture.destroy();
        jest.resetAllMocks();
    })
    it("Should create", ()=>{
        expect(component).toBeTruthy();
    })
    it("loadCart gets the total price", ()=>{
        const spy = jest.spyOn(service, "getCartItemsByCustId");
        component.loadCart();
        expect(spy).toBeCalled();
        expect(component.subTotal).toBeGreaterThan(0);
    })
    it("RemoveItem removes an item with given id", ()=>{
        const spy = jest.spyOn(service, "removeCartItemById");
        const spy2 = jest.spyOn(component, "loadCart");
        component.RemoveItem(85);
        expect(spy).toBeCalled();
        expect(spy2).toBeCalled();
    })
    it("makeSale makes the sale", ()=>{
        const spy = jest.spyOn(service, "makeSale");
        const spy2 = jest.spyOn(component, "loadCart");
        component.makeSale();
        expect(spy).toBeCalled();
        expect(spy2).toBeCalled();
    })
})