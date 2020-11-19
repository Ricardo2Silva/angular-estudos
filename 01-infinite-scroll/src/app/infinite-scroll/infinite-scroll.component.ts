import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, mapTo, scan, startWith, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { Bank } from './demo.data';
import { PeopleService } from './people.service';
import { Pessoa } from './pessoa.model';

/**
 * Based upon: https://stackblitz.com/edit/mat-select-search-with-infinity-scroll
 */
@Component({
  selector: 'app-infinite-scroll-example',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @ViewChild('matSelectInfiniteScroll', { static: true } )
  infiniteScrollSelect: MatSelect;

  /** list with all available data, mocks some sort of backend data source */
  peoples: Pessoa[] = [];

  /** control for the selected bank */
  bankCtrl: FormControl = new FormControl();

  /** control for the search input value */
  searchCtrl: FormControl = new FormControl();

  /** list of data corresponding to the search input */
  private filteredData$: Observable<Pessoa[]> = this.searchCtrl.valueChanges.pipe(
    startWith(''),
    map(searchKeyword => {
      if (!searchKeyword) {
        return this.peoples;
      }
      return this.peoples.filter((bank) =>
        bank.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      );
    })
  );

  /** number of items added per batch */
  batchSize = 5;

  private incrementBatchOffset$: Subject<void> = new Subject<void>();
  private resetBatchOffset$: Subject<void> = new Subject<void>();

  /** minimum offset needed for the batch to ensure the selected option is displayed */
  private minimumBatchOffset$: Observable<number> = combineLatest([
    this.filteredData$,
    this.searchCtrl.valueChanges
  ]).pipe(
    map(([filteredData, searchValue]) => {
      if (!this.searchCtrl.value && this.bankCtrl.value) {
        const index = filteredData.findIndex(bank => bank.name === this.bankCtrl.value);
        return index + this.batchSize;
      } else {
        return 0;
      }
    }),
    startWith(0)
  );

  /** length of the visible data / start of the next batch */
  private batchOffset$ = combineLatest([
    merge(
      this.incrementBatchOffset$.pipe(mapTo(true)),
      this.resetBatchOffset$.pipe(mapTo(false))
    ),
    this.minimumBatchOffset$
  ]).pipe(
    scan((batchOffset, [doIncrement, minimumOffset]) => {
      if (doIncrement) {
        return Math.max(batchOffset + this.batchSize, minimumOffset + this.batchSize);
      } else {
        return Math.max(minimumOffset, this.batchSize);
      }
    }, this.batchSize),
  );


  /** list of data, filtered by the search keyword, limited to the length accumulated by infinity scrolling */
  filteredBatchedData$: Observable<Pessoa[]> = combineLatest([
    this.filteredData$,
    this.batchOffset$
  ]).pipe(
    map(([filteredData, batchOffset]) => filteredData.slice(0, batchOffset))
  );

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.infiniteScrollSelect.openedChange.pipe(takeUntil(this.destroy$)).subscribe(opened => {
      // after opening, reset the batch offset
      if (opened) {
        this.resetBatchOffset$.next();
      }
    });
    this.peopleService.getPessoas().subscribe(data => this.peoples = data );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  /**
   * Load the next batch
   */
  getNextBatch(): void {
    this.incrementBatchOffset$.next();
  }

}
