import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { LoginComponent } from './modules/login/login.component';
import { PlanComponent } from './modules/plan/plan.component';
import { ObjectiveComponent } from './modules/objective/objective.component';
import { StatusReportComponent } from './modules/status-report/status-report.component';
import { SearchEmployeeComponent } from './modules/search-employee/search-employee.component';
import { ReviewAPAComponent } from './modules/review-apa/review-apa.component';
import { SUPERVISORYPOSITIONSComponent } from './modules/supervisorypositions/supervisorypositions.component';
import { SummaryComponent } from './modules/summary/summary.component';
import { SinglePageReportComponent } from './modules/single-page-report/single-page-report.component';
import { ApaStatusComponent } from './modules/apa-status/apa-status.component';
import { DetailReportComponent } from './modules/detail-report/detail-report.component';
import { ExceptionComponent } from './modules/exception/exception.component';
import { MyApaComponent } from './modules/my-apa/my-apa.component';
import { PrintApaComponent } from './modules/print-apa/print-apa.component';
import { ViewPlanComponent } from './modules/view-plan/view-plan.component';
import { ViewAnnualPlanComponent } from './modules/view-annual-plan/view-annual-plan.component';
import { ViewExceptionComponent } from './modules/view-exception/view-exception.component';
import { NONSUPERVISORYPOSITIONSComponent } from './modules/nonsupervisorypositions/nonsupervisorypositions.component';
import { EditObjectiveComponent } from './modules/edit-objective/edit-objective.component';
import { FinalRatingComponent } from './modules/final-rating/final-rating.component';
import { GuiedComponent } from './modules/guied/guied.component';
import { PrintallComponent } from './modules/printall/printall.component';
import { EmployeeMappingComponent } from './modules/employee-mapping/employee-mapping.component';
import { AnnualPlanExpectedComponent } from './modules/annual-plan-expected/annual-plan-expected.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
      path:'',
      component:FullwidthComponent,
      children:[{
        path:'login',
        component:LoginComponent
      }]
    },
    {
    path:'',
    component:DefaultComponent,
    children:[{
      path:'dashboard',
      component:DashboardComponent
    },
    {path:'plan',component:PlanComponent },
    {path:'Objective/:id/:startDate/:endDate',component:ObjectiveComponent },
    {path:'status',component:StatusReportComponent },
    {path:'search',component:SearchEmployeeComponent },
    {path:'reviewapa',component:ReviewAPAComponent },
    {path:'summary',component:SummaryComponent },
    {path:'single',component:SinglePageReportComponent },
    {path:'apaStatus',component:ApaStatusComponent },
    {path:'supervisory',component:SUPERVISORYPOSITIONSComponent },
    {path:'detail',component:DetailReportComponent },
    {path:'exception',component:ExceptionComponent },
    {path:'myapa',component:MyApaComponent },
    {path:'print',component:PrintApaComponent },
    {path:'viewPlan/:id/:period',component:ViewPlanComponent },
    {path:'viewPlan',component:ViewAnnualPlanComponent },
    {path:'viewException/:id/:period',component:ViewExceptionComponent},
    {path:'exportWord/:id/:period',component:NONSUPERVISORYPOSITIONSComponent},
    {path:'editObjective/:id/:period',component:EditObjectiveComponent},
    {path:'final',component:FinalRatingComponent},
    {path:'Guied',component:GuiedComponent},
    {path:'printAll/:id',component:PrintallComponent},
    {path:'mapping',component:EmployeeMappingComponent},
    {path:'expectedPlan',component:AnnualPlanExpectedComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
