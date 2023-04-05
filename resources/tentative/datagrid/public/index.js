

import * as foo from "./sqlite3-worker1-promiser.js";
import * as db from "./db.js";
console.log(foo);

const sheets = [
  { title: "Categories", sql: "select * from [Categories];" },
  { title: "Customers", sql: "select * from [Customers];" },
  {
    title: "EmployeeTerritories",
    sql: "select * from [EmployeeTerritories];",
  },
  { title: "Employees", sql: "select * from [Employees];" },
  { title: "OrderDetails", sql: "select * from [Order Details];" },
  {
    title: "OrderDetailsByProduct",
    sql: "select ProductID, COUNT(*) num, AVG(UnitPrice) average_price, AVG(Quantity) average_quantity from [Order Details] GROUP BY ProductID ORDER BY num DESC",
  },
  { title: "Orders", sql: "select * from [Orders];" },
  { title: "Products", sql: "select * from [Products];" },
  { title: "Regions", sql: "select * from [Regions];" },
  { title: "Shippers", sql: "select * from [Shippers];" },
  { title: "Suppliers", sql: "select * from [Suppliers];" },
  { title: "Territories", sql: "select * from [Territories];" },
];


async function runQuery(sheet) {
  let exec = await db.init();
  let result = await exec(sheet.sql);
  return result.result;
}

(async () => {
  let result = await runQuery(sheets[0]);
  console.log(result);
})()

