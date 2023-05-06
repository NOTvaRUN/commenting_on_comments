import { Component } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  public userName = "";
  public comment = "";
  panelOpenState = false;

  public comments = [
    {
      id: 1,
      pid: 0,
      userName: "John",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
      time: "13:04",
      date: "03 May 23"
    },
    {
      id: 2,
      pid: 0,
      userName: "Mary",
      comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
      time: "13:04",
      date: "03 May 23"
    },
    {
      id: 3,
      pid: 1,
      userName: "Sunny",
      comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
      time: "13:04",
      date: "03 May 23"
    }
  ]

}
