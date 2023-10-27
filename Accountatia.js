var table = document.getElementById('table');
var table2 = document.getElementById('table2');
var table3 = document.getElementById('table3');

document.getElementById('main2').style.display = 'flex';
document.getElementById('div-table').style.display = 'block';
document.getElementById('main3').style.display = 'flex';
document.getElementById('buttonField').style.display = 'block';
document.getElementById('main4').style.display = 'none';
document.getElementById('div-table2').style.display = 'none';
document.getElementById('main5').style.display = 'none';
document.getElementById('div-table3').style.display = 'none';
document.getElementById('buttonField2').style.display = 'none';

var addings = {
    'incomes': {},
    'administrative expenses': {},
    'distribution expenses': {},
    'financial expenses': {},
    'other expenses': {},
    'non-current assets': {},
    'current assets': {},
    'non-current liabilities': {},
    'current liabilities': {}
};

var debitIds = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'd19', 'd20', 'd21', 'd22', 'd23', 'd24', 'd25', 'd26', 'd27', 'd28', 'd29', 'd30'];

var creditIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29', 'c30'];

var debitTotalCell = document.getElementById("debitTotalCell");
var creditTotalCell = document.getElementById("creditTotalCell");
var index = 11;


var details = {};

function currencySelect(currency) {
    if (currency == "Default") {
        return false;
    } else
        return true;
}

var isValid;

function validateForm() {

    isValid = true;

    d1 = document.getElementById('d1').value;
    d2 = document.getElementById('d2').value;
    d3 = document.getElementById('d3').value;
    d4 = document.getElementById('d4').value;
    d5 = document.getElementById('d5').value;
    d6 = document.getElementById('d6').value;
    d7 = document.getElementById('d7').value;
    d8 = document.getElementById('d8').value;
    d9 = document.getElementById('d9').value;
    d10 = document.getElementById('d10').value;
    c1 = document.getElementById('c1').value;
    c2 = document.getElementById('c2').value;
    c3 = document.getElementById('c3').value;
    c4 = document.getElementById('c4').value;
    c5 = document.getElementById('c5').value;
    c6 = document.getElementById('c6').value;
    c7 = document.getElementById('c7').value;
    c8 = document.getElementById('c8').value;
    c9 = document.getElementById('c9').value;
    c10 = document.getElementById('c10').value;

    details = {
        'Equity': { 'value': parseFloat(d1) + parseFloat(c1) },
        'Sales': { 'value': parseFloat(d2) + parseFloat(c2) },
        'Sales Return': { 'value': parseFloat(d3) + parseFloat(c3) },
        'Carriage Inwards': { 'value': parseFloat(d4) + parseFloat(c4) },
        'Purchases': { 'value': parseFloat(d5) + parseFloat(c5) },
        'Freight Charges': { 'value': parseFloat(d6) + parseFloat(c6) },
        'Custom Duty': { 'value': parseFloat(d7) + parseFloat(c7) },
        'Purchase Return': { 'value': parseFloat(d8) + parseFloat(c8) },
        'Opening Stock': { 'value': parseFloat(d9) + parseFloat(c9) },
        'Drawings': { 'value': parseFloat(d10) + parseFloat(c10) },
        'Closing Stock': { 'value': parseFloat(document.getElementById('closingStock1').value) }
    }

    var fullname = document.getElementById("name1").value;
    var currency = document.getElementById("currency1").value;
    var originaldate = document.getElementById("date1").value;


    var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (fullname == "") {
        alert("Enter the name of the entity!");
        isValid = false;
    }

    if (currencySelect(currency) == false) {
        alert("Please select the Currency ");
        isValid = false;
    }

    if (originaldate == "") {
        alert("select a date!");
        isValid = false;
    } else {
        var date = new Date(originaldate);
        var year = date.getFullYear();
        var month = monthArray[date.getMonth() + 1];
        var day = date.getDate();
        var fullDate = day + " " + month + " " + year;
        console.log(fullDate);
    }

    for (const type in addings) {
        if (Object.keys(addings[type]).length !== 0) {
            for (const transaction in addings[type]) {
                var value1 = document.getElementById(addings[type][transaction].c.id).value;
                var value2 = document.getElementById(addings[type][transaction].d.id).value;
                addings[type][transaction].value = parseFloat(value1) + parseFloat(value2);
            }

        }
    }

    if (isValid) {
        var header1 = document.getElementById('header1');
        var header2 = document.getElementById('header2');
        var header3 = document.getElementById('header3');
        var header4 = document.getElementById('header4');
        var header5 = document.getElementById('header5');
        var header6 = document.getElementById('header6');
        header1.innerHTML = fullname;
        header2.innerHTML = "For the year ended on " + fullDate;
        header3.innerHTML = "Statement of P&L and OCI &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(" + currency + ')';
        header4.innerHTML = fullname;
        header5.innerHTML = "For the year ended on " + fullDate;
        header6.innerHTML = "Statement of Financial Position &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(" + currency + ')';
        funcTotal();
        funcTable2();
        funcTable3();
    } else {
        //location.reload();
    }



}

function insertFunc(dropValue, type) {

    var selection = addings[type];
    var newRow = table.insertRow(index);

    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);

    var newText = document.createTextNode(dropValue);
    newCell1.appendChild(newText);

    selection[dropValue] = { 'd': '', 'c': '' };

    selection[dropValue].d = document.createElement("INPUT");
    selection[dropValue].d.setAttribute("type", "text");
    selection[dropValue].d.setAttribute("class", "cd");
    selection[dropValue].d.setAttribute("id", "d" + index);
    selection[dropValue].d.setAttribute("value", "0");
    //console.log(selection[dropValue].d.id);

    selection[dropValue].c = document.createElement("INPUT");
    selection[dropValue].c.setAttribute("type", "text");
    selection[dropValue].c.setAttribute("class", "cd");
    selection[dropValue].c.setAttribute("id", "c" + index);
    selection[dropValue].c.setAttribute("value", "0");
    //console.log(selection[dropValue].c.id);


    newCell2.appendChild(selection[dropValue].d);
    newCell3.appendChild(selection[dropValue].c);


    selection[dropValue].name = dropValue;
    console.log(addings["incomes"]);

    index++;

}



function funcTotal() {

    var debitTotal = 0;
    var creditTotal = 0;


    for (let i = 0; i < index - 1; i++) {
        let cell1 = document.getElementById(debitIds[i]);
        let cell2 = document.getElementById(creditIds[i]);

        debitTotal += parseInt(cell1.value);
        creditTotal += parseInt(cell2.value);
    }
    debitTotalCell.innerHTML = debitTotal;
    creditTotalCell.innerHTML = creditTotal;
}

var cells = {}
var grossProfit = 0;
var netProfit = 0;
var costOfSales = 0;
var id1 = 0;
var id2 = 0;
var id3 = 0;
var id4 = 0;
var id5 = 0;
var id6 = 0;
var id7 = 0;
var id8 = 0;
var id9 = 0;
var totalIncome = 0;
var totalExpense1 = 0;
var totalExpense2 = 0;
var totalExpense3 = 0;
var totalExpense4 = 0;
var totalAssets1 = 0;
var totalAssets2 = 0;
var totalEquity = 0;
var totalLiabilities1 = 0;
var totalLiabilities2 = 0;
var indexPnL = 15;
var indexFP = 2;

function funcTable2() {

    document.getElementById('main2').style.display = 'none';
    document.getElementById('div-table').style.display = 'none';
    document.getElementById('main3').style.display = 'none';
    document.getElementById('buttonField').style.display = 'none';
    document.getElementById('main4').style.display = 'block';
    document.getElementById('div-table2').style.display = 'block';
    document.getElementById('main5').style.display = 'block';
    document.getElementById('div-table3').style.display = 'block';
    document.getElementById('buttonField2').style.display = 'block';

    for (let i = 1; i < 45; i++) {
        document.getElementById('r' + i + 'c2').style.textAlign = 'right';
        document.getElementById('r' + i + 'c3').style.textAlign = 'right';
    }


    document.getElementById('r2c3').innerHTML = details.Sales.value;
    document.getElementById('r3c3').innerHTML = details["Sales Return"].value;
    document.getElementById('r4c1').style.textDecoration = 'underline';
    document.getElementById('r5c2').innerHTML = details["Opening Stock"].value;
    document.getElementById('r6c2').innerHTML = details.Purchases.value;
    document.getElementById('r7c2').innerHTML = details['Freight Charges'].value;
    document.getElementById('r8c2').innerHTML = details["Carriage Inwards"].value;
    document.getElementById('r9c2').innerHTML = details["Custom Duty"].value;
    document.getElementById('r10c2').innerHTML = details["Closing Stock"].value;
    document.getElementById('r11c2').innerHTML = details["Purchase Return"].value;

    costOfSales = details["Opening Stock"].value + details.Purchases.value + details["Carriage Inwards"].value + details['Freight Charges'].value + details['Custom Duty'].value - details["Closing Stock"].value - details["Purchase Return"].value;

    document.getElementById('r11c3').innerHTML = costOfSales;

    grossProfit = details.Sales.value - details["Sales Return"].value - costOfSales;

    document.getElementById('r13c3').innerHTML = '<b>' + grossProfit + '</b>';



    for (const member in addings.incomes) {

        var newRow = table2.insertRow(indexPnL);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['incomes'][member].name;
        newCell2.innerHTML = addings['incomes'][member].value;
        totalIncome = totalIncome + parseFloat(addings['incomes'][member].value);
        id1 = indexPnL;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell2.setAttribute('class', 'lr');
        newCell3.setAttribute('class', 'lr');
        newCell1.setAttribute('id', 'idb' + indexPnL);
        newCell2.setAttribute('id', 'idl' + indexPnL);
        newCell3.setAttribute('id', 'idr' + indexPnL);
        console.log(newCell3.id);

        indexPnL++;
    }

    if (Object.keys(addings['incomes']).length !== 0) {
        document.getElementById('idr' + id1).setAttribute('class', 'lru');
        document.getElementById('idl' + id1).setAttribute('class', 'lru');
        document.getElementById('idr' + id1).innerHTML = totalIncome;
    }


    for (const member in addings['administrative expenses']) {

        var newRow = table2.insertRow(indexPnL + 2);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['administrative expenses'][member].name;
        newCell2.innerHTML = addings['administrative expenses'][member].value;
        totalExpense1 += parseFloat(addings['administrative expenses'][member].value);
        id2 = indexPnL;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell2.setAttribute('class', 'lr');
        newCell3.setAttribute('class', 'lr');
        newCell1.setAttribute('id', 'idb' + indexPnL);
        newCell2.setAttribute('id', 'idl' + indexPnL);
        newCell3.setAttribute('id', 'idr' + indexPnL);
        console.log(newCell3.id);
        indexPnL++;
    }

    if (Object.keys(addings['administrative expenses']).length !== 0) {
        document.getElementById('idr' + id2).setAttribute('class', 'lru');
        document.getElementById('idl' + id2).setAttribute('class', 'lru');
        document.getElementById('idr' + id2).innerHTML = totalExpense1;
    }



    for (const member in addings['distribution expenses']) {

        var newRow = table2.insertRow(indexPnL + 4);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['distribution expenses'][member].name;
        newCell2.innerHTML = addings['distribution expenses'][member].value;
        totalExpense2 += parseFloat(addings['distribution expenses'][member].value);
        id3 = indexPnL;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell2.setAttribute('class', 'lr');
        newCell3.setAttribute('class', 'lr');
        newCell1.setAttribute('id', 'idb' + indexPnL);
        newCell2.setAttribute('id', 'idl' + indexPnL);
        newCell3.setAttribute('id', 'idr' + indexPnL);
        console.log(newCell3.id);
        indexPnL++;
    }

    if (Object.keys(addings['distribution expenses']).length !== 0) {
        document.getElementById('idr' + id3).setAttribute('class', 'lru');
        document.getElementById('idl' + id3).setAttribute('class', 'lru');
        document.getElementById('idr' + id3).innerHTML = totalExpense2;
    }


    for (const member in addings['financial expenses']) {

        var newRow = table2.insertRow(indexPnL + 6);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['financial expenses'][member].name;
        newCell2.innerHTML = addings['financial expenses'][member].value;
        totalExpense3 += parseFloat(addings['financial expenses'][member].value);
        id4 = indexPnL;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell2.setAttribute('class', 'lr');
        newCell3.setAttribute('class', 'lr');
        newCell1.setAttribute('id', 'idb' + indexPnL);
        newCell2.setAttribute('id', 'idl' + indexPnL);
        newCell3.setAttribute('id', 'idr' + indexPnL);
        indexPnL++;
    }

    if (Object.keys(addings['financial expenses']).length !== 0) {
        document.getElementById('idr' + id4).setAttribute('class', 'lru');
        document.getElementById('idl' + id4).setAttribute('class', 'lru');
        document.getElementById('idr' + id4).innerHTML = totalExpense3;
    }

    for (const member in addings['other expenses']) {

        var newRow = table2.insertRow(indexPnL + 8);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['other expenses'][member].name;
        newCell2.innerHTML = addings['other expenses'][member].value;
        totalExpense4 += parseFloat(addings['other expenses'][member].value);
        id9 = indexPnL;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell2.setAttribute('class', 'lr');
        newCell3.setAttribute('class', 'lr');
        newCell1.setAttribute('id', 'idb' + indexPnL);
        newCell2.setAttribute('id', 'idl' + indexPnL);
        newCell3.setAttribute('id', 'idr' + indexPnL);
        indexPnL++;
    }

    if (Object.keys(addings['other expenses']).length !== 0) {
        document.getElementById('idr' + id9).setAttribute('class', 'lru');
        document.getElementById('idl' + id9).setAttribute('class', 'lru');
        document.getElementById('idr' + id9).innerHTML = totalExpense4;
    }




    netProfit = grossProfit + totalIncome - (totalExpense1 + totalExpense2 + totalExpense3 + totalExpense4);
    document.getElementById('r25c3').innerHTML = '<b>' + netProfit + '</b>';

}

function funcTable3() {



    for (const member in addings['non-current assets']) {

        var newRow = table3.insertRow(indexFP);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['non-current assets'][member].name;
        newCell2.innerHTML = addings['non-current assets'][member].value;
        totalAssets1 += parseFloat(addings['non-current assets'][member].value);
        id5 = indexFP;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell1.setAttribute('id', 'idb2' + indexFP);
        newCell2.setAttribute('id', 'idl2' + indexFP);
        newCell3.setAttribute('id', 'idr2' + indexFP);
        indexFP++;
    }

    if (Object.keys(addings['non-current assets']).length !== 0) {
        document.getElementById('idr2' + id5).setAttribute('class', 'lru');
        document.getElementById('idl2' + id5).setAttribute('class', 'lru');
        document.getElementById('idr2' + id5).innerHTML = totalAssets1;
    }


    for (const member in addings['current assets']) {

        var newRow = table3.insertRow(indexFP + 3);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['current assets'][member].name;
        newCell2.innerHTML = addings['current assets'][member].value;
        totalAssets2 += parseFloat(addings['current assets'][member].value);
        id6 = indexFP;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell1.setAttribute('id', 'idb2' + indexFP);
        newCell2.setAttribute('id', 'idl2' + indexFP);
        newCell3.setAttribute('id', 'idr2' + indexFP);
        indexFP++;
    }

    if (Object.keys(addings['current assets']).length !== 0) {
        document.getElementById('idr2' + id6).setAttribute('class', 'lru');
        document.getElementById('idl2' + id6).setAttribute('class', 'lru');
        document.getElementById('r31c2').innerHTML = details['Closing Stock'].value;
        totalAssets2 = totalAssets2 + details['Closing Stock'].value;
        document.getElementById('idr2' + id6).innerHTML = totalAssets2;
    } else {
        document.getElementById('r31c2').innerHTML = details['Closing Stock'].value;
        document.getElementById('r31c3').innerHTML = details['Closing Stock'].value;
        totalAssets2 = totalAssets2 + details['Closing Stock'].value;
        document.getElementById('r31c2').setAttribute('class', 'lru');
        document.getElementById('r31c3').setAttribute('class', 'lru');
    }


    document.getElementById('r33c3').innerHTML = '<b>' + (totalAssets1 + totalAssets2) + '</b>';

    document.getElementById('r36c2').innerHTML = details['Equity'].value;
    document.getElementById('r37c2').innerHTML = netProfit;
    document.getElementById('r38c2').innerHTML = details['Drawings'].value;

    totalEquity = details['Equity'].value - details['Drawings'].value + netProfit;
    document.getElementById('r38c3').innerHTML = totalEquity;


    for (const member in addings['non-current liabilities']) {

        var newRow = table3.insertRow(indexFP + 12);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['non-current liabilities'][member].name;
        newCell2.innerHTML = addings['non-current liabilities'][member].value;
        totalLiabilities1 += parseFloat(addings['non-current liabilities'][member].value);
        id7 = indexFP;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell1.setAttribute('id', 'idb2' + indexFP);
        newCell2.setAttribute('id', 'idl2' + indexFP);
        newCell3.setAttribute('id', 'idr2' + indexFP);
        indexFP++;
    }
    if (Object.keys(addings['non-current liabilities']).length !== 0) {
        document.getElementById('idr2' + id7).setAttribute('class', 'lru');
        document.getElementById('idl2' + id7).setAttribute('class', 'lru');
        document.getElementById('idr2' + id7).innerHTML = totalLiabilities1;
    }


    for (const member in addings['current liabilities']) {

        var newRow = table3.insertRow(indexFP + 14);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);
        newCell1.innerHTML = addings['current liabilities'][member].name;
        newCell2.innerHTML = addings['current liabilities'][member].value;
        totalLiabilities2 += parseFloat(addings['current liabilities'][member].value);
        id8 = indexFP;
        newCell2.style.textAlign = 'right';
        newCell3.style.textAlign = 'right';
        newCell1.setAttribute('id', 'idb2' + indexFP);
        newCell2.setAttribute('id', 'idl2' + indexFP);
        newCell3.setAttribute('id', 'idr2' + indexFP);
        indexFP++;
    }

    if (Object.keys(addings['current liabilities']).length !== 0) {
        document.getElementById('idr2' + id8).setAttribute('class', 'lru');
        document.getElementById('idl2' + id8).setAttribute('class', 'lru');
        document.getElementById('idr2' + id8).innerHTML = totalLiabilities2;
    }


    document.getElementById('r44c3').innerHTML = '<b>' + (totalLiabilities1 + totalLiabilities2 + totalEquity) + '</b>';

}




function funcBack() {
    document.getElementById('main2').style.display = 'flex';
    document.getElementById('div-table').style.display = 'flex';
    document.getElementById('main3').style.display = 'flex';
    document.getElementById('buttonField').style.display = 'block';
    document.getElementById('main4').style.display = 'none';
    document.getElementById('div-table2').style.display = 'none';
    document.getElementById('main5').style.display = 'none';
    document.getElementById('div-table3').style.display = 'none';
    document.getElementById('buttonField2').style.display = 'none';
    location.reload();

}