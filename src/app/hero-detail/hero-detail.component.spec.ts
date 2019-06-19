import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

// describe('HeroDetailComponent', () => {
//   let component: HeroDetailComponent;
//   let fixture: ComponentFixture<HeroDetailComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ FormsModule, RouterModule, RouterTestingModule ],
//       declarations: [ HeroDetailComponent ],
//       providers: [ HttpClient, HttpHeaders, HttpHandler ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeroDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
