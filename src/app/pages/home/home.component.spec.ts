import { ProductService } from '../../services/product.service';
import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('Home component test', () => {
    let component: HomeComponent;
    let service: ProductService;
    let fixture: ComponentFixture<HomeComponent>;
    const PRODUCTS = {
        data: [
            {
                productId: 84,
                productSku: 'vivi',
                productName: 'samsung pro 13',
                productPrice: 23000.0,
                productShortName: 'smpro13',
                productDescription: 'basic info',
                createdDate: '2023-05-09T21:36:58.447',
                deliveryTimeSpan: '4days',
                categoryId: 2,
                productImageUrl:
                    'https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM',
                categoryName: 'Laptop',
            },
            {
                productId: 85,
                productSku: 'vivi',
                productName: 'samsung pro 13',
                productPrice: 23000.0,
                productShortName: 'smpro13',
                productDescription: 'basic info',
                createdDate: '2023-05-09T21:36:58.447',
                deliveryTimeSpan: '4days',
                categoryId: 2,
                productImageUrl:
                    'https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM',
                categoryName: 'Laptop',
            },
            {
                productId: 86,
                productSku: 'vivi',
                productName: 'samsung pro 13',
                productPrice: 23000.0,
                productShortName: 'smpro13',
                productDescription: 'basic info',
                createdDate: '2023-05-09T21:36:58.447',
                deliveryTimeSpan: '4days',
                categoryId: 2,
                productImageUrl:
                    'https://www.google.com/search?q=laptop+images&rlz=1C1VDKB_enIN1054IN1054&oq=lap&aqs=chrome.0.69i59j69i57j0i131i433i512j0i433i512l2j0i131i433i512l3j0i131i433i457i512j0i402i650.4272j0j7&sourceid=chrome&ie=UTF-8#imgrc=w4U_xuvfd4VhGM',
                categoryName: 'Laptop',
            },
        ],
    };

    const ProductServiceMock = {
        getAllProducts: () => of(PRODUCTS),
        addToCart: () => {},
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //Es importante usar el testing module para que no se realicen llamadas a la API reales
                HttpClientTestingModule,
            ],
            declarations: [HomeComponent],
            providers: [
                {
                    provide: ProductService,
                    useValue: ProductServiceMock,
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(ProductService);
    });

    it('Should create', () => {
        expect(component).toBeTruthy();
    });
    it('addItemToCart should add an item to the cart', () => {
        const spy = jest.spyOn(service, 'addToCart').mockImplementation(() => of(PRODUCTS));
        component.addItemToCart(12);
        expect(spy).toHaveBeenCalled();
    });
    it('loadAllProducts should get all products', () => {
        component.loadAllProducts();
        expect(component.productList).toEqual(PRODUCTS.data);
    });
    // loadAllProducts() {
    //     this.productService.getAllProducts().subscribe((result: any)=>{
    //       this.productList = result.data;
    //     })
    //   }
});
