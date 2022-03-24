import { Pipe, PipeTransform } from '@angular/core';

import { aucShortAddress, aucIsTxHash, aucShortTxHash } from '../helpers';

@Pipe({
  name: 'aucShortAddress'
})
export class AucShortAddressPipe implements PipeTransform {
  public transform(address: string): string {
    return aucIsTxHash(address) ? aucShortTxHash(address) : aucShortAddress(address);
  }
}
