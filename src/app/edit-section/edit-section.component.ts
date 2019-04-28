import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {
  @Input() node: any;
  constructor() {
   }

  ngOnInit() {
  }

}
