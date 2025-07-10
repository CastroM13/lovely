import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

  constructor(private imageService: ImageService, private storageService: StorageService) { }

  token = '';
  categories = [
    {
      title: "Café da Manhã",
      name: "BREAKFAST",
      icon: "🥞"
    },
    {
      title: "Jantar",
      name: "DINNER",
      icon: "🍽️"
    },
    {
      title: "Fitness",
      name: "FITNESS",
      icon: "💪"
    },
    {
      title: "Sobremesa",
      name: "DESSERT",
      icon: "🍮"
    },
    {
      title: "Drink",
      name: "DRINK",
      icon: "🍹"
    }
  ]

  async ngOnInit() {
    this.token = await this.storageService.getItem<string>('token') || '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.imageService.uploadImage(file).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error('Upload failed:', error),
      });
    }
  }

  onSearchChange(text: Event) {
    this.storageService.getItem<string>('token').then(token => this.token = token || '');
    console.log(text)
  }
}
