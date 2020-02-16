import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'input-for-numbers';
  // TODO: продолжить разработку form group
  public nestedForm: FormGroup;

  constructor() {
    this.nestedForm = new FormGroup({
      inputControl: new FormControl(2),
      minValue: new FormControl(0),
      maxValue: new FormControl(5),
    });
  }
}
