import { Component, Inject, OnInit } from '@angular/core';
import { MovieDetail } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movies-dialog',
  templateUrl: './movies-dialog.component.html',
  styleUrls: ['./movies-dialog.component.scss']
})
export class MoviesDialogComponent implements OnInit {

  movie: MovieDetail = {} as MovieDetail

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovieDetail
  ) { 
    this.movie = data
  }

  ngOnInit(): void {
  }

}
