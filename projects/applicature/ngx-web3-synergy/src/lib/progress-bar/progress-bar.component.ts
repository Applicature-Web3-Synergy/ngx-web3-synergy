import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'auc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [ './progress-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucProgressBarComponent implements OnInit, OnChanges {
  /**
   * Sets progress value. <br>
   * It's required parameter.
   */
  @Input()
  public progress!: number;

  /**
   * Sets total value for the progress. <br>
   * You might never use it. <br>
   * It's an optional parameter. <br>
   * The default value is 100.
   */
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input()
  public total: number = 100;

  /** @internal */
  private _progressVal: number;

  /** Returns current progress value */
  public get currentProgress(): number {
    return this._progressVal;
  }

  /** @internal */
  ngOnInit(): void {
    this.calculateData();
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.total?.firstChange || !changes.progress?.firstChange) {
      this.calculateData();
    }
  }

  /** @internal */
  private calculateData(): void {
    if (!this.progress) {
      this._progressVal = 0;
    }

    if (this.total === 0) {
      this.total = this.progress;
    } else if (!this.total) {
      this.total = 100;
    }

    if (this.progress > this.total) {
      this.progress = this.total;
    }

    this._progressVal = (this.progress / this.total) * 100;
  }
}
