import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { W3sTransactionItem } from '../../interfaces';


@Component({
  selector: 'w3s-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: [ './transactions-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class W3sTransactionsListComponent {
  /**
   * Transactions list. <br>
   * It's required parameter.
   */
  @Input()
  public transactions: W3sTransactionItem[];

  /**
   * Showed text if no transactions. <br>
   * It's an optional parameter. <br>
   * The default value is "Your transactions will appear here..."
   */
  @Input()
  public emptyText?: string = 'Your transactions will appear here...';

}
