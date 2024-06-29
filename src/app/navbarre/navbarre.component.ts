import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarre',
  templateUrl: './navbarre.component.html',
  styleUrls: ['./navbarre.component.css']
})
export class NavbarreComponent implements OnInit{

  
  cin: string | null = null;
  prenom: string | null = null;
  nom: string | null = null;

  typeUtilisation: string =localStorage.getItem('typeUtilisation') || '';


  constructor() { }

  date!: Date;
  time!: Date;
  ngOnInit() {

    this.prenom = localStorage.getItem("prenom");
    this.nom = localStorage.getItem("username");

    this.cin = localStorage.getItem("cin");
    
    
    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }
  updateDateTime() {
    const now = new Date();
    this.date = now;
    this.time = now;
  }
  

}
