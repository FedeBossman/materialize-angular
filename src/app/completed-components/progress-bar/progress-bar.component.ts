import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { ProgressBarModel } from './progress-bar.model';

@Component({
  selector: `${ config.components.prefix }-progress-bar`,
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent {
  static readonly defaultProps: ProgressBarModel = {
    className: ''
  };

  @Input() className: string = ProgressBarComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
