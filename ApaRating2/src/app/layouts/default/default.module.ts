import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/shared/shared.module';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { PlanComponent } from 'src/app/modules/plan/plan.component';
import { MatConfirmDialogComponent } from 'src/app/modules/mat-confirm-dialog/mat-confirm-dialog.component';
import { MyApaComponent } from 'src/app/modules/my-apa/my-apa.component';
import { NONSUPERVISORYPOSITIONSComponent } from 'src/app/modules/nonsupervisorypositions/nonsupervisorypositions.component';
import { ObjectiveComponent } from 'src/app/modules/objective/objective.component';
import { PrintApaComponent } from 'src/app/modules/print-apa/print-apa.component';
import { ReviewAPAComponent } from 'src/app/modules/review-apa/review-apa.component';
import { SearchEmployeeComponent } from 'src/app/modules/search-employee/search-employee.component';
import { SinglePageReportComponent } from 'src/app/modules/single-page-report/single-page-report.component';
import { StatusReportComponent } from 'src/app/modules/status-report/status-report.component';
import { SummaryComponent } from 'src/app/modules/summary/summary.component';
import { SUPERVISORYPOSITIONSComponent } from 'src/app/modules/supervisorypositions/supervisorypositions.component';
import { ViewAnnualPlanComponent } from 'src/app/modules/view-annual-plan/view-annual-plan.component';
import { ViewExceptionComponent } from 'src/app/modules/view-exception/view-exception.component';
import { ViewPlanComponent } from 'src/app/modules/view-plan/view-plan.component';
import { ApaStatusComponent } from 'src/app/modules/apa-status/apa-status.component';
import { CoreComponent } from 'src/app/modules/core/core.component';
import { DetailReportComponent } from 'src/app/modules/detail-report/detail-report.component';
import { ExceptionComponent } from 'src/app/modules/exception/exception.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EditObjectiveComponent } from 'src/app/modules/edit-objective/edit-objective.component';
import {NgChartsModule} from 'ng2-charts';
import { FinalRatingComponent } from 'src/app/modules/final-rating/final-rating.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GuiedComponent } from 'src/app/modules/guied/guied.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrintallComponent } from 'src/app/modules/printall/printall.component';
import { EmployeeMappingComponent } from 'src/app/modules/employee-mapping/employee-mapping.component';
import { AnnualPlanExpectedComponent } from 'src/app//modules/annual-plan-expected/annual-plan-expected.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PlanComponent,
    MatConfirmDialogComponent,
    MyApaComponent,
    NONSUPERVISORYPOSITIONSComponent,
    ObjectiveComponent,
    PrintApaComponent,
    ReviewAPAComponent,
    SearchEmployeeComponent,
    SinglePageReportComponent,
    StatusReportComponent,
    SummaryComponent,
    SUPERVISORYPOSITIONSComponent,
    ViewAnnualPlanComponent,
    ViewExceptionComponent,
    ViewPlanComponent,
    ApaStatusComponent,
    CoreComponent,
    DetailReportComponent,
    ExceptionComponent,
    EditObjectiveComponent,
    FinalRatingComponent,
    GuiedComponent,
    PrintallComponent,
    EmployeeMappingComponent,
    AnnualPlanExpectedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    NgChartsModule,
    BrowserAnimationsModule
    
  ],
  providers: [CdkScrollable],
})
export class DefaultModule { }
