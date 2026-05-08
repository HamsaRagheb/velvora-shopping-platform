import { Component,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() categories!: string[];
  @Output() categoryChange = new EventEmitter<string>();


onSelectChange(event: any){
  this.categoryChange.emit(event.target.value);
}

}
