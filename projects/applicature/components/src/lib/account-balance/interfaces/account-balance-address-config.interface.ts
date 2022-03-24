import { AsColorGroup } from '@applicature/styles';

import { AucIdenticonPosition } from '../../directives';

export interface AucAccountBalanceAddressConfig {
  /**
   * {@link disabled} - Whether the address button is disabled. <br>
   * It's an optional parameter. The default value is false. <br>
   */
  disabled?: boolean;

  /**
   * {@link showIdenticon} - It's an `@Input()` parameter. <br>
   * Show or hide account address identicon. <br>
   * It's an optional parameter. The default value is false. <br>
   */
  showIdenticon?: boolean;

  /**
   * {@link identiconPosition} Controls identicon position. <br>
   * It's an optional parameter.  <br>
   * You can use enum ${@link AUC_IDENTICON_POSITION}
   */
  identiconPosition?: AucIdenticonPosition;

  /**
   * {@link color} - Sets theme of the address button. <br>
   * It's an optional parameter. The default value is blue. <br>
   * You can use enum {@link AS_COLOR_GROUP}.
   */
  color?: AsColorGroup; // Default value is COLOR_GROUP
}
