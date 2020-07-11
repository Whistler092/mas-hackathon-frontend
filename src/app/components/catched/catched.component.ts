import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catched',
  templateUrl: './catched.component.html',
  styleUrls: ['./catched.component.css'],
})
export class CatchedComponent implements OnInit {
  public catched = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit(): void {}
}
