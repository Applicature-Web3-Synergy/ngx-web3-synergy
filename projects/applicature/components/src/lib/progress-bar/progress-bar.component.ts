import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'auc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [ './progress-bar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AucProgressBarComponent implements OnInit {
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

  ngOnInit(): void {
    this.calculateData();
  }

  private calculateData(): void {
    if (!this.progress) {
      this.progress = 0;
    }

    if (this.total === 0) {
      this.total = this.progress;
    } else if (!this.total) {
      this.total = 100;
    }

    if (this.progress > this.total) {
      this.progress = 100;
      this.total = 100;
    }

    this.progress = (this.progress / this.total) * 100;
  }
}
