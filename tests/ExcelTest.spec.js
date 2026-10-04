const {test} = require('@playwright/test');
const excelJs = require('exceljs');

async function ReadExcel(workSheet,searchText)
{
    let coordinates = {row:-1,column:-1};
    workSheet.eachRow((row,rownumber)=>{
        row.eachCell((cell, columnNumber)=>
        {
            if(cell.value === searchText)
            {
               coordinates.row = rownumber;
               coordinates.column = columnNumber;
            }
        })
    })
    return coordinates;
}

async function WriteExcel(filePath,searchText,replacedText,change)
{
    const workBook = new excelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet('Sheet1');
    const coordinates = await ReadExcel(workSheet,searchText)
    const cell = await workSheet.getCell(coordinates.row, coordinates.column + change.columnA);
    cell.value = replacedText;
    await workBook.xlsx.writeFile(filePath);
}

test('Upload and Download Excel', async({page})=>{
     await page.goto("https://rahulshettyacademy.com/upload-download-test/");
     const downloadPromise = page.waitForEvent('download');
     await page.locator('#downloadButton').click();
     const download = await downloadPromise; 
     const filePath = '/Users/abhiramsmohan/Downloads/download.xlsx';
     await download.saveAs(filePath);
     await WriteExcel(filePath, "Mango", "356", {rowA:0, columnA: 2});
     await page.locator('#fileinput').click();
     await page.locator('#fileinput').setInputFiles(filePath)
})