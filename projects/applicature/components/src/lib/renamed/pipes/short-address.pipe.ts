import { Pipe, PipeTransform } from '@angular/core';

import { shortAddress, isTxHash, shortTxHash } from '../../helpers';

@Pipe({
  name: 'shortAddress'
})
export class AucShortAddressPipe implements PipeTransform {
  public transform(address: string): string {
    return isTxHash(address) ? shortTxHash(address) : shortAddress(address);
  }
}
