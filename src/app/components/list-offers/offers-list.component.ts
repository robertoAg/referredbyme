import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offers';

@Component({
    selector: 'app-offers-list',
    templateUrl: './offers-list.component.html',
    styleUrls: ['./offers-list.component.scss']
})

export class OffersListComponent implements OnInit, OnChanges {

    @Input() offers: Array<Offer>;
    @Input() newUrl: string;

    constructor() {
    }
    ngOnInit(): void {
        console.warn(this.offers);
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.warn(changes);
    }

    edit(offer): void{
        this.offers.forEach(o => {
            if (o.id !== offer.id){
                o.editing = false;
            }
        });
        offer.editing = !offer.editing;
    }

    compareFn(c1: any, c2: any): boolean {
        return (c1._id && c2._id) ? c1._id === c2._id : c1._id === c2._id;
    }
}
