import { Component, OnInit } from '@angular/core';
import { FilminhoService } from '../services/filminho.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private filminhoService: FilminhoService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  auth(event: Event) {
    this.filminhoService.auth((event.target as HTMLInputElement).value).subscribe({
      next: (res) => {
        this.storageService.set('token', res.token);
        this.router.navigate(['/filminho'])
      }
    })
  }

}
