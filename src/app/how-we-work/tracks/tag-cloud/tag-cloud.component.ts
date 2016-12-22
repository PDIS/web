import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import { CloudOptions } from 'angular-tag-cloud-module/cloud.interfaces';
import { CloudData } from 'angular-tag-cloud-module/cloud.interfaces';
import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent implements OnInit, OnChanges {
  @Input() data: [CloudData];
  @Input() width?: number = 500;
  @Input() height?: number = 300;
  @Input() removeOverflow?: boolean = false;


  alreadyPlacedWords: any[] = [];

  options: {};

  constructor(private el: ElementRef, private renderer: Renderer, private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.el.nativeElement.innerHTML="";
    if (!this.data) {
      console.error('angular-tag-cloud: No data passed. Please pass tags data as json');
      return;
    }

    this.options = {
      step: 2.0,
      aspectRatio: (this.width / this.height),
      width: this.width,
      height: this.height,
      center: {
        x: (this.width / 2.0),
        y: (this.height / 2.0)
      },
      removeOverflow: this.removeOverflow
    }

    this.renderer.setElementStyle(this.el.nativeElement, 'width', this.options['width'] + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'height', this.options['height'] + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
    this.renderer.setElementStyle(this.el.nativeElement, 'position', this.options['position']);
    this.drawWordCloud();
  }


  drawWordCloud() {
    // Sort this.data from the word with the highest weight to the one with the lowest
    this.data.sort((a, b) => {
      if (a.weight < b.weight) {
        return 1;
      } else if (a.weight > b.weight) {
        return -1;
      } else {
        return 0;
      }
    });

    this.data.forEach((elem, index) => {
      this.drawWord(index, elem);
    });
  }

  // Helper function to test if an element overlaps others
  hitTest(currentEl: any, otherEl: any[]) {
    // Check elements for overlap one by one, stop and return false as soon as an overlap is found
    for (let i = 0; i < otherEl.length; i++) {
      if (this.overlapping(currentEl, otherEl[i])) { return true; }
    }
    return false;
  }

  // Pairwise overlap detection
  overlapping(a: any, b: any) {
    return (Math.abs(2.0 * a.offsetLeft + a.offsetWidth - 2.0 * b.offsetLeft - b.offsetWidth) < a.offsetWidth + b.offsetWidth &&
      Math.abs(2.0 * a.offsetTop + a.offsetHeight - 2.0 * b.offsetTop - b.offsetHeight) < a.offsetHeight + b.offsetHeight)
      ? true : false
  };

  // Function to draw a word, by moving it in spiral until it finds a suitable empty place. This will be iterated on each word.
  drawWord(index: any, word: any) {
    // Define the ID attribute of the span that will wrap the word
    let angle = 6.28 * Math.random(),
      radius = 0.0,
      weight = 5,
      wordSpan: any;

    // Check if min(weight) > max(weight) otherwise use default
    if (this.data[0].weight > this.data[this.data.length - 1].weight) {
      // Linearly map the original weight to a discrete scale from 1 to 10
      weight = Math.round((word.weight - this.data[this.data.length - 1].weight) /
        (this.data[0].weight - this.data[this.data.length - 1].weight) * 9.0) + 1;
    }

    // Create a new span and insert node.
    wordSpan = this.renderer.createElement(this.el.nativeElement, 'span');
    wordSpan.className = 'w' + weight;

    let node = this.renderer.createText(this.el.nativeElement, word.text);

    // Append href if there's a link alongwith the tag
    if (word.link !== undefined && word.link !== '') {
      let wordLink = this.renderer.createElement(this.el.nativeElement, 'a');
      wordLink.href = word.link;

      if (word.external !== undefined && word.external) {
        wordLink.target = '_blank';
      }

      wordLink.appendChild(node);
      node = wordLink
    }

    if (word.color !== undefined && word.color !== '') {
      this.renderer.setElementStyle(node, 'color', word.color);
    }

    wordSpan.appendChild(node);

    let width = wordSpan.offsetWidth,
      height = wordSpan.offsetHeight,
      left = this.options['center'].x,
      top = this.options['center'].y;

    // Save a reference to the style property, for better performance
    let wordStyle = wordSpan.style;
    wordStyle.position = 'absolute';

    // place the first word
    wordStyle.left = left + 'px';
    wordStyle.top = top + 'px';

    while (this.hitTest(wordSpan, this.alreadyPlacedWords)) {
      radius += this.options['step'];
      angle += (index % 2 === 0 ? 1 : -1) * this.options['step'];

      left = this.options['center'].x - (width / 2.0) + (radius * Math.cos(angle)) * this.options['aspectRatio'];
      top = this.options['center'].y + radius * Math.sin(angle) - (height / 2.0);

      wordStyle.left = left + 'px';
      wordStyle.top = top + 'px';
    }

    // Don't render word if part of it would be outside the container
    if (this.options['removeOverflow'] && (left < 0 || top < 0 || (left + width) > this.options['width'] || (top + height) > this.options['height'])) {
      wordSpan.remove();
      return;
    }

    this.alreadyPlacedWords.push(wordSpan);
  };

}