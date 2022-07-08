export const BasicTableCodeHtml = `<div class="doc-grid-container">
  <div class="full-width">
    <w3s-table [tableHeaders]="tableHeaders"
               [data]="tableData"
               [isLoadMore]="isLoadMore"
               customClass="table-custom-class"
               (loadMore)="loadMoreTable()"
               (sort)="tableSort($event)"
    >
    </w3s-table>
  </div>
</div>
`;
