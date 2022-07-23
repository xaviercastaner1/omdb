import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Movie, MovieDetail } from 'src/app/shared/interfaces';
import { MoviesService } from 'src/app/shared/movies.service';
import { MoviesAddDialogComponent } from './movies-add-dialog/movies-add-dialog.component';
import { MoviesDialogComponent } from './movies-dialog/movies-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'type', 'year']
  filteredMovies: Movie[] = [];
  error: boolean = false

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    if (!sessionStorage.getItem('movies')) {
      sessionStorage.setItem('movies', JSON.stringify([]))
    }
  }

  openDialog(id: string) {
    
    this.moviesService.getMovie(id)
      .subscribe((movie: MovieDetail) => {
        
        console.log('movie', movie)

        const dialogRef = this.dialog.open(MoviesDialogComponent, {
          data: movie
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      })
    
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(MoviesAddDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {

      console.log(`Dialog result: ${result}`);

      let sessionMovies = JSON.parse(sessionStorage.getItem('movies'))
      sessionMovies.push(result)
      sessionStorage.setItem('movies', JSON.stringify(sessionMovies))
    });
  }

  searchByTitle(title: string) {
    this.moviesService.getMovies(title)
      .subscribe((movies: any) => {

        console.log('movies', movies)

        if (movies.Error) {
          this.error = true

        } else {
          
          this.error = false
          this.filteredMovies = movies.Search

        }


      })
  }


}
