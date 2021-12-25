import { Component, OnInit } from '@angular/core';

/**
 * This component is apart of routing
 */
@Component({
  //selector: 'pm-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = "Home Screen";
  constructor() { }

  ngOnInit(): void {
  }

}
