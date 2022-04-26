export const BasicCopyToClipboardCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-copy-to-clipboard [value]="textToCopy"></auc-copy-to-clipboard>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom Size</h5>

    <auc-copy-to-clipboard value="Some text to copy" class="doc-ctc-custom-size"></auc-copy-to-clipboard>
  </div>
</div>
`;
