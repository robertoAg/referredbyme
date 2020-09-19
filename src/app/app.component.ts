import { Component, Input } from '@angular/core';
import { originalOffers } from './../environments/constants';
import { Offer } from './models/offers';
import _ from 'lodash';
import { LinkService } from './services/link.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'referredbyme';
    pageOffers: Offer[];
    originalOffers: Offer[];
    databaseOffers: Offer[];
    error: string;
    newUrl: string;
    year: number = (new Date()).getFullYear();

    constructor(private linkService: LinkService) {
        this.pageOffers = originalOffers;
        this.originalOffers = _.cloneDeep(originalOffers);
        const url = window.location.href;
        if (url.indexOf('/c/') !== -1) {
            const code = url.substring(url.indexOf('/c/') + 3, url.indexOf('/c/') + 3 + 13);
            this.setOffersByCode(+code);
        }
    }

    setOffersByCode(code: number): void {
        console.log('code', code);
        this.linkService
            .get(code)
            .subscribe(
                val => {
                    console.log('Value emitted successfully', val);
                    if (val && val.data && val.data[0].offers) {
                        this.databaseOffers = val.data[0].offers;
                        this.pageOffers.forEach(o => {
                            const offerFound = this.databaseOffers.filter(offerDB => {
                                return offerDB.skuName === o.skuName;
                            });
                            if (offerFound.length) {
                                o.links = offerFound[0].links;
                            }
                        });
                    }
                },
                error => {
                    console.error('This line is never called ', error);
                },
                () => console.log('HTTP Observable completed...')
            );
    }

    getUrl(): void {
        // Tiene databaseOffers, comprueba que son iguales (no hubo cambios) > error
        // No tiene databaseOffers, comprueba que son iguales a las originales(no hubo cambios) > error
        if ((this.databaseOffers && this.areEqualsOffers(this.databaseOffers)) ||
            (!this.databaseOffers && this.areEqualsOffers(this.originalOffers))) {
            this.error = 'Change the editable links. Use at least one of your own referred links.';
        } else {
            this.error = '';
            const offers = this.pageOffers.map(o => {
                return { skuName: o.skuName, links: o.links }
            });
            this.linkService
                .post(offers)
                .subscribe(
                    val => {
                        console.log('Value emitted successfully', val);
                        this.newUrl = window.location.origin + '/c/' + val.data.code;
                    },
                    error => {
                        console.error('This line is never called ', error);
                    },
                    () => console.log('HTTP Observable completed...')
                );
        }
    }

    // TODO la logica debe comprobar que las ofertas de la base de datos sean iguales,
    // teniendo en cuenta que puedan tener una o varias ofertas, lo rellena con la original
    areEqualsOffers(offers): boolean {
        let areEquals = true;
        this.pageOffers.forEach(pageOffer => {
            let offerFound = offers.filter(offer => {
                return offer.skuName === pageOffer.skuName;
            });
            if (!offerFound.length) {
                offerFound = this.originalOffers.filter(offer => {
                    return offer.skuName === pageOffer.skuName;
                });
            }
            if (offerFound.length && pageOffer.links[0] !== offerFound[0].links[0]) {
                areEquals = false;
            }
        });
        return areEquals;
    }
}
