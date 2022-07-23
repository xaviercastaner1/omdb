import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Output() movieEmitter: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  viewMovie() {
    this.movieEmitter.emit(this.movie.imdbID)
  }

}
