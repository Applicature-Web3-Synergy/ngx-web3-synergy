
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { W3sTransactionItem } from '../../interfaces';

@Component({
  selector: 'w3s-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sTransactionItemComponent {
  /**
   * Transaction item. <br>
   * It's required parameter.
   */
  @Input()
  public transaction!: W3sTransactionItem;
}
