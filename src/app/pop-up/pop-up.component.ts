import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PopUpComponent>,private _sanitizer: DomSanitizer) {
    this.src += data.Id;
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }


  public src = "https://www.youtube.com/embed/";
  public safeURL: any;
  ngOnInit(): void {
  }
  closeDialoguebox() {
    this.dialogRef.close()
  }
}
