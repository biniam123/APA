import {Injectable} from '@angular/core';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION='.xlsx';
@Injectable({
    providedIn:'root'
})
export class ExcelService{
    constructor(){}
    public exportAsExcelFile(
        reportHeading:string,
        reportSubHeading:string,
        headerArray:any[],
        json:any,
        excelFileName:string,
        sheetName:string
    ){
        const header=headerArray;
        const data=json;
        const workbook=new Excel.Workbook();
        workbook.creator='Snippet Coder';
        workbook.lastModifiedBy='snippetCoder';
        workbook.created=new Date();
        workbook.modified=new Date();
        const worksheet=workbook.addWorksheet(sheetName);

        worksheet.addRow([]);
        worksheet.mergeCells('A1:'+this.numToAlpha(header.length-1)+'1');
        worksheet.getCell('A1').value=reportHeading;
        worksheet.getCell('A1').alignment={horizontal:'center'};
        worksheet.getCell('A1').font={size:15,bold:true};

        if(reportSubHeading!==''){
            worksheet.addRow([]);
            worksheet.mergeCells('A2:'+this.numToAlpha(header.length-1)+'2');
        worksheet.getCell('A2').value=reportSubHeading;
        worksheet.getCell('A2').alignment={horizontal:'center'};
        worksheet.getCell('A2').font={size:12,bold:false};
        }
        worksheet.addRow([]);
        const headerRow=worksheet.addRow(header);
        headerRow.eachCell((cell,index)=>{
            cell.fill={
                type:'pattern',
                pattern:'solid',
                fgColor:{argb:'FFFFFF00'},
                bgColor:{argb:'FF0000FF'}
            };
            cell.border={top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}};
            cell.font={size:12,bold:true};
            worksheet.getColumn(index).width=header[index-1].length<20?20:header[index-1].length;
        });
        let columnArray:any[];
        for(const key in json){
            if(json.hasOwnProperty(key)){
                columnArray=Object.keys(json[key]);
            }
        }
        data.forEach((element:any)=>{
            const eachRow:any=[];
            columnArray.forEach((column)=>{
                eachRow.push(element[column]);
            });
            if(element.isDeleted==='Y'){
                const deleteRow=worksheet.addRow(eachRow);
                deleteRow.eachCell((cell)=>{
                    cell.font={name:'Calibri',family:4,size:11,bold:false,strike:true};
                });
            }
            else{
                worksheet.addRow(eachRow);
            }
        });
        worksheet.addRow([]);
        workbook.xlsx.writeBuffer().then((data:ArrayBuffer)=>{
            const blob=new Blob([data],{type:EXCEL_TYPE});
            fs.saveAs(blob,excelFileName+EXCEL_EXTENSION);
        });
    }   
    private numToAlpha(num:number){
        let alpha='';
        for(;num>=0;num=parseInt((num/26).toString(),10)-1){
            alpha=String.fromCharCode(num%26+0x41)+alpha;
        }
        return alpha;
    }
}