import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'applicature-progress-bar',
  templateUrl: './applicature-progress-bar.component.html',
  styleUrls: ['./applicature-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicatureProgressBarComponent implements OnInit {
  @Input() progress: number;
  @Input() total: number = 100;

  ngOnInit(): void {
    this.caclulateData();
  }

  private caclulateData(): void {
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
