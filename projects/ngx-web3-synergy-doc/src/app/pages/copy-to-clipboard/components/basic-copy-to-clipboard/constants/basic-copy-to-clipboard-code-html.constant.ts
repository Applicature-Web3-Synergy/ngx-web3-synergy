export const BasicCopyToClipboardCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <w3s-copy-to-clipboard [value]="textToCopy" (action)="copied($event)"></w3s-copy-to-clipboard>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom Size</h5>

    <w3s-copy-to-clipboard value="Some text to copy"
                           class="doc-ctc-custom-size"
                           (action)="copied($event)"
    >
    </w3s-copy-to-clipboard>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Custom</h5>

    <div class="doc-custom-copy"
         w3sCopyToClipboard
         textToCopy="Custom copy to clipboard"
         (action)="copied($event)"
    >
      Click to copy
    </div>
  </div>
</div>
`;
