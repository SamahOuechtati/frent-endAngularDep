import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ServiceDepService } from '../services/service-dep.service';
import { passation } from '../passation';
import { Alertes } from '../alert';
import * as XLSX from 'xlsx'; // Importation de XLSX
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})

  export class EmployeComponent implements OnInit{
    title = 'Employe';
    employeSelectionne: Employee | undefined;
    passations: passation[]=[];
    alertes:Alertes[]=[];
    employes: Employee[] = []; // Initialiser employes avec un tableau vide
    nom!: string;
    prenom!: string;
    fonction!: string;
    datenaissance!: Date;
    cin!: number;
    typeUtilisation!:String;
  
    constructor(private mpservice: ServiceDepService ) { }
  
    ngOnInit() {
      this.loadEmployes();
      this.loadPassations();
      this.loadAlertes();
  };
  loadEmployes() {
    this.mpservice.getEmployes().subscribe((datas: any) => {
      this.employes = datas; // Attribuer les données récupérées à la variable employes
    });
  }

  loadPassations() {
    this.mpservice.getPasstion().subscribe((datas: any) => {
      this.passations = datas;
    });
  }

  loadAlertes() {
    this.mpservice.getAlertes().subscribe((datas: any) => {
      this.alertes = datas;
    });
  }
  supprimeralerte(idAlerte:number ){
    this.mpservice.deleteAlerte(idAlerte).subscribe(
      response => {
        console.log('Employé supprimé avec succès');
        window.alert('Employé supprimé avec succès');
        this.loadEmployes(); // Rafraîchir la liste des employés après suppression
        this.alertes = this.alertes.filter(alert => alert.idAlerte !== idAlerte);
      },
      error => {
        console.error('Erreur lors de la suppression de l\'employé', error);
        window.alert('Erreur lors de la suppression de l\'Employé');
      }
    );
    
  }
    
    addEmploye() {
      const newEmploye = {
        nom: this.nom,
        prenom: this.prenom,
        fonction: this.fonction,
        datenaissance: this.datenaissance,
        cin: this.cin,
        typeUtilisation: this.typeUtilisation
        
      };
  
      this.mpservice.addEmploye(newEmploye).subscribe(
        response => {
          console.log(newEmploye)
          console.log('Employé ajouté avec succès', response);
          window.alert('Employé ajouté avec succès');
          // Rafraîchir la liste des employés ou effectuer toute autre action nécessaire
          this.resetForm();
          this.loadEmployes();
          this.loadPassations();
          this.loadAlertes();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'employé', error);
          window.alert('Erreur lors de l\'ajout du Employé');
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    }
    resetForm() {
      this.nom = '';
      this.prenom = '';
      this.fonction = '';
      this.datenaissance = new Date();
      this.cin = 0;
      this.typeUtilisation = '';
    }
    supprimerEmploye(cin :number)
    {
      this.mpservice.deleteEmploye(cin).subscribe(
        response => {
          console.log('Employé supprimé avec succès');
          window.alert('Employé supprimé avec succès');
          this.loadEmployes(); // Rafraîchir la liste des employés après suppression
          this.employes = this.employes.filter(employe => employe.cin !== cin);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'employé', error);
          window.alert('Erreur lors de la suppression de l\'Employé');
        }
      );
    }
    supprimePassation(idPassation:number){
      this.mpservice.deletePassation(idPassation).subscribe(
        response => {
          console.log('passation supprimé avec succès');
          window.alert('passation supprimé avec succès');
          this.loadEmployes(); // Rafraîchir la liste des employés après suppression
          this.passations = this.passations.filter(pass => pass.idPassation !== idPassation);
        },
        error => {
          console.error('Erreur lors de la suppression de passation', error);
          window.alert('Erreur lors de la suppression de passation');
        }
      );
    }
    modifierEmploye() {
      if (this.employeSelectionne) {
        this.mpservice.updateEmploye(this.employeSelectionne.cin, this.employeSelectionne).subscribe(
          response => {
            console.log('Employé modifié avec succès', response);
            window.alert('Employé modifié avec succès');
            this.loadEmployes(); // Rafraîchir la liste des employés après modification
            this.employeSelectionne = undefined;
          },
          error => {
            console.error('Erreur lors de la modification de l\'employé', error);
            window.alert('Erreur lors de la modification de l\'Employé');
          }
        );
      }
    }
    chargerDetailsEmploye(employe: Employee) {
      // Charger les détails de l'employé dans le formulaire de modification
      this.employeSelectionne = employe;
    }
    imprimerTasks(cin: number){
      this.mpservice.getTasksByEmploye(cin).subscribe(
        (tasks: any[]) => {
          const xmlContent = this.generateXMLContent(tasks);
          this.downloadXMLFile(xmlContent, `tasks_${cin}.xml`);
        },
        error => {
          console.error('Erreur lors de la récupération des tâches', error);
          window.alert('Erreur lors de la récupération des tâches');
        }
      );
    }
    generateXMLContent(tasks: any[]): string {
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<tasks>\n`;
      tasks.forEach(task => {
        xml += `  <task>\n`;
        xml += `    <nom>${task.nom}</nom>\n`;
        xml += `    <prenom>${task.prenom}</prenom>\n`;
        xml += `    <Fonction>${task.Fonction}</Fonction>\n`;
        xml += `    <datenaissance>${task.datenaissance}</datenaissance>\n`;
        xml += `    <cin>${task.cin}</cin>\n`;
        xml += `    <typeUtilisation>${task.typeUtilisation}</typeUtilisation>\n`;
        xml += `  </task>\n`;
      });
      xml += `</tasks>\n`;
      return xml;
    }
    supprimettalertes(){
      this.mpservice.supprimerTousLesAlertes().subscribe(
        response => {
          console.log('alertes supprimé avec succès');
          window.alert('alertes supprimé avec succès');
          this.loadEmployes();
          this.loadPassations();
          this.loadAlertes(); // Rafraîchir la liste des employés après suppression
        },
        error => {
          console.error('Erreur lors de la suppression de l\'alertes', error);
          window.alert('Erreur lors de la suppression de l\'alertes');
        }
      );
    }
    supprimettpassation(){
      this.mpservice.supprimerTousLesPassation().subscribe(
        response => {
          console.log('passation supprimé avec succès');
          window.alert('passation supprimé avec succès');
          this.loadEmployes();
          this.loadPassations();
          this.loadAlertes();
        },
        error => {
          console.error('Erreur lors de la suppression de l\'passation', error);
          window.alert('Erreur lors de la suppression de l\'passation');
        }
      );
    }
  
    downloadXMLFile(content: string, filename: string) {
      const blob = new Blob([content], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
// employe.ts
exportToExcelEmp(): void {
  // Convertir les données en une feuille de calcul
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employes);
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
exportToExcelPass(): void {
  // Convertir les données en une feuille de calcul
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.passations);
  const workbook: XLSX.WorkBook = { Sheets: { 'Tâches': worksheet }, SheetNames: ['Tâches'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Sauvegarder le fichier Excel
  this.saveAsExcelFile(excelBuffer, 'taches');
}
 exportToExcelAlerte(): void {
  // Convertir les données en une feuille de calcul
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alertes);
  const workbook: XLSX.WorkBook = { Sheets: { 'Tâches': worksheet }, SheetNames: ['Tâches'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Sauvegarder le fichier Excel
  this.saveAsExcelFile(excelBuffer, 'taches');
}


    

}
