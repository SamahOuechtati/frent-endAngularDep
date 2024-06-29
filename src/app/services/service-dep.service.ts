import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Employee } from '../employee';
import { passation } from '../passation';

@Injectable({
  providedIn: 'root'
})
export class ServiceDepService {

  readonly API_URL = "http://localhost:8088"
  readonly  ENDPOINT_EMPLOYES="/employees"
  readonly ADD_Emplo="/AddEmployer"
  readonly API_Alert="/alertes"
  readonly API_ADDALT="/alertes/AddAlerte"
  readonly  ENDPOINT_Composant="/composant"
  readonly API_ADDCpt="/demandecomposant/demandecomposant"
  readonly API_GETALERTES="/alertes"
  readonly API_Passation="/passation"
  readonly API_addPassation="/ajoutPass"
  readonly api_supttsalerte="/supptousalertes"
  readonly api_rechercheempcin="/rechercheEmpCin"
  readonly api_suppttpassation="/supptouspassation"
  readonly api_demandeC="/demandecomposant"
  readonly api_rechercherParDates="/rechercherParDates"
  readonly api_last10="/last10"



  nom!: string;
  prenom!: string;
  fonction!: string;
  datenaissance!: string;
  cin!: string;
  

  constructor( private httpclient: HttpClient) { }

  getAlertes(){
    return this.httpclient.get(this.API_URL+this.API_GETALERTES)
  }

  getEmployes(){
    return this.httpclient.get(this.API_URL+this.ENDPOINT_EMPLOYES)
  }
  getComposant(){
    return this.httpclient.get(this.API_URL+this.api_demandeC)
  }
  addEmploye(newEmploye: any): Observable<any> {
    return this.httpclient.post<any>(this.API_URL + this.ENDPOINT_EMPLOYES+this.ADD_Emplo, newEmploye).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout de l\'employé', error);
        throw error; // Renvoyer l'erreur pour que le composant puisse la gérer
      }))
    }
    addComposant(newComposant: any): Observable<any> {
      return this.httpclient.post<any>(this.API_URL +this.API_ADDCpt, newComposant).pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout de lcomposant', error);
          throw error; // Renvoyer l'erreur pour que le composant puisse la gérer
        }))
      }
    getAlt(){
      return this.httpclient.get(this.API_URL+this.API_Alert)
    }

    addAlrt(newalert : any): Observable<any>{
      return this.httpclient.post<any>(this.API_URL+this.API_ADDALT,newalert).pipe(
        catchError(error =>{
          console.error('Erreur lors de l\'ajout de l\'alerte',error);
          throw error;
        }))      
    }
    addPassation(nom: string, prenom: string, newPassation: any): Observable<any> {
      const encodedPrenom = encodeURIComponent(prenom);
      const encodedNom = encodeURIComponent(nom);
      const url = `${this.API_URL}${this.API_Passation}${this.API_addPassation}/${encodedPrenom}/${encodedNom}`;
      console.log('URL: ', url);
      return this.httpclient.post<any>(url, newPassation).pipe(
          catchError(error => {
              console.error('erreur', error);
              throw error;
          })
      );
  }
    
    
    getPasstion():Observable<any>{
      return this.httpclient.get(this.API_URL+this.API_Passation)
    }

    deleteEmploye(cin: number): Observable<void> {
      const url = `${this.API_URL}${this.ENDPOINT_EMPLOYES}/${cin}`;
    return this.httpclient.delete<void>(url);
    }

    updateEmploye(cin: number, employee: Employee): Observable<Employee> {
      const url = `${this.API_URL}${this.ENDPOINT_EMPLOYES}/ModifierEmpl/${cin}`;
      return this.httpclient.put<Employee>(url, employee);
    }
    deleteAlerte(idAlerte: number): Observable<void> {
      const url = `${this.API_URL}${this.API_Alert}/${idAlerte}`;
      return this.httpclient.delete<void>(url).pipe(
        catchError(error => {
          console.error('Erreur lors de la suppression de l\'alerte', error);
          throw error;
        })
      );
    }
    deletePassation(idPassation:number){
      const url = `${this.API_URL}${this.API_Passation}/${idPassation}`;
      return this.httpclient.delete<void>(url);
    }
    supprimerTousLesAlertes(): Observable<any> {
      return this.httpclient.delete(this.API_URL+this.API_Alert+this.api_supttsalerte);
    }
    supprimerTousLesPassation(): Observable<any> {
      return this.httpclient.delete(this.API_URL+this.API_Passation+this.api_suppttpassation);
    }
    getPassationsByOuvrier(ouvrier: string): Observable<any[]> {
      const url = `${this.API_URL}${this.API_Passation}/${ouvrier}`;
      return this.httpclient.get<any>(url).pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des passations par ouvrier', error);
          throw error;
        })
      );
    }
    rechercherPassationsParDates(dateDebut: string, dateFin: string): Observable<any> {
      const params = new HttpParams()
        .set('dateDebut', dateDebut)
        .set('dateFin', dateFin);
  
      return this.httpclient.get(`${this.API_URL}${this.API_Passation}${this.api_rechercherParDates}`, { params });
    }
    getTasksByEmploye(cin: number): Observable<any[]> {
      const url = `${this.API_URL}${this.ENDPOINT_EMPLOYES}${this.api_rechercheempcin}/${cin}`;
      return this.httpclient.get<any[]>(url).pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des tâches', error);
          throw error;
        })
      );
    }

    getLast10Passations(): Observable<any[]> {
      return this.httpclient.get<passation[]>(`${this.API_URL}${this.API_Passation}${this.api_last10}`);
    }

    

}
