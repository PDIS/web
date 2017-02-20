import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	/* let each listed external link append with an icon */
  	let list = Array.from(document.querySelectorAll("li a[target='_blank']"))
  	for(let e of list) {
			let icon = document.createElement("i")
			icon.className = "fa fa-external-link"
			icon.style.paddingLeft = "1ex"
			icon.style.fontSize = "50%"
  		e.appendChild(icon)
  	}

  }

}
