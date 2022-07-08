/** Don't forget import { W3sTableModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { W3S_SORT_DIRECTION, W3sSort, W3sTableHeaderItem, W3sTableRow } from '@applicature/ngx-web3-synergy';

const TableData: W3sTableRow[] = [
  {
    action: {
      value: 'Withdraw',
      icon: 'assets/img/icons/minus-red.svg'
    },
    tokens: [
      {
        value: '1.240123',
        icon: 'assets/svg/network/eth.svg',
        withBg: true
      },
      {
        value: '5.2k',
        icon: 'assets/svg/coin/usdt.svg',
        withBg: true
      }
    ],
    value: {
      value: '$10.4k',
    },
    time: {
      value: 'about 6 hours ago ↗',
      link: 'https://www.google.com/'
    }
  },
  {
    action: {
      value: 'Withdraw',
      icon: 'assets/img/icons/minus-red.svg'
    },
    tokens: [
      {
        value: '1.0...01234',
        icon: 'assets/svg/network/eth.svg',
        withBg: true
      }
    ],
    value: {
      value: '$4.2k',
    },
    time: {
      value: 'about 6 hours ago ↗',
      link: 'https://www.google.com/'
    }
  },
  {
    action: {
      value: 'Invest',
      icon: 'assets/img/icons/plus-green.svg'
    },
    tokens: [
      {
        value: '500',
        icon: 'assets/svg/coin/usdt.svg',
        withBg: true
      }
    ],
    value: {
      value: '$500',
    },
    time: {
      value: 'about 6 hours ago ↗',
      link: 'https://www.google.com/'
    }
  },
  {
    action: {
      value: 'Invest',
      icon: 'assets/img/icons/plus-green.svg'
    },
    tokens: [
      {
        value: '1.240123',
        icon: 'assets/svg/network/eth.svg',
        withBg: true
      },
      {
        value: '5.2k',
        icon: 'assets/svg/coin/usdt.svg',
        withBg: true
      }
    ],
    value: {
      value: '$10.4k',
    },
    time: {
      value: 'about 6 hours ago ↗',
      link: 'https://www.google.com/'
    }
  },
];


@Component({
  selector: 'doc-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: [ './basic-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTableComponent {
  public tableHeaders: W3sTableHeaderItem[] = [
    {
      position: 1,
      rowKey: 'action',
      value: 'Action',
    },
    {
      position: 2,
      rowKey: 'tokens',
      value: 'Tokens',
    },
    {
      position: 3,
      rowKey: 'value',
      value: 'Value',
    },
    {
      position: 4,
      rowKey: 'time',
      value: 'Time',
      sort: {
        sortBy: 'time',
        sortDirection: W3S_SORT_DIRECTION.DESC
      }
    }
  ];
  public tableData: W3sTableRow[] = [ ...TableData ];
  public isLoadMore = true;

  loadMoreTable(): void {
    console.log('Table Load more clicked');

    this.isLoadMore = false;
    this.tableData = [
      ...this.tableData,
      {
        ...TableData[1],
        time: {
          value: 'about 6 hours ago ↗',
          link: 'https://www.google.com/'
        }
      }
    ]
  }

  tableSort(sort: W3sSort): void {
    console.log('Table sort action: ', sort);

    this.tableData = this.tableData.reverse();
  }

}
