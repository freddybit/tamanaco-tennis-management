import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadField } from './image-upload-field';

describe('ImageUploadField', () => {
  let component: ImageUploadField;
  let fixture: ComponentFixture<ImageUploadField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUploadField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
