import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
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
  value = 0;
  inputControl = 'inputControl';

  minValue: number;
  maxValue: number;

  formGroup: FormGroup;
  subscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      minValue: [''],
      maxValue: [''],
      inputControl: [''],
    });
  }

  private onChange = () => {};
  private onTouched = () => {};

  ngOnInit() {
    this.subscription = this.formGroup.controls[this.inputControl].valueChanges
      .subscribe((v) => {
        if (v) {
          this.value = v;
          this.rewriteValue(v);
        } else {
          this.value = 0;
          this.rewriteValue(0);
        }
        this.emitChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(val) {
    this.formGroup.setValue(val, {emitEvent: false});
  }

  rewriteValue(val) {
    this.writeValue({inputControl: val, minValue: this.minValue, maxValue: this.maxValue});
  }

  registerOnChange(fn: (value: any) => void) {
    const minValue = 'minValue';
    const maxValue = 'maxValue';
    this.value = this.formGroup.controls[this.inputControl].value;
    this.minValue = this.formGroup.controls[minValue].value;
    this.maxValue = this.formGroup.controls[maxValue].value;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  inputValuePlus() {
    this.rewriteValue(this.value++);
    this.emitChanges();
  }

  inputValueMinus() {
    this.rewriteValue(this.value--);
    this.emitChanges();
  }

  emitChanges() {
    if (this.value > this.maxValue) {
      this.value = this.maxValue;
      this.rewriteValue(this.maxValue);
    } else if (this.value < this.minValue) {
      this.value = this.minValue;
      this.rewriteValue(this.minValue);
    } else {
      this.rewriteValue(this.value);
    }
  }
}
