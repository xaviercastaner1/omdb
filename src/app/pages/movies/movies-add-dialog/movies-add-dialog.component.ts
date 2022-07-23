import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MovieDetail } from 'src/app/shared/interfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movies-add-dialog',
  templateUrl: './movies-add-dialog.component.html',
  styleUrls: ['./movies-add-dialog.component.scss']
})
export class MoviesAddDialogComponent implements OnInit {

  movie: MovieDetail = {} as MovieDetail

  separatorKeysCodes: number[] = [ENTER, COMMA];
  actorCtrl = new FormControl('');
  filteredActors: Observable<string[]>;
  actors: string[] = [];
  allActors: string[] = [];

  @Output() onAddMovie: EventEmitter<MovieDetail> = new EventEmitter()

  @ViewChild('actorInput') actorInput: ElementRef<HTMLInputElement>;

  constructor(public dialogRef: MatDialogRef<MoviesAddDialogComponent>) {
    this.filteredActors = this.actorCtrl.valueChanges.pipe(
      startWith(null),
      map((actor: string | null) => (actor ? this._filter(actor) : this.allActors.slice())),
    );
  }
  ngOnInit(): void {
    
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our actor
    if (value) {
      this.actors.push(value);
      this.movie.Actors = this.actors.join()
    }

    // Clear the input value
    event.chipInput!.clear();

    this.actorCtrl.setValue(null);
  }

  remove(actor: string): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.actors.push(event.option.viewValue);
    this.actorInput.nativeElement.value = '';
    this.actorCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allActors.filter(actor => actor.toLowerCase().includes(filterValue));
  }

  closeDialog() {
    this.dialogRef.close(JSON.stringify(this.movie));
  }

}
