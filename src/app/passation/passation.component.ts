import { Component, OnInit } from '@angular/core';
import { ServiceDepService } from '../services/service-dep.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { passation } from '../passation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-passation',
  templateUrl: './passation.component.html',
  styleUrls: ['./passation.component.css']
})
export class PassationComponent implements OnInit  {
  employees: Employee[] = []; // Liste des employés
  passations:passation[] =[];

  username: string = localStorage.getItem('prenom') || '';
surname: string = localStorage.getItem('username') || '';
matricule: number = Number(localStorage.getItem('cin')) || 0;
  tache: String='';
  description:String='';
  nom : string= this.username;
  prenom : string= this.surname;
  datejour!: Date ;
  ouvrier : string='';
  dateDebut: string = '';
  dateFin: string = '';
  constructor(private employeeService: ServiceDepService, private router: Router) { }

  ngOnInit(): void {
      // Appeler le service pour obtenir les employés
      this.employeeService.getEmployes().subscribe((datas: any) => {
          this.employees = datas;
      });
    //   this.employeeService.getPasstion().subscribe((datas: any) => {
    //     this.passations = datas;
    // });
    this.getLast10Passations();
    this.setDefaultDate();
  }

  setDefaultDate(): void {
    this.datejour = new Date();
  }

  onSubmit(): void {
      // Vérifiez si tous les champs requis sont remplis
      if (!this.tache || !this.description || !this.nom || this.prenom) {
          window.alert('Veuillez remplir tous les champs requis.');
          return;
      }

      // Ici, envoyez les données de la passation de tâches
      // à l'employé sélectionné. Par exemple, en utilisant un service.

      console.log('Tâche :', this.tache);
      console.log('Description :', this.description);
      console.log('nom sélectionné :', this.nom);
      console.log('prenom sélectionné :', this.prenom);
      console.log('prenom sélectionné :', this.ouvrier);
      console.log('prenom sélectionné :', this.datejour);
      // Ajoutez ici votre logique d'envoi des données à l'employé

      // Après l'envoi réussi, vous pouvez afficher une alerte de succès et éventuellement rediriger
      window.alert('Passation de tâches envoyée avec succès.');
      this.router.navigate(['/']); // Rediriger après succès
  }

  addPassation(){
    
    const newPassation={
      datejour:this.datejour,
      tache: this.tache,
      description:this.description, 
       ouvrier: this.ouvrier
    };
    this.employeeService.addPassation(this.nom,this.prenom,newPassation).subscribe(
      response => {
            console.log('passation ajouté avec succès', response);
            window.alert('passation ajouté avec succès');
            this.employeeService.getPasstion().subscribe((datas: any) => {
              this.passations = datas;
          });   
  },
  error => {
        console.error('Erreur lors de l\'ajout du passation', error);
        window.alert('Verefier Votre Nom et Prenom ');
      }       )
  }
  rechercherParOuvrier() {
    if (this.ouvrier) {
      this.employeeService.getPassationsByOuvrier(this.ouvrier).subscribe(
        (data: any) => {
          this.passations = data;
        },
        error => {
          console.error('Erreur lors de la recherche par ouvrier', error);
        }
      );
    } else {
      // Si aucun ouvrier n'est sélectionné, rechargez toutes les passations
      this.employeeService.getPasstion().subscribe((datas: any) => {
        this.passations = datas;
      })
  }

  }
  rechercherParDates(): void {
    if (!this.dateDebut || !this.dateFin) {
      window.alert('Veuillez sélectionner une date de début et une date de fin.');
      return;
    }

    // Appelez le service pour récupérer les passations dans la plage de dates spécifiée
    this.employeeService.rechercherPassationsParDates(this.dateDebut, this.dateFin).subscribe(
      (data: any) => {
        this.passations = data; // Mettez à jour la liste des passations avec les résultats de la recherche
      },
      error => {
        console.error('Erreur lors de la recherche par dates', error);
        window.alert('Erreur lors de la recherche par dates');
      }
    );
  }

  getLast10Passations(): void {
    this.employeeService.getLast10Passations().subscribe((data: any[]) => {
      this.passations = data;
    });
  }
}
