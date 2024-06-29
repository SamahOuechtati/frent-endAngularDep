import { Component, OnInit } from '@angular/core';
import { ServiceDepService } from '../services/service-dep.service';
import { Router } from '@angular/router';
import { Alertes } from '../alert';
import { Employee } from '../employee';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.css']
})
export class AlerteComponent implements OnInit {

alertes : Alertes[]=[]
employees:Employee[]=[];


technicien: any;

username: string = localStorage.getItem('prenom') || '';
surname: string = localStorage.getItem('username') || '';
matricule: number = Number(localStorage.getItem('cin')) || 0;

nomDepanneur: String=this.username+this.surname;
poste!:String;
typedefaut!:String;
fonction!:String;
description!:String;
selecteFonction!: String;
constructor(private mpservice: ServiceDepService, private router: Router,private httpclient: HttpClient) { }

ngOnInit(): void {
  this.loadAlertes()
  this.loadEmployes();

  };
 

loadAlertes() {
  this.mpservice.getAlertes().subscribe((datas: any) => {
    this.alertes = datas;
  });
}
loadEmployes() {
  this.mpservice.getEmployes().subscribe((datas: any) => {
    this.employees = datas; // Attribuer les données récupérées à la variable employes
  });
}


  


addAlerte(){
   const newalertes= {
    nomDepanneur: this.nomDepanneur,
    poste: this.poste,
    typedefaut: this.typedefaut,
    fonction: this.fonction,
    description: this.description,
 
};this.mpservice.addAlrt(newalertes).subscribe(
  response => {
    console.log('alerte ajouté avec succès', response);
    window.alert('alerte ajouté avec succès');
    this.loadAlertes() ;
    
    
  },
  error => {
    console.error('Erreur lors de l\'ajout du alerte', error);
    window.alert('Erreur lors de l\'ajout du alerte');
  }
);
}

chargerafficheralertes(){
  this.loadAlertes()
}

supprimeralertes(): void {
  this.mpservice.supprimerTousLesAlertes().subscribe(
    () => {
      console.log('Tous les alertes ont été supprimés avec succès');
      window.alert('Tous les alertes ont été supprimés avec succès');
      this.loadAlertes(); // Rechargez la liste des alertes après la suppression
    },
    error => {
      console.error('Erreur lors de la suppression des alertes', error);
      window.alert('Erreur lors de la suppression des alertes');
    }
  );
}
}
