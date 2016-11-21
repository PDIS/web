import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  topicNav;

  @Output()
  change = new EventEmitter<string>();

  constructor(private datasvcNav: DataService) {
    this.topicNav = "1";
  }

  ngOnInit() {

  }

  changeTopic1($event: MouseEvent) {
      this.topicNav = "1";
      console.log($event);
      this.change.emit(this.topicNav);
      console.log(this.topicNav);
  }
  changeTopic2($event: MouseEvent) {
      this.topicNav = "2";
      console.log($event);
      this.change.emit(this.topicNav);
      console.log(this.topicNav);
  }
  changeTopic3($event: MouseEvent) {
      this.topicNav = "3";
      console.log($event);
      this.change.emit(this.topicNav);
      console.log(this.topicNav);
  }

}
