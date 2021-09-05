import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { waiverservice } from '../waiverservices.service';
import { common } from '../common';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-waiver',
  templateUrl: './add-waiver.component.html',
  styleUrls: ['./add-waiver.component.css']
})
export class AddWaiverComponent implements OnInit {
  years:common[];
  waiverStatuses:common[];
  ProductFamily:common[];
  ProductLine:any[];
  QMs:common[];
  WOs:common[];
  DefectTypes:common[];
  DefectStatus:common[];
  lstcommon:any[];
  QSOTrue:boolean;
  SuccessMsg:any;
  ismsg:boolean;
  Orgs:common[];
  isedit:boolean=false;
  constructor(private service:waiverservice) { }


  ngOnInit() {
   this.GetYearTable();
   this.GetYearProductFamily();
   this.GetYearProductLine();
   this.GetDefectType();
   this.GetDefectStatus();
   this.GetWaiverOwner();
   this.getmanager();
   this.getwaiverManager();
   this.GetOrganization();
    this.service.GetControl("DefectTable");

  }

 GetYearTable()
 {
  this.service.GetControl("Year").subscribe(
    data=>{
      //console.log(this.years)
     this.years= data;
    }
    );
    console.log(this.years)
 }
 GetYearProductFamily()
 {
  this.service.GetControl("ProductFamily").subscribe(
    data=>{
     this.ProductFamily= data;
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
 GetDefectStatus()
 {
  this.service.GetControl("StatusTable").subscribe(
    data=>{
     this.DefectStatus= data;
    }

    );
 }
 GetWaiverOwner()
 {
  this.service.GetControlManager("WaiverManager").subscribe(
    data=>{
     this.WOs= data;
    }

    );
 }
 GetOrganization()
 {
  this.service.GetControlManager("Organtizaiton").subscribe(
    data=>{      this.Orgs= data;    }

    );
 }
 IsEdit()
 {
   if(this.isedit)
   this.isedit=false;
   else
   this.isedit=true;

 }
getmanager()
{
  this.service.GetControlManager("QSOManager").subscribe(
    data=> this.QMs=data
  )
}
ISQSO(val:any)
{
  if(val==1)
  this.QSOTrue=true;
  else
  this.QSOTrue=false;
}
getwaiverManager() 
{
  this.service.GetControlManager("WaiverManager").subscribe(
    data=> this.WOs =data
  )
}

Search(Waiver:any)
{

  if(!this.QSOTrue)
  this.QSOTrue=true;
  else
  this.QSOTrue=false;

this.service.GetWaiverInfo(Waiver.value).subscribe(
data=>console.log(data)
)
}

  WaiverSubmit(value:NgForm) {
    this.ismsg=true;
    this.service.SaveWaiverDB(value).subscribe(
      data=>
      this.SuccessMsg=data    )
  }

  clearForm(waiverForm:NgForm) {
    waiverForm.form.reset();
   }




}
