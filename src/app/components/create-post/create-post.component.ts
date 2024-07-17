import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/entities/post';
import { AdminService } from 'src/app/service/admin.service';
import { APIsService } from 'src/app/service/data/apis.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  post: Post = new Post();
  userEmail: string|null;
  pid: any;
  error: any;
  constructor(private postService: PostService,
    private apiService: APIsService,
    private router: Router,
  private adminService : AdminService
  ) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('user');
    this.apiService.getUserByEmail(this.userEmail).subscribe((response) => {
      console.log(response);
      this.pid=response.id;
  });
console.log(this.adminService.isUserAdmin() + 'sdf');
}

  savePost() {
    this.postService.createPost(this.post, this.pid).subscribe(data => {
      console.log(data);
      alert("feedback Posted Successfully");
      this.goToPostList();
    },
    (error) => {
      console.log(error);
      this.error=error;});
  }

  goToPostList() {
    this.router.navigate(['/postlist']);
  }

  onSubmit() {
    console.log(this.post);
    this.savePost();
  }

}