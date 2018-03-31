import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
     client:Client = {
       firstName:'',
       lastName:'',
       email:'',
       phone:'',
       balance:0
     }

     disableBalanceOnAdd: boolean=false;

  constructor(private flashMessagesService: FlashMessagesService,
              private router: Router,
              private clientService: ClientService) { }

  ngOnInit() {
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    //console.log(value, valid);
    if(this.disableBalanceOnAdd){
      value.balance =0;
    }
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout:4000
      })
      this.router.navigate(['add-client']);
    }else {
      //Add New Client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added', {
        cssClass:'alert-success', timeout:4000
      })
      this.router.navigate(['/']);

    }
  }

}
