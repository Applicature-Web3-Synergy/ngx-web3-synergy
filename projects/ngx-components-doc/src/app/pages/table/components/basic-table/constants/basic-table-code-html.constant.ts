export const BasicTableCodeHtml = `<div class="doc-grid-container">
  <div class="full-width">
    <auc-table [tableHeaders]="tableHeaders"
               [data]="tableData"
               [isLoadMore]="isLoadMore"
               customClass="table-custom-class"
               (loadMore)="loadMoreTable()"
               (sort)="tableSort($event)"
    >
    </auc-table>
  </div>
</div>
`;
