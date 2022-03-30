import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AucEtherscanTransactionLocalStorage } from '../../../interfaces';


@Component({
  selector: 'auc-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: [ './transactions-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucTransactionsListComponent {
  /**
   * {@link transactions} - It's an `@Input()` parameter. <br>
   * Sets transactions list. <br>
   * This is required parameter.
   */
  @Input()
  public transactions: AucEtherscanTransactionLocalStorage[];

  /**
   * {@link emptyText} - It's an `@Input()` parameter. <br>
   * Sets text if no transactions. <br>
   * This is an optional parameter. The default value is "Your transactions will appear here..."
   */
  @Input()
  public emptyText?: string = 'Your transactions will appear here...';

}
