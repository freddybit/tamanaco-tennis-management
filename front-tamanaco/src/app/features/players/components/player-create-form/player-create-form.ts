import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SelectOption,
  SelectField,
} from '../../../../shared/ui/molecules/select-field/select-field';
import { FormField } from '../../../../shared/ui/molecules/form-field/form-field';
import { ImageUploadField } from '../../../../shared/ui/molecules/image-upload-field/image-upload-field';
import { CreatePlayerPayload } from '../../../../shared/models/player.model';
import { PlacesService } from '../../../../shared/services/place.service';
import { TennisCategoriesService } from '../../../../shared/services/tennis-category.service';
import { ClubService } from '../../../../shared/services/club.service';

@Component({
  selector: 'player-create-form',
  imports: [FormField, SelectField, ReactiveFormsModule, ImageUploadField],
  templateUrl: './player-create-form.html',
  styleUrl: './player-create-form.css',
})
export class PlayerCreateForm implements OnInit {
  private readonly clubsService = inject(ClubService);
  private readonly placesService = inject(PlacesService);
  private readonly tennisCategoriesService = inject(TennisCategoriesService);

  readonly clubOptions = signal<SelectOption[]>([]);
  readonly countryOptions = signal<SelectOption[]>([]);
  readonly stateOptions = signal<SelectOption[]>([]);
  readonly cityOptions = signal<SelectOption[]>([]);
  readonly rankingOptions = signal<SelectOption[]>([]);
  readonly categoryOptions = signal<SelectOption[]>([]);

  readonly formSubmit = output<CreatePlayerPayload>();
  readonly formCancel = output<void>();

  readonly sexOptions: SelectOption[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
  ];

  readonly docTypeOptions: SelectOption[] = [
    { label: 'V - Venezolano', value: 'V' },
    { label: 'E - Extranjero', value: 'E' },
    { label: 'J - Jurídico', value: 'J' },
    { label: 'P - Pasaporte', value: 'P' },
  ];

  readonly form = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    secondName: new FormControl<string | null>(null),
    firstLastname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    secondLastname: new FormControl<string | null>(null),
    birthday: new FormControl<string | null>(null),
    sex: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    identityDocuments: new FormGroup({
      type: new FormControl('V', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      docNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),

    emails: new FormArray([
      new FormGroup({
        username: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        atSymbol: new FormControl('@', { nonNullable: true }),
        domainName: new FormControl('gmail.com', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    ]),

    rankingKey: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    tennisCategory_catKey: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),

    phones: new FormArray([
      new FormGroup({
        areaCode: new FormControl('+58', { nonNullable: true }),
        operatorCode: new FormControl('414', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        phoneNumber: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    ]),

    countryKey: new FormControl<number | null>(1),
    stateKey: new FormControl<number | null>(null),
    place_placeKey: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),

    photoOne: new FormControl<string | null>(null),
    photoTwo: new FormControl<string | null>(null),

    clubsKeys: new FormArray([
      new FormControl<number | null>(null, {
        validators: [Validators.required],
      }),
    ]),
  });

  ngOnInit(): void {
    this.loadInitialCatalogs();
    this.setupCascadeListeners();
  }

  private loadInitialCatalogs(): void {
    this.clubsService.getOptions().subscribe({
      next: (opts) => this.clubOptions.set(opts),
      error: (err) => console.error('Error cargando clubes:', err),
    });

    this.tennisCategoriesService.getRankingOptions().subscribe({
      next: (opts) => this.rankingOptions.set(opts),
      error: (err) => console.error('Error cargando rankings:', err),
    });

    this.placesService.findAll().subscribe({
      next: (places) => {
        const countries = places
          .filter((p) => !p.place_placeKey)
          .map((p) => ({
            label: p.name,
            value: p.placeKey,
          }));

        this.countryOptions.set(countries);

        const currentCountry = this.form.get('countryKey')?.value;
        if (currentCountry) {
          this.loadStates(Number(currentCountry));
        }
      },
      error: (err) => console.error('Error cargando países:', err),
    });
  }

  private setupCascadeListeners(): void {
    this.form.get('countryKey')?.valueChanges.subscribe((countryId) => {
      this.form.get('stateKey')?.reset(null, { emitEvent: false });
      this.form.get('place_placeKey')?.reset(null, { emitEvent: false });
      this.stateOptions.set([]);
      this.cityOptions.set([]);

      if (countryId) {
        this.loadStates(Number(countryId));
      }
    });

    this.form.get('stateKey')?.valueChanges.subscribe((stateId) => {
      this.form.get('place_placeKey')?.reset(null, { emitEvent: false });
      this.cityOptions.set([]);

      if (stateId) {
        this.placesService.getOptionsByParent(Number(stateId)).subscribe({
          next: (cities) => this.cityOptions.set(cities),
          error: (err) => console.error('Error cargando ciudades:', err),
        });
      }
    });

    // Cascada Ranking -> Categorías
    this.form.get('rankingKey')?.valueChanges.subscribe((rankingId) => {
      this.form.get('tennisCategory_catKey')?.reset(null, { emitEvent: false });
      this.categoryOptions.set([]);

      if (rankingId) {
        this.tennisCategoriesService.getCategoryOptions(Number(rankingId)).subscribe({
          next: (categories) => this.categoryOptions.set(categories),
          error: (err) => console.error('Error cargando categorías:', err),
        });
      }
    });
  }

  private loadStates(countryId: number): void {
    this.placesService.getOptionsByParent(countryId).subscribe({
      next: (states) => this.stateOptions.set(states),
      error: (err) => console.error('Error cargando estados:', err),
    });
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  getControl(path: string): FormControl {
    return this.form.get(path) as FormControl;
  }

  getEmailControl(index: number, name: string): FormControl {
    return this.emails.at(index).get(name) as FormControl;
  }

  getPhoneControl(index: number, name: string): FormControl {
    return this.phones.at(index).get(name) as FormControl;
  }

  addEmail(): void {
    this.emails.push(
      new FormGroup({
        username: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        domainName: new FormControl('gmail.com', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    );
  }

  removeEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  addPhone(): void {
    this.phones.push(
      new FormGroup({
        areaCode: new FormControl('+58', { nonNullable: true }),
        operatorCode: new FormControl('412', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        phoneNumber: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    );
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  get clubs(): FormArray {
    return this.form.get('clubsKeys') as FormArray;
  }

  getClubControl(index: number): FormControl {
    return this.clubs.at(index) as FormControl;
  }

  addClub(): void {
    this.clubs.push(
      new FormControl<number | null>(null, {
        validators: [Validators.required],
      }),
    );
  }

  removeClub(index: number): void {
    if (this.clubs.length > 1) {
      this.clubs.removeAt(index);
    }
  }

  onPhotoSelected(field: 'photoOne' | 'photoTwo', file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.form.get(field)?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onPhotoRemoved(field: 'photoOne' | 'photoTwo'): void {
    this.form.get(field)?.setValue(null);
  }

  onSubmit(): void {
    console.log('Form status:', this.form.status);
    console.log('Form values:', this.form.value);

    if (this.form.invalid) {
      console.warn('Formulario inválido. Errores por control:');
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control?.invalid) {
          console.warn(`Control inválido -> ${key}:`, control.errors);
        }
      });
      this.form.markAllAsTouched();
      return;
    }

    console.log('Formulario válido. Enviando datos...');

    const formValue = this.form.getRawValue();

    const payload: CreatePlayerPayload = {
      firstName: formValue.firstName,
      secondName: formValue.secondName,
      firstLastname: formValue.firstLastname,
      secondLastname: formValue.secondLastname,
      birthday: formValue.birthday ? (formValue.birthday as unknown as Date) : null,
      sex: formValue.sex,
      place_placeKey: formValue.place_placeKey,
      photoOne: formValue.photoOne,
      photoTwo: formValue.photoTwo,
      identityDocuments: formValue.identityDocuments,
      emails: formValue.emails,
      phones: formValue.phones,
      tennisCategoriesKeys: formValue.tennisCategory_catKey
        ? [Number(formValue.tennisCategory_catKey)]
        : [],
      clubsKeys: formValue.clubsKeys
        ? formValue.clubsKeys.filter((id): id is number => id !== null).map(Number)
        : [],
    };

    this.formSubmit.emit(payload);
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
