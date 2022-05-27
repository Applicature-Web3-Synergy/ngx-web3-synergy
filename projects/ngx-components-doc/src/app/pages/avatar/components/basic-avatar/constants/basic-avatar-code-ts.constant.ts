export const BasicAvatarCodeTs =
  `/** Don't forget import { AucAvatarModule } from '@applicature/components'; to your module */

import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'doc-basic-avatar',
  templateUrl: './basic-avatar.component.html',
  styleUrls: ['./basic-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAvatarComponent {

}
`;
