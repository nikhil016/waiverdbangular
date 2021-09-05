import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { waiverservice } from '../waiverservices.service';
import { common } from '../common';
import { RouterInitializer } from '@angular/router/src/router_module';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { waiverinfo } from '../WaiverInfo';

@Component({
  selector: 'app-edit-waiver',
  templateUrl: './edit-waiver.component.html',
  styleUrls: ['./edit-waiver.component.css']
})
export class EditWaiverComponent implements OnInit {

  years: common[];
  waiverStatuses: common[];
  ProductFamily: common[];
  ProductLine: any[];
  QMs: common[];
  WOs: common[];
  DefectTypes: common[];
  // DefectStatus:common[];
  lstcommon: any[];
  QSOTrue: boolean;
  SuccessMsg: any;
  ismsg: boolean;
  Orgs: common[];
  isedit: boolean;
  waiverid: any;
  // form value

  StrProductFamily: any;
  organizations: any="HST";
  StrProductLine: any;
  QualityManager: any;
  WaiverOwner: any;
  targetshpDate: any;
  DefectStatus: any;
  Waiver_Status: any;
  targetClosureDate: any;
  ProductNumber: any;
  productName: any;
  QSODocumentLink: any;
  WaiverDocumentLink: any;
  comments: any;
  QSO_Only:any;

  FormValues: waiverinfo;
  WaiverId:any;

  constructor(private service: waiverservice, private route: ActivatedRoute,private routerts: Router) { }


  ngOnInit() {
    this.GetOrganization();
    this.GetYearTable();
    this.GetYearProductFamily();
    this.GetYearProductLine();
    this.GetDefectType();
    this.GetDefectStatus();
    this.GetWaiverOwner();
    this.getmanager();
    this.getwaiverManager();
   
    this.service.GetControl("DefectTable");
    this.waiverid = this.route.snapshot.params['waiverid'];
    this.GetwavierInfo(this.waiverid)
  }

  GetwavierInfo(waiverid) {
    this.service.GetWaiverInfo(waiverid).subscribe(
      data => {
        console.log(data)
        this.WaiverId=waiverid;
      this.FormValues = data;    
      this.StrProductFamily= data.ProductFamily;
      this.organizations= data.Organization
      this.StrProductLine=  data.ProductLine
      this.QualityManager=  data.QualityManager
      this.WaiverOwner= data.Waiver_Owner
      this.targetshpDate= data.Target_SHP_Date
      this.DefectStatus= data.Defect
      this.Waiver_Status= data.Waiver_Status
      this.targetClosureDate=  data.TargetClosureDate
      this.ProductNumber= data.ProductNumber
      this.productName=data.ProductName;
      this.QSODocumentLink=  data.QSODocumentLink
      this.WaiverDocumentLink=  data.WaiverDocumentLink
      this.QSO_Only=  data.QSO_Only
      this.comments= data.Comments
      if(this.QSO_Only)
      this.QSOTrue = true;
      else
      this.QSOTrue = false;

      });
    
  }
  GetYearTable() {
    this.service.GetControl("Year").subscribe(
      data => {
        this.years = data;
      }
    );
  }


  GetYearProductFamily() {
    this.service.GetControl("ProductFamily").subscribe(
      data => {
        this.ProductFamily = data;
      }

    );
  }
  GetYearProductLine() {
    this.service.GetControl("ProductLine").subscribe(
      data => { this.ProductLine = data; });
  }

  GetDefectType() {
    this.service.GetControl("DefectTable").subscribe(
      data => {
        this.DefectTypes = data;
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
  DeleteWaiver(waiverid)
  {
    confirm("Do you want to Delet waiver id "+ waiverid +" ?")
    {
      this.service.DeleteRecord(waiverid).subscribe(
        data => {
          alert(data.Orders);
        }
  
      );
      // setTimeout( this.routerts.navigate(['searchWaiver']),5000)
     
    }
    
  }
  GetWaiverOwner() {
    this.service.GetControlManager("WaiverManager").subscribe(
      data => {
        this.WOs = data;
      }

    );
  }
  GetOrganization() {
    this.service.GetControlManager("Organtizaiton").subscribe(
      data => { this.Orgs = data; }

    );
  }
  IsEdit() {
    if (this.isedit)
      this.isedit = false;
    else
      this.isedit = true;

  }
  getmanager() {
    this.service.GetControlManager("QSOManager").subscribe(
      data => this.QMs = data
    )
  }
  ISQSO(val: any) {
    if (val == 1)
      this.QSOTrue = true;
    else
      this.QSOTrue = false;
  }
  getwaiverManager() {
    this.service.GetControlManager("WaiverManager").subscribe(
      data => this.WOs = data
    )
  }

  Search(Waiver: any) {

    if (!this.QSOTrue)
      this.QSOTrue = true;
    else
      this.QSOTrue = false;

    this.service.GetWaiverInfo(Waiver.value).subscribe(
      data => console.log(data)
    )
  }

  WaiverSubmit(value: NgForm) {
    this.ismsg = true;
    this.service.SaveWaiverDB(value).subscribe(
      data =>
        this.SuccessMsg = data)
  }

  clearForm(waiverForm: NgForm) {
    waiverForm.form.reset();
  }


}
