import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'auc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [ './progress-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucProgressBarComponent implements OnInit, OnChanges {
  /**
   * {@link progress} - It's an `@Input()` parameter.
   * Sets progress value.
   * This is required parameter.
   */
  @Input() progress!: number;

  /**
   * {@link total} - It's an `@Input()` parameter.
   * Sets total value for the progress.
   * You might never use it.
   * This is an optional parameter. The default value is 100.
   */
  @Input() total: number = 100;

  private _progressVal: number;

  get currentProgress(): number {
    return this._progressVal;
  }

  ngOnInit(): void {
    this.calculateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.total?.firstChange || !changes.progress?.firstChange) {
      this.calculateData();
    }
  }

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
