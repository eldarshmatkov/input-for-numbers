import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})

export class InputNumberComponent implements ControlValueAccessor, OnDestroy, OnInit {
  value: number;

  minValue: number;
  maxValue: number;

  subscription: Subscription;

  public nestedForm: FormGroup;

  constructor() {
  }

  private onChange = () => {};
  private onTouched = () => {};

  get getInputValue(): number {
    return this.nestedForm.get('inputControl').value;
  }

  get getMinValue(): number {
    return this.nestedForm.get('minValue').value;
  }

  get getMaxValue(): number {
    return this.nestedForm.get('maxValue').value;
  }

  ngOnInit() {
    this.nestedForm = new FormGroup({
      inputControl: new FormControl(),
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    /*    this.subscription = this.formControl.valueChanges
          .subscribe((v) => {
            if (v) {
              this.value = v;
            } else {
              this.value = 0;
            }
            this.emitChanges();
          });*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(val) {
    console.log(val);
    this.nestedForm.get('inputControl').setValue(val, {emitEvent: false});
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  inputValuePlus() {
    this.setValues();
    this.writeValue(this.value++);
    this.emitChanges();
  }

  inputValueMinus() {
    this.setValues();
    this.writeValue(this.value--);
    this.emitChanges();
  }

  setValues() {
    if (!this.value) {
      this.value = this.getInputValue;
    }
    if (!this.minValue) {
      this.minValue = this.getMinValue;
    }
    if (!this.maxValue) {
      this.maxValue = this.getMaxValue;
    }


  }

  emitChanges() {
    if (this.value > this.maxValue) {
      this.value = this.maxValue;
      this.writeValue(this.maxValue);
    } else if (this.value < this.minValue) {
      this.value = this.minValue;
      this.writeValue(this.minValue);
    } else {
      this.writeValue(this.value);
    }
  }
}
