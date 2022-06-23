import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AucTableHeaderItem,
  AucTableRow,
  AucSort,
  AUC_SORT_DIRECTION
} from '@applicature/components';

const TableData: AucTableRow[] = [
  {
    action: {
      value: 'Withdraw',
      icon: 'assets/svg/icons/minus-red.svg'
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
      icon: 'assets/svg/icons/minus-red.svg'
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
      icon: 'assets/svg/icons/plus-green.svg'
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
      icon: 'assets/svg/icons/plus-green.svg'
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
  selector: 'app-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleTableComponent {
  public tableHeaders: AucTableHeaderItem[] = [
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
        sortDirection: AUC_SORT_DIRECTION.DESC
      }
    }
  ];
  public tableData: AucTableRow[] = [...TableData];

  public isLoadMore = true;

  loadMoreTable(): void {
    console.log('LOAD MORE TABLE EVENT');

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

  tableSort(sort: AucSort): void {
    console.log('TABLE SORT ACTION: ', sort);

    this.tableData = this.tableData.reverse();
  }

}
