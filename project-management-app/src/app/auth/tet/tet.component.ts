import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/core/modal/error/error.component';

@Component({
  selector: 'app-tet',
  templateUrl: './tet.component.html',
  styleUrls: ['./tet.component.scss']
})
export class TetComponent {
  constructor(private matDialog: MatDialog) {}
  form = new FormGroup({
    first: new FormControl<string>('', [
    ]),
    last: new FormControl<string>('', [
    ])
  })

  onSubmit() {
    const dialogRef = this.matDialog.open(ErrorComponent, {
      // width:'600px', 
      // height:'350px', 
      data: {message: 'hello motherfuckers'}
      });

      dialogRef.afterClosed().subscribe()
  }


}
