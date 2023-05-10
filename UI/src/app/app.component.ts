import { Component } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UI';
  constructor(public http: HttpService){}
  public comments = {}
  ngOnInit() {
    this.getLatestComments()
  }

  getLatestComments(){
    this.http.getComments().subscribe(res=>{
      if(res.status == 'success'){
        console.log(res)
        this.comments = res.data
      } else {
        alert("failed to get comments")
      }
    }, (err)=>{
      alert("failed to get comments")
    })
  }
}
