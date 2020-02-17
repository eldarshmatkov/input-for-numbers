import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'input-for-numbers';
  firstForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.firstForm = new FormGroup({
      formGroup: new FormGroup({
        minValue: new FormControl(3),
        maxValue: new FormControl(7),
        inputControl: new FormControl(5)
      })
    });
  }

}
