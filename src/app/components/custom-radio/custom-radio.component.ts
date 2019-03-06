import { Component, Input, OnInit } from '@angular/core';
import { CustomRadio, CustomRadioOption } from './custom.radio.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html'
})
export class CustomRadioComponent implements CustomRadio, OnInit {
  static readonly defaultProps: CustomRadio = {
    className: '',
    disabled: false,
    iconName: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    options: [],
    required: false,
    selectedOption: {} as CustomRadioOption,
    value: null
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconName') iconNameIput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomRadioOption>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public iconName: string;
  public label: string;
  public name: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public options: Array<CustomRadioOption>;
  public required: boolean;
  public selectedOption: CustomRadioOption;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomRadioComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = this.disabledInput || defaultProps.disabled;
    this.label = this.labelInput || defaultProps.className;
    this.name = this.nameInput || defaultProps.name;
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean) {
    if (required && !value) {
      return false;
    }

    return true;
  }

  onBlur() {
    this.isTouched = true;
  }

  onChange(selectedOption: CustomRadioOption) {
    this.selectedOption = selectedOption;
    this.value = selectedOption.value;
    this.isValid = this.validate(this.value, this.required);
  }
}
