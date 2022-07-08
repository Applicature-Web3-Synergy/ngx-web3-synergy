/** Don't forget import { W3sDialogModule } from '@applicature/ngx-web3-synergy'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  W3S_DIALOG_POSITIONS,
  W3sDialogConfig,
  W3sDialogRef,
  W3sDialogService,
  W3sDialogPosition
} from '@applicature/ngx-web3-synergy';


@Component({
  selector: 'doc-custom-dialog-view',
  template: `
    <div class="text-wrapper"><p>{{config.data.message}}</p></div>
    <div class="actions">
      <button type="button"
              class="doc-custom-btn"
              (click)="onClose('Close action value')">Close
      </button>
    </div>`,
  styles: [
    `:host {
      font-size: 64px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .text-wrapper {
      display: flex;
      flex: 1;
      align-content: center;
      justify-content: center;
      text-align: center;
    }

    .actions {
      & > * {
        width: 100%;
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDialogViewComponent {
  constructor(public config: W3sDialogConfig, private dialogRef: W3sDialogRef<string>) {
  }

  onClose(val): void {
    this.dialogRef.close(val);
  }

}


@Component({
  selector: 'doc-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: [ './custom-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDialogComponent {
  dialogPosition: FormControl = new FormControl(W3S_DIALOG_POSITIONS.CENTER);

  dialogPositionsList: W3sDialogPosition[] = [
    W3S_DIALOG_POSITIONS.CENTER,
    W3S_DIALOG_POSITIONS.BOTTOM,
    W3S_DIALOG_POSITIONS.LEFT,
    W3S_DIALOG_POSITIONS.RIGHT,
    W3S_DIALOG_POSITIONS.TOP,
    W3S_DIALOG_POSITIONS.TOP_LEFT,
    W3S_DIALOG_POSITIONS.TOP_RIGHT,
    W3S_DIALOG_POSITIONS.BOTTOM_LEFT,
    W3S_DIALOG_POSITIONS.BOTTOM_RIGHT
  ];

  constructor(private dialogService: W3sDialogService) {
  }

  showModal(): void {
    const ref = this.dialogService.open<CustomDialogViewComponent, { message: string }, number>(
      CustomDialogViewComponent,
      {
        data: { message: 'I am a dynamic component!' },
        width: '400px',
        height: '500px',
        minWidth: '320px',
        minHeight: '320px',
        maxWidth: '600px',
        maxHeight: '700px',
        position: this.dialogPosition.value,
        dialogClass: 'dialog-class-test',
        panel: {
          panelClass: 'panel-class-test'
        },
        overlay: {
          hasOverlay: true,
          closeByClick: true,
          overlayClass: [ 'test-overlay-class1', 'test-overlay-class2' ],
          transparent: false
        }
      });

    ref.afterClosed.subscribe(result => {
      console.log('Dialog closed: ', result);
    });

    ref.afterOpened.subscribe(result => {
      console.log('Dialog opened: ', result);
    });
  }

}
