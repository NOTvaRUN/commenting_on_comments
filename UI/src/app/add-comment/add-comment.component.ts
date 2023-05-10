import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  public userName = "";
  public comment = "";
  panelOpenState = false;

  @Output() commentAdded = new EventEmitter();
  constructor(private http: HttpService){

  }
  commentForm = new FormGroup({
    username: new FormControl('', Validators.required),
    comment: new FormControl('',  Validators.required),
  });


  ngOnInit(): void {
  }

  addComment(){
    this.http.addComments({
      "pid": 0,
      "userName": this.commentForm.value.username,
      "comment": this.commentForm.value.comment
    }).subscribe(data=>{
      if(data.status === "success"){
        this.commentAdded.emit(true)
        this.commentForm.reset()
      } else {
        alert("Comment add failed");
      }
    }, (err)=>{
      alert("Comment add failed");
    })
  }


}
