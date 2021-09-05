import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Grid } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import { waiverservice } from '../waiverservices.service';
import { common } from '../common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-waiver',
  templateUrl: './search-waiver.component.html',
  styleUrls: ['./search-waiver.component.css']
})
export class SearchWaiverComponent implements OnInit {
  gridOptions: GridOptions;
  DefectStatus: common[];
  WOs:common[];
  QMs:common[];
  DefectTypes:common[];
  ProductLine:common[];
  Years:common[];
  Months:common[];
  constructor(private service: waiverservice, private router:ActivatedRoute, private routerts: Router) {
    this.gridOptions = <GridOptions>{
      filter: true,
      pagination:true,
      paginationPageSize: 90,
      rowSelection: 'multiple',
      enableColResize: true,
      animateRows: true,

      defaultColDef:
      {
        editable: true,
        sortable: true,
        headerHeight: 10,
        cellStyle: { 'text-align': 'center' },
        enableSorting: true,
        floatingfilter: true,
        enablefloatingfilter: true,
        pagination: true,
        filter: true
      },

    }
    this.gridOptions.columnDefs = [
      { headerName: 'WaiverID ', field: 'WaiverID', width: 100,cellStyle: { color: 'blue' }, pinned: 'left'  },
      { headerName: 'Month ', field: 'Month', width: 100 },
      { headerName: 'Year ', field: 'Year', width: 100 },
      { headerName: 'ProductFamily ', field: 'ProductFamily', width: 200 },
      { headerName: 'ProductLine ', field: 'ProductLine', width: 100 },
      { headerName: 'Organization ', field: 'Organization', width: 200 },
      { headerName: 'QSO_Only ', field: 'QSO_Only', width: 200 },
      { headerName: 'QualityManager ', field: 'QualityManager', width: 200 },
      { headerName: 'Waiver_Owner ', field: 'Waiver_Owner', width: 200 },
      { headerName: 'Target_SHP_Date ', field: 'Target_SHP_date', width: 200 },
      { headerName: 'WaiverType(Defect) ', field: 'WaiverType', width: 200 },
      { headerName: 'Waiver_Status ', field: 'Waiver_Status', width: 200 },
      { headerName: 'TargetClosureDate ', field: 'TargetClosureDate', width: 200 },
      { headerName: 'ProductNumber ', field: 'ProductNumber', width: 200 },
      { headerName: 'ProductName ', field: 'ProductName', width: 200 },
      { headerName: 'QSODocumentLink ', field: 'QSODocumentLink', width: 200 },
      { headerName: 'WaiverDocumentLink ', field: 'WaiverDocumentLink', width: 200 },
      { headerName: 'Comments ', field: 'Comments', width: 200 },
      { headerName: 'DateClosed ', field: 'DateClosed', width: 200 },

    ];

  }

  WaiverSearch(value: any) {
    console.log(value);
  }

  clearForm(waiverForm: NgForm) {
    waiverForm.form.reset();
  }

  Search(waiverForm: NgForm) {
this.service.SearchWaiver(waiverForm).subscribe(
  data=>{
    console.log(data)
    this.gridOptions.api.setRowData(data.Orders);
  }
)
  }

  ngOnInit() {
    this.GetDefectStatus();
    this.getmanager();
    this.getwaiverManager();
    this.GetYearProductLine();
    this.GetDefectType();
    this.getYear();
    this.getMonth();
  }

  getYear() {
    this.service.GetControl("YearTable").subscribe(
      data => {
        this.Years = data;
      }
    );
  }

  onCellClicked(event:any)
  {
    if (event.colDef.field == "WaiverID")
    this.routerts.navigate(['EditWaiver',event.value])
    
  }
  getMonth() {
    this.service.GetControl("Monthtable").subscribe(
      data => {
        this.Months = data;
      }
    );
  }
  GetDefectStatus() {
    this.service.GetControl("StatusTable").subscribe(
      data => {
        this.DefectStatus = data;
      }

    );
    
  }
  GetYearProductLine()
  {
   this.service.GetControl("ProductLine").subscribe(
     data=>{      this.ProductLine= data;   }   );

  }

  GetDefectType()
 {
  this.service.GetControl("DefectTable").subscribe(
    data=>{
     this.DefectTypes= data;
    }

    );
 }
 
  getmanager() {
    this.service.GetControlManager("QSOManager").subscribe(
      data => this.QMs = data
    )
  }
  getwaiverManager() {
    this.service.GetControlManager("WaiverManager").subscribe(
      data => this.WOs = data
    )
  }

  btnexport()
  {
    this.gridOptions.api.exportDataAsCsv();
  }
}