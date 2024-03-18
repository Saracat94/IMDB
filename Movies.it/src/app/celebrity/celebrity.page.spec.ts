import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { CelebrityPage } from './celebrity.page';

describe('CelebrityPage', () => {
  let component: CelebrityPage;
  let fixture: ComponentFixture<CelebrityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CelebrityPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CelebrityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
