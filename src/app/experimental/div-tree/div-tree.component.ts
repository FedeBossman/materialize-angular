/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'materialize-div-tree',
  templateUrl: './div-tree.component.html'
})
export class DivTreeComponent implements OnInit {
  @Input() classNames: Array<string>;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const { children } = this.element.nativeElement;
    const divTree = this.createdNested(this.classNames, children);

    this.element.nativeElement.appendChild(divTree);
  }

  createdNested(classNames: Array<string>, child: HTMLElement): HTMLElement {
    let content = child;

    if (classNames.length > 1) {
      const newClassNames = classNames.slice(1, classNames.length);

      content = this.createdNested(newClassNames, child);
    }

    const container: HTMLElement = this.renderer.createElement('div');

    container.className = classNames[0];

    if (content instanceof HTMLCollection) {
      const length = this.element.nativeElement.children.length;

      for (let i = 0; i < length; i++) {
        const { firstChild } = this.element.nativeElement;

        container.appendChild(firstChild);
      }
    } else {
      container.appendChild(content);
    }

    return container;
  }
}
