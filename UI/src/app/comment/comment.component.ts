import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: any;
  @Output() commentAdded = new EventEmitter();
  public currentComment: any;
  panelOpenState = false;
  public mode = 'create';
  commentForm = new FormGroup({
    username: new FormControl('', Validators.required),
    comment: new FormControl('',  Validators.required),
  });
  constructor(public dialog: MatDialog, public http: HttpService){
    
  }
  @ViewChild('addComment', {static: true}) addComment: TemplateRef<any>;

  reply(comment: any){
    this.mode = 'create';
    this.currentComment = comment;
    this.dialog.open(this.addComment)
  }


  addC(){
    if(this.mode == 'create'){
      this.http.addComments({
        "pid": this.currentComment.id,
        "userName": this.commentForm.value.username,
        "comment": this.commentForm.value.comment
      }).subscribe(data=>{
        this.dialog.closeAll();
        if(data.status === "success"){
          this.commentAdded.emit(true)
          this.commentForm.reset()
        } else {
          alert("Comment add failed");
        }
      }, (err) => {
        alert("Comment add failed");
      })

    } else {
      let comment = {...this.comment}
      comment['userName'] = this.commentForm.value.username
      comment['comment'] = this.commentForm.value.comment
      this.http.updateComments(comment).subscribe(data=>{
        this.dialog.closeAll();
        if (data.status === "success") { 
          this.commentAdded.emit(true)
          this.commentForm.reset()
        } else {
          alert("Comment update failed");
        }
      }, (err) => {
        alert("Comment update failed");
      })
    }
  }

  edit(comment: any){
    this.currentComment = comment;
    this.mode = 'edit';
    this.commentForm.controls.username.setValue(comment.userName)
    this.commentForm.controls.comment.setValue(comment.comment)
    this.dialog.open(this.addComment)
  }
}

