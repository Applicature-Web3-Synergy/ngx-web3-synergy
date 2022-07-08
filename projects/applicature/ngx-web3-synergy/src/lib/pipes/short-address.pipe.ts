import { Pipe, PipeTransform } from '@angular/core';

import { w3sShortAddress, w3sIsTxHash, w3sShortTxHash } from '../helpers';

@Pipe({
  name: 'w3sShortAddress'
})
export class W3sShortAddressPipe implements PipeTransform {
  public transform(address: string): string {
    return w3sIsTxHash(address) ? w3sShortTxHash(address) : w3sShortAddress(address);
  }
}
