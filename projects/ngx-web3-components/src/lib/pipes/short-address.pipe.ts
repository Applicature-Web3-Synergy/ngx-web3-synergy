import { Pipe, PipeTransform } from '@angular/core';

import { shortAddress, isTxHash, shortTxHash } from '../helpers';

@Pipe({
  name: 'shortAddress'
})

export class ShortAddressPipe implements PipeTransform {
  public transform(address: string): string {
    return isTxHash(address) ? shortTxHash(address) : shortAddress(address);
  }
}
