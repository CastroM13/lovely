import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MovieMetaData } from 'src/app/interfaces/metadata';
import { FilminhoService } from 'src/app/services/filminho.service';
import { stringToHexColor } from 'src/app/utils';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private route: ActivatedRoute
  ) { }

  metadata?: MovieMetaData;
  tab = 'progress';
  curr = '0';
  rating = 0;
  get star() {
    return Math.floor(this.rating / 2)
  }
  get half() {
    return ((this.rating / 2) % 1) * 2
  }
  get nega() {
    return Math.floor((10 - this.rating) / 2)
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.metadata = await lastValueFrom(this.filminhoService.getMediaMetadata(id))
  }

  getRandomColor(genre: string) {
    return stringToHexColor(genre)
  }

  millisecondsToTimeString(milliseconds: string) {
    const totalSeconds = Math.floor(parseInt(milliseconds) / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return timeString;
}

  convertMinutesToMilliseconds(min: string): number {
    const minutes = parseInt(min, 10);

    const milliseconds = minutes * 60 * 1000;

    return milliseconds;
  }

  convertMinutesToTimeString(min: string) {
    const minutes = parseInt(min, 10);

    const hours = Math.floor(minutes / 60);
    const minutesRemaining = minutes % 60;
    const seconds = 0;

    const timeString = `${hours}:${minutesRemaining.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return timeString;
  }

}
