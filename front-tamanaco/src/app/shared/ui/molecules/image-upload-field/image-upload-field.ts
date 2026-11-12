import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'image-upload-field',
  imports: [],
  templateUrl: './image-upload-field.html',
  styleUrl: './image-upload-field.css',
})
export class ImageUploadField {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly initialPreview = input<string | null>(null);

  readonly fileSelected = output<File>();
  readonly fileRemoved = output<void>();

  readonly previewUrl = signal<string | null>(null);
  readonly isDragging = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  private readonly allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl.set(null);
    this.errorMessage.set(null);
    this.fileRemoved.emit();
  }

  private processFile(file: File): void {
    if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage.set('Solo se permiten archivos en formato .png o .jpeg/.jpg');
      return;
    }

    this.errorMessage.set(null);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
    };
    reader.readAsDataURL(file);

    this.fileSelected.emit(file);
  }
}
