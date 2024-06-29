import { Component, OnInit } from '@angular/core';
import { ServiceDepService } from '../services/service-dep.service';
import { Composant } from '../composant';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import * as XLSX from 'xlsx'; // Importation de XLSX
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-demande-composant',
  templateUrl: './demande-composant.component.html',
  styleUrls: ['./demande-composant.component.css']
})
export class DemandeComposantComponent implements OnInit {

  title = 'composant';
  employees: Employee[]=[];
  selectedEmploye!: Employee;

  composant: Composant[] = [];
  username: string = localStorage.getItem('prenom') || '';
  surname: string = localStorage.getItem('username') || '';
  matricule: number = Number(localStorage.getItem('cin')) || 0;
  prenom: string = this.username; // Initialize with username
  nom: string = this.surname; // Initialize with surname
  datejour!: String;
  reference!:String;
  designation!: String;
  quantite!:number;
  cause!: String;


  constructor(private mpservice: ServiceDepService, private router: Router) { }

  ngOnInit() {
   
   this.loadComposatne();
    this.mpservice.getEmployes().subscribe((datas: any) => {
      this.employees = datas;
  });
  


  
  }
  // onEmployeChange(event: any) {
  //   if (this.selectedEmploye) {
  //     this.nom = this.selectedEmploye.nom;
  //     this.prenom = this.selectedEmploye.prenom;
  //     this.matricule = this.selectedEmploye.cin// Assurez-vous que l'employé a un champ matricule
  //   }
  // }
  loadComposatne(){
    this.mpservice.getComposant().subscribe((datas: any) => {
      this.composant = datas; // Attribuer les données récupérées à la variable employes
     
    });
  }

  addComposant() {
   
    const newComposant = {
      nom: this.nom,
      prenom: this.prenom,
      matricule: this.matricule,
      datejour: this.datejour,
      reference: this.reference,
      designation: this.designation,
      quantite: this.quantite,
      cause: this.cause
    }; this.mpservice.addComposant(newComposant).subscribe(
      response => {
        console.log('Composant ajouté avec succès', response);
        window.alert('Composant ajouté avec succès');
        this.router.navigate(['/demandecompoosant']);
        this.loadComposatne();
        
        
      },
      error => {
        console.error('Erreur lors de l\'ajout du composant', error);
        window.alert('Erreur lors de l\'ajout du composant');
      }
    );

}
exportToExcelPass(): void {
  // Convertir les données en une feuille de calcul
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.composant);
  const workbook: XLSX.WorkBook = { Sheets: { 'Tâches': worksheet }, SheetNames: ['Tâches'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Sauvegarder le fichier Excel
  this.saveAsExcelFile(excelBuffer, 'taches');
}
saveAsExcelFile(buffer: any, fileName: string): void {
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
}

}
