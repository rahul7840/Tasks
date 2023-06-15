

/*code return in TS and about the function what does
 that style the document with border even value not exist and bold the heading and also containt the 
 totle the given row that logic  using excel4node npm
 and user through in service
  await ExcelStreamer.multiHeaderWriter(
        fileName,
        lvel0Heders,
        lvel1Heders,
        columConfig,
        responce,
      );

*/

import { Generic } from './generic.utility';

var excel = require('excel4node');
export class ExcelStreamer {

  static async multiHeaderWriter(file, header0, header1, colums, data) {
    console.log(`[multiHeaderWriter] ::-`, {
      file,
      header0,
      header1,
      colums,
      data,
    });
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');
    let columnTotals = {}

    let columArrengement = [];

    // Create a reusable style
    var style = workbook.createStyle({
      font: {
        color: '#4C4646',
        size: 9,
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: '4C4646', 
      },
      alignment: {
        horizontal: 'left',
        vertical: 'bottom',
        wrapText: true,
      },
      border: {
        left: {
          style: 'thin',
          color: '000000',
        },
        right: {
          style: 'thin',
          color: '000000',
        },
        top: {
          style: 'thin',
          color: '000000',
        },
        bottom: {
          style: 'thin',
          color: '000000',
        },
      },
     
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    


    var headerStyle = workbook.createStyle({
      alignment: {
        // horizontal: 'center',
        horizontal:'left',
        vertical: 'bottom',
        wrapText: true,

      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: '4C4646', 
      },
      font: {
        bold:true,
        color: '#000000',
        size: 14,
      },
      border: {
        left: {
          style: 'thin',
          color: '000000',
        },
        right: {
          style: 'thin',
          color: '000000',
        },
        top: {
          style: 'thin',
          color: '000000',
        },
        bottom: {
          style: 'thin',
          color: '000000',
        },
      },

      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });



    var header2Style = workbook.createStyle({
      alignment: {
        // horizontal: 'center',
        horizonatal:'left',  
        vertical: 'center',
        wrapText: true,
        

      },
    
      font: {
        bold:true,
        color: '#000000',
        size: 10,
      },
      border: {
        left: {
          style: 'thin',
          color: '000000',
        },
        right: {
          style: 'thin',
          color: '000000',
        },
        top: {
          style: 'thin',
          color: '000000',
        },
        bottom: {
          style: 'thin',
          color: '000000',
        },
      },

      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    var borderStyle = workbook.createStyle({

        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' }

      });



    let row = 0;
    let ColumNo = {};


    
    if (Object.keys(header0)?.length) {
      row++;
      let colum1 = 1;
      let colum2 = 1;
      for (let [key, value] of Object.entries(header0)) {
        console.log(`Header O Loop :::-`, { key, value });
        let sub2: any = value;

        let mergeCell = 0;
        let sub2Length = {};
        for await (const a of sub2) {
          mergeCell = mergeCell + header1[a].length || 0;
          sub2Length[a] = header1[a].length;

          for await (const iterator of header1[a]) {
            columArrengement.push(iterator);
          }
          console.log(`Header 0 child Loop :::-`, { mergeCell });
        }
        console.log(`sub2Length :::-`, { sub2Length });


        worksheet
          .cell(row, colum1, row, colum1 + mergeCell - 1, true)
          .string(await Generic.convertToLabel(key))
          //.merge(row, colum1, 1, sub2.length)
          .style(headerStyle);
        console.log(
          `raw 1  :::-`,
          key,
          ':::-',
          row,
          colum1,
          row,
          colum1 + mergeCell - 1,
        );
        colum1 = colum1 + mergeCell;

        
        for await (const colName of sub2) {
          worksheet
            .cell(
              row + 1,
              colum2,
              row + 1,
              (colum2 + sub2Length[colName] || 0) - 1,
              true,
            )
            .string(await Generic.convertToLabel(colName))
            .style(header2Style);
          console.log(
            `raw 2  :::-`,
            colName,
            ':::-',
            row + 1,
            colum2,
            (colum2 + sub2Length[colName] || 0) - 1,
          );
          ColumNo[colName] = colum2;
          colum2 = colum2 + (sub2Length[colName] || 0);
        }
      }
    }
    row++;

    let colum2 = 1;

    for await (const colName of columArrengement) {
      worksheet
        .cell(row + 1, colum2)
        .string(colName)
        .style(header2Style);
      ColumNo[colName] = colum2;
      colum2++;

      console.log(`colum2 :::-`, row + 1, colum2);
    }
    

    for await (const colName of colums) {
      if (!columArrengement.includes(colName)) {
        worksheet
          .cell(row + 1, colum2)
          .string(colName)
          .style(header2Style);
        ColumNo[colName] = colum2;
        colum2++;

        console.log(`colum2 :::-`, row + 1, colum2);
      }
    }
    row++;
         
// Calculate total row
    // if (Object.keys(data)?.length) {
    //   for await (const rowData of data) {
    //     row++;
    //     let col = 0;
    //     for (let [key, value] of Object.entries(rowData)) {
    //       col++;
    //       if (!value) {
    //         value = '-';
    //       }
    //       if (typeof value == 'number') {
    //         value = String(value); // Cast number to string
    //     if (columnTotals[key]) {
    //       columnTotals[key] += parseFloat(value as string); // Type assertion to specify it as string
    //     } else {
    //       columnTotals[key] = parseFloat(value as string);
    //     }
    //       }
    //       if (typeof value != 'object') {
    //         worksheet.cell(row, ColumNo[key]).string(value).style(style);
    //       }
    //     }
    //   }
    // }
    
    
// Calculate total row
if (Object.keys(data)?.length) {
  for await (const rowData of data) {
    row++;
    let col = 0;
    for (let [key, value] of Object.entries(rowData)) {
      col++;
      if (!value) {
        value = '-';
        worksheet
          .cell(row, ColumNo[key])
          .string(' ') // Add a space as an empty value
          .style(style)
          .style({ border: borderStyle }); // Apply border style
      } else {
        if (typeof value == 'number') {
          value = String(value); // Cast number to string
          if (columnTotals[key]) {
            columnTotals[key] += parseFloat(value as string); // Type assertion to specify it as string
          } else {
            columnTotals[key] = parseFloat(value as string);
          }
        }
        if (typeof value != 'object') {
          if (!value) {
            worksheet
              .cell(row, ColumNo[key])
              .string(' ') // Add a space as an empty value
              .style(style)
              .style({ border: borderStyle }); // Apply border style
          } else {
            worksheet.cell(row, ColumNo[key]).string(value).style(style);
          }
        }
      }
    }
  }
}

  
      if (Object.keys(columnTotals)?.length) {
    row++;
    for (let [key, value] of Object.entries(columnTotals)) {
      worksheet.cell(row, ColumNo[key]).string(value.toString()).style(header2Style);
    }
    }
   // Add 'Total' label in the first cell of the total row
      worksheet.cell(row , 1).string('Total').style(header2Style);


    worksheet.cell(3, 1, row, colum2 - 1).style(style);
    workbook.write(file);
  }



         
}

