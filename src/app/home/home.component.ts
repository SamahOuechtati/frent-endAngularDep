import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDepService } from '../services/service-dep.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  emp: Employee[]=[];

  username : string="";
  surname: string=''
  password:number =0;
  Utilisation: string="";
  

  

  constructor(private router: Router, private depserv: ServiceDepService) {}

  ngOnInit(): void {
    // Appeler le service pour obtenir les employés
    this.depserv.getEmployes().subscribe((datas: any) => {
        this.emp = datas;
    });
  }

  // login(): void {
  //   this.depserv.getEmployes().subscribe((resultat: any)=>{
  //     this.emp=resultat
  //     console.log(resultat)
  //     if(this.chekclogin(this.username,this.password)){
  //       const employeeIndex = this.getEmlpoyeIndex(this.username, this.password);
  //       if (employeeIndex !== -1) {
  //         const employee = this.emp[employeeIndex];
  //         localStorage.setItem("username",employee.nom.toString());
  //         localStorage.setItem("prenom", employee.prenom.toString());
  //         localStorage.setItem("cin", employee.cin.toString());
  //       // console.log(this.getEmplFonction)      
    
  //       localStorage.setItem("is_connected","true")
  //       this.router.navigate(['/alerte'])
  //     }else{
  //       alert('invalid login ?? ')
  //     }
    
      
  //   }
  // }
  // )
  

  // }
  // login(): void {
  //   this.depserv.getEmployes().subscribe((resultat: any) => {
  //     this.emp = resultat;
  //     console.log(resultat);
  
  //     if (this.username === 'sameh' && this.password == 557592) {
  //       localStorage.setItem("is_connected", "true");
  //       this.router.navigate(['/employe']);
  //     } else if (this.chekclogin(this.username  , this.password)) {
  //       const employeeIndex = this.getEmlpoyeIndex(this.username, this.password);
  //       if (employeeIndex !== -1) {
  //         const employee = this.emp[employeeIndex];
  //         localStorage.setItem("username", employee.nom.toString());
  //         localStorage.setItem("prenom", employee.prenom.toString());
  //         localStorage.setItem("cin", employee.cin.toString());
  //         localStorage.setItem("is_connected", "true");
  //         this.router.navigate(['/alerte']);
  //       } else {
  //         alert('Invalid login ??');
  //       }
  //     }
  //   });
  // }
  login(): void {
    this.depserv.getEmployes().subscribe((resultat: any) => {
      this.emp = resultat;
      console.log(resultat);

     if (this.chekclogin(this.username,this.surname, this.password)) {
        const employeeIndex = this.getEmlpoyeIndex(this.username,this.surname, this.password);
        if (employeeIndex !== -1) {
          const employee = this.emp[employeeIndex];
          localStorage.setItem("username", employee.nom.toString());
          localStorage.setItem("prenom", employee.prenom.toString());
          localStorage.setItem("cin", employee.cin.toString());
          localStorage.setItem("typeUtilisation", employee.typeUtilisation.toString());
          localStorage.setItem("datenaissance", employee.datenaissance.toString());
          localStorage.setItem("fonction", employee.fonction.toString());
          localStorage.setItem("idEmploye", employee.idEmploye.toString());




          localStorage.setItem("is_connected", "true");
          
          // Redirect based on typeUtilisation
          if (employee.typeUtilisation === 'Administrateur') {
            this.router.navigate(['/employe']);
          } else if (employee.typeUtilisation === 'User') {
            this.router.navigate(['/alerte']);
          }
        } else {
          alert('Invalid login ??');
        }
      }
    });
  }
  getEmlpoyeIndex(username: string, surname:string, password :number): number{
    console.log(this.emp)
    let temp = this.emp.findIndex(user=> user.prenom ===  username &&user.nom === surname&& user.cin == password )
    console.log(temp)
    return temp

  }
  // getEmlpoyetype(Utilisatione: string ): boolean{
  //   console.log(this.emp)
  //   let temp = this.emp.findIndex(user=> user.typeUtilisation ===  this.Utilisation)
  //   console.log(temp)
  //   return temp

  // }
 
  chekclogin(username: string,surname:string, password: number): boolean {
    console.log(this.username,this.password)
    return this.getEmlpoyeIndex(username,surname,password) !== -1;
  }
  

  

}


