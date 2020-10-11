import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offers';
import { originalOffers } from './../../../environments/constants';
import _ from 'lodash';

@Component({
    selector: 'app-offers-list',
    templateUrl: './offers-list.component.html',
    styleUrls: ['./offers-list.component.scss']
})

export class OffersListComponent implements OnInit, OnChanges {

    @Input() offers: Array<Offer>;
    @Input() newUrl: string;
    originalOffers: Offer[];

    constructor() {
        this.originalOffers = _.cloneDeep(originalOffers);
    }
    ngOnInit(): void {
        console.warn(this.offers);
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.warn(changes);
    }

    validate(offer, of): void{
        const originalOffer = this.originalOffers.find(o => {
            return o.skuName === offer.skuName;
        });
        if (offer.links[0].includes(originalOffer.validation, 0) && offer.links[0].length < 70){
            offer.isValid = true;
        }else{
            offer.links[0] = originalOffer.validation;
            offer.isValid = false;
        }
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
