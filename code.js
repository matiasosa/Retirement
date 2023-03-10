// FUNCTIONS

//allows only letters into an input (in development)
function onlyAlpha(event){
    var x = String.fromCharCode(event.which);
    var key = event.keyCode;

    if(!(/[a-z]/i.test(event.key)) && key != 32)
    {
        event.preventDefault();
    }
}
//allows only numbers into an input (in development)
function onlyNumeric(event){
    var x = String.fromCharCode(event.which);
    var key = event.keyCode;

    if(!(/[0-9]/i.test(event.key)) && !(/[/]/i.test(event.key)) && (key < 37 || key > 40) && key != 8  && key != 9 && key != 13)
    {
        event.preventDefault();
    }
}

//transform date format from dd/mm/yyyy to mm/dd/yyyy
function orderDate(date){
    let days = date.slice(0, 2);
    let months = date.slice(3,5);
    let years = date.slice(6,10);
    return months + '/' + days + '/' + years;
}

//organizes the total in the format aaaa/mm/dd
function timeTotal(yearsTotal, monthsTotal, daysTotal){

    if(daysTotal >= 30)
    {
        monthsTotal += Math.floor(daysTotal / 30.417);
        daysTotal = daysTotal % 30;
    }

    if(monthsTotal >= 12)
    {
        yearsTotal += Math.floor(monthsTotal / 12);
        monthsTotal = monthsTotal % 12;
    }

    totalArr = [yearsTotal, monthsTotal, daysTotal];

    return totalArr;
}

//verifies if the array contains or not year, month and day (should use less resources)
function checkDate(dif, difInArr){
    var includeYear = dif.includes("year");
    var includeMonth = dif.includes("month");
    var includeDay = dif.includes("day");

    if(includeYear && includeMonth && includeDay)
    {
        years = difInArr[0];
        months = difInArr[2];
        days = difInArr[4];
    }
    if(!includeYear && includeMonth && includeDay)
    {
        years = 0;
        months = difInArr[0];
        days = difInArr[2];
    }
    if(includeYear && !includeMonth && includeDay)
    {
        years = difInArr[0];
        months = 0;
        days = difInArr[2];
    }
    if(includeYear && includeMonth && !includeDay)
    {
        years = difInArr[0];
        months = difInArr[2];
        days = 0;
    }
    if(includeYear && !includeMonth && !includeDay)
    {
        years = difInArr[0];
        months = 0;
        days = 0;
    }
    if(!includeYear && includeMonth && !includeDay)
    {
        years = 0;
        months = difInArr[0];
        days = 0;
    }
    if(!includeYear && !includeMonth && includeDay)
    {
        years = 0;
        months = 0;
        days = difInArr[0];
    }

    if(days == 30)
    {
        months++;
        days = 0
    }
    
}

//---------------------------------  OBTAIN  ---------------------------------//

// DATES
var years = 0;
var months = 0;
var days = 0;
var daysTotal = 0;
var yearsTotal = 0;
var monthsTotal = 0;
var difInArr = [];

//obtains the diference between two dates
function getDateDifference(start, end){
    var date1 = new Date(start);
    var date2 = new Date(end);
    var a = moment(date1);
    var b = moment(date2);

    var dif =  moment.preciseDiff(a, b);
    difInArr = dif.split(" ");

    checkDate(dif, difInArr);

    daysTotal = daysTotal + parseInt(days, 10);
    days == 0? months++: daysTotal;
    monthsTotal = monthsTotal + parseInt(months, 10);
    yearsTotal = yearsTotal + parseInt(years, 10);

    return showYearsMonthsDays(years, months, days);
}

function showYearsMonthsDays(years,months, days){
    return years == 1 && months == 1 && days == 1? years + " año, " + months + " mes y " + days + " dia": 
    years == 1 && months == 1? years + " año, " + months + " mes y " + days + " dias":
    years == 1 && days == 1? years + " año, " + months + " meses y " + days + " dia":
    months == 1 && days == 1? years + " años, " + months + " mes y " + days + " dia":
    days == 1? years + " años, " + months + " meses y " + days + " dia":
    months == 1? years + " años, " + months + " mes y " + days + " dias":
    years == 1? years + " año, " + months + " meses y " + days + " dias":
    years + " años, " + months + " meses y " + days + " dias";
}

// -------------------------------  MODULE 1 y 2 -------------------------------// 

//-Functions-//

// verifies if the input is empty (in development:to verify more things) XXX
function inputIsValid(x){
    return x.length !== 0;
}

//-Client-//

var client;
//obtains the client name
function getClient(){
    client = document.getElementById("clientName").value;

    if(inputIsValid(client))
    {
        document.getElementById("clientName").disabled = true;

        var companyName = document.getElementById("companyName");
        companyName.disabled = false;
        companyName.select();
    }
    else{
        client.length == 0? alert("Ingrese un nombre"):client;
    }
}
function getClientOnKey(event){
    var key = event.keyCode;
    key == 13? getClient(): key;
}

//-Company-//

var company;
// obtains the company name
function getCompany(){
    company = document.getElementById("companyName").value;

    if(inputIsValid(company))
    {
        document.getElementById("companyName").disabled = true;
        document.getElementById("dateStart").disabled = false;
        document.getElementById("dateEnd").disabled = false;

        var dateStart = document.getElementById("dateStart");
        dateStart.select();
    }
    else{
        company.length == 0? alert("Ingrese una empresa"):company;
    }
}
function getCompanyOnKey(event){
    var key = event.keyCode;
    key == 13? getCompany(): key;
}


// -------------------------------  MODULE 3 -------------------------------//

//-Functions//

var start, end, toDisplay;
var totalTime = null;
var display = [];
var isFullDate = false;
//obtain the dates and execute the functions to calculate the diference
function getTimeOfWork(){

    toDisplay = {startDisp: start, endDisp: end};
    display.push(toDisplay);

    start = orderDate(start);
    end = orderDate(end);

    totalTime = getDateDifference(start, end);
}

var experience;
var totalExperience = [];
//saves the company and the time the client worked for it
function addExperience(company, totalTime){
    experience = {work: company, time: totalTime};
    totalExperience.push(experience);
}

function isLeapYear(year) {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else {
        return false;
    }
}
function isValidDate(date){
    var day = date.slice(0, 2), month = date.slice(3,5), year = date.slice(6,10);
    if(!date.includes('/') || year < 1900){
        return false;
    }
    if(date.length === 7 || date.length === 10)
    {
        if(year <= 2022)
        {
            if(day >= 1)
            {
                if(month == 2)
                {
                    return (isLeapYear(year) && day <= 29) || (!isLeapYear(year) && day <= 28)? true: false;
                }
                else{
                    return ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day <= 31) ||
                    ((month == 4 || month == 6 || month == 9 || month == 11 && day <= 30))? true: false;
                }
            }
        }
    }
    else{
        return false;
    }
}
function isValidEndDate(start, end){
    var startDay = start.slice(0, 2), startMonth = start.slice(3,5), startYear = start.slice(6,10);
    var endDay = end.slice(0, 2), endMonth = end.slice(3,5), endYear = end.slice(6,10);

    if(startYear == endYear)
    {
        if(startMonth == endMonth){
            return startDay <= endDay? true: false;
        }
        else{
            return startMonth < endMonth? true: false;
        }
    }
    else{
        return startYear < endYear? true: false;
    }
}

//-Agregar-//

// executes the functions getTimeOfWork and addExperience when "agregar" is pressed
function addJob(){

    var dateStart = document.getElementById("dateStart");
    var dateEnd = document.getElementById("dateEnd");

    start = dateStart.value;
    end = dateEnd.value;

    let len = start.length;
    if (len === 7)
    {
        start = "01/" + start;
        end = "01/" + end;     
    }

    if(isValidDate(start) && (isValidDate(end) && isValidEndDate(start, end)))
    {
        getTimeOfWork();

        addExperience(company, totalTime);

        var companyName = document.getElementById("companyName")
        companyName.disabled = false;
        companyName.value = ""

        companyName.focus();
        companyName.select();

        dateStart.value = "";
        dateStart.disabled = true;

        dateEnd.value = "";
        dateEnd.disabled = true;
    }
    else
    {
        !isValidDate(start) && !isValidDate(end)? alert("Ambas fechas ingresadas son invalidas"): !isValidEndDate(start,end)? alert("La fecha de  inicio debe ser anterior a la de fin"): isValidDate(start)? alert("Fecha de fin invalida"): alert("Fecha de inicio invalida");
    }
}
function addJobOnKey(event){
    var key = event.keyCode;
    key == 13? addJob(): key;
}

//-Finalizar-//

var person;
var people = [];
// saves the client with his/her total path and executes showPeople
function submitInfo(){
    
    if(totalExperience.length == 0)
    {
        alert("Debe añadir al menos un trabajo")
    }
    else
    {
        person = {name: client, path: totalExperience}
        people.push(person);
    
        totalExperience = [];
    
        document.getElementById("companyName").disabled = true;
    
        var clientName = document.getElementById("clientName");
        clientName.disabled = false;
        clientName.value = "";
    
        clientName.focus();
        clientName.select();
    
        showPeople();
    }
}


// -------------------------------  MODULE 4 -------------------------------//

var peopleIndex = 0;
var cont = 0;
// creates every element that will be showed in the "resultados" list in front-end
function showPeople(){
    var ul = document.getElementById("resultsList");
    
    var actualPerson = people[peopleIndex];
    var clientName = actualPerson.name;

    var resultsDiv = document.createElement("div");
    resultsDiv.setAttribute("class", "person");
    ul.appendChild(resultsDiv);
    
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "person-experience");
    resultsDiv.appendChild(mainDiv);

    let totalArr = timeTotal(yearsTotal, monthsTotal, daysTotal);
    yearsTotal = totalArr[0];
    monthsTotal = totalArr[1];
    daysTotal = totalArr[2];

    //verifyMatchingDates();

    var li = document.createElement("li");
    li.innerText = clientName + "- TOTAL: " + showYearsMonthsDays(yearsTotal, monthsTotal, daysTotal);
    mainDiv.appendChild(li);

    totalArr = [];
    yearsTotal = 0;
    monthsTotal = 0;
    daysTotal = 0;

    createButton(mainDiv);
    listOfJobs(resultsDiv, actualPerson);
}

// function verifyMatchingDates(){

//     for (let i = 0; i < display.length; i++){
//         for (let j = 1; j < display.length; j++) {
//             comp(display[i], display[j])
//         }
//     }
//     //recorrer display y encontrar fechas coincidentes
//     //calcular el tiempo que hay entre esas dos fechas
//     //restarle el tiempo a yearsTotal, monthsTotal, daysTotal
// }

//BUTTON

function createButton(mainDiv){
    var deployButton = document.createElement("button");
    deployButton.innerText = "⇣";
    deployButton.setAttribute("id", "deployButton" + cont)
    deployButton.setAttribute("onclick", "getButtonId(this)");
    deployButton.setAttribute("class", "deploy-button");
    mainDiv.appendChild(deployButton);
}
function listOfJobs(resultsDiv, actualPerson){
    var subDiv = document.createElement("div");
    subDiv.setAttribute("class", "item-list" + cont);
    resultsDiv.appendChild(subDiv);

    var subUl = document.createElement("ul");
    subUl.setAttribute("class", "experience-data");
    subDiv.appendChild(subUl);

    var i = 0;
    var totalExperience = actualPerson.path;
    totalExperience.forEach((item)=>{
        let subLi = document.createElement("li");
        subLi.innerText = item.work + ": " + item.time + " (" + display[i].startDisp + " - " + display[i].endDisp + ")";
        subUl.appendChild(subLi);
        i++;
      })
    display = [];

    var hiddenList = document.querySelector(".item-list" + cont);
    hiddenList.style.display = "none";

    peopleIndex++; 
    cont++;
}


var itemClass = ".item-list";
//obtains wich button is pressing to ralate ir with a list
function getButtonId(button){
    var buttonId = button.id;
    var numOfButton = buttonId.slice(-1);
    itemClass = itemClass + numOfButton;

    toggleShowList();
}
//show and hide the list when the button is pressed
function toggleShowList(){
    var itemList = document.querySelector(itemClass);

    const isHidden = itemList.style.display === "none";
    
    if (isHidden)
    {
        // Display hidden element
        itemList.style.display = "block";
        itemClass = ".item-list";
    } 
    else
    {
        // Hide element
        itemList.style.display = "none";
        itemClass = ".item-list";
    }
}


// THEMES

function colorChange(color)
{
    var body = document.getElementById("page");

    if(color == "black")
    {
        body.setAttribute("class", "black");
    }
    else if(color == "red")
    {
        body.setAttribute("class", "red");
    }
    else if(color == "blue")
    {
        body.setAttribute("class", "blue");
    }
    else if(color == "green")
    {
        body.setAttribute("class", "green");
    }
    else
    {
        body.setAttribute("class", "pink");
    }
}

// v07.07