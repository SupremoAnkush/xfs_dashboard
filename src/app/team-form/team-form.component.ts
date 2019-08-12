import { Component, OnInit } from '@angular/core';
import { AddTeam } from '../add-team';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  teams: AddTeam;

  constructor(private route: ActivatedRoute, private router: Router, private Service: ServicesService) { 
    this.teams = new AddTeam(this.teams.teamName, this.teams.gitUrl , this.teams.memberName , this.teams.memberNumber);

  }
  onSubmit() {
    this.Service.save(this.teams).subscribe();
    // this.Service.save(this.teams).subscribe(result => this.teamList());
  }

  ngOnInit() {
  }

}
