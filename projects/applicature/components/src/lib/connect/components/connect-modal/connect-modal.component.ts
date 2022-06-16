import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'auc-connect-modal',
  templateUrl: './connect-modal.component.html',
  styleUrls: ['./connect-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucConnectModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
