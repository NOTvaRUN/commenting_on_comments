import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss', '../comment/comment.component.scss']
})
export class ViewCommentsComponent {

  @Input() comments: any = {};
  @Output() ca = new EventEmitter();

  //  {
  //   1:  {
  //     id: 1,
  //     pid: 0,
  //     userName: "John",
  //     comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   2: {
  //     id: 2,
  //     pid: 0,
  //     userName: "Mary",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   3: {
  //     id: 3,
  //     pid: 1,
  //     userName: "Sunny",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   4: {
  //     id: 4,
  //     pid: 3,
  //     userName: "Rahul",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   5: {
  //     id: 5,
  //     pid: 4,
  //     userName: "Rahul",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   6: {
  //     id: 6,
  //     pid: 4,
  //     userName: "Rahul",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   7: {
  //     id: 7,
  //     pid: 5,
  //     userName: "Rahul",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   },
  //   8: {
  //     id: 8,
  //     pid: 7,
  //     userName: "Rahul",
  //     comment: "Ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint.",
  //     time: "13:04",
  //     date: "03 May 23"
  //   }
  // }


  public mainComments: any = []

  ngOnChanges(){
    console.log(this.comments)
    if(Object.keys(this.comments).length > 0){
      this.parseComments()

    }
  }
  ngOnInit(): void {
  
  }

  parseComments(){
    console.log(this.comments)
    this.mainComments = [];
    for(let cID of Object.keys(this.comments)){
      let comment = this.comments[cID]
      if(comment.pid == 0){
        this.mainComments.push(comment)
      } else {
        this.comments[comment.pid]["children"] ? null : this.comments[comment.pid]["children"] = [];
        this.comments[comment.pid]["children"].push(comment)
      }
    }
    console.log(this.mainComments)
  }

}
