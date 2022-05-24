import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AucTransactionItem } from '../../interfaces';


@Component({
  selector: 'auc-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: [ './transactions-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsListComponent {
  /**
   * Transactions list. <br>
   * It's required parameter.
   */
  @Input()
  public transactions: AucTransactionItem[];

  /**
   * Showed text if no transactions. <br>
   * It's an optional parameter. <br>
   * The default value is "Your transactions will appear here..."
   */
  @Input()
  public emptyText?: string = 'Your transactions will appear here...';

}
