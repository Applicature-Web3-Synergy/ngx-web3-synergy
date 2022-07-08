import { AsColorGroup } from '@applicature/styles';

import { W3sIdenticonPosition } from '../../directives';

export interface W3sAccountBalanceAddressConfig {
  /**
   * Whether the address button is disabled. <br>
   * It's an optional parameter. The default value is false. <br>
   */
  disabled?: boolean;

  /**
   * Show or hide account address identicon. <br>
   * It's an optional parameter. <br>
   * The default value is false. <br>
   */
  showIdenticon?: boolean;

  /**
   * Controls identicon position. <br>
   * It's an optional parameter.  <br>
   * You can use enum {@link W3S_IDENTICON_POSITION}
   */
  identiconPosition?: W3sIdenticonPosition;

  /**
   * {Sets theme of the address button. <br>
   * You can use enum {@link AS_COLOR_GROUP}. <br>
   * It's an optional parameter. <br>
   * The default value is blue. <br>
   */
  color?: AsColorGroup; // Default value is COLOR_GROUP
}
