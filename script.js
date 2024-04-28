//function to create a section tag
function create_section(tagname,attrname1,attrvalue1){
  let section = document.createElement(tagname);
  section.setAttribute(attrname1,attrvalue1);
  return section;
}
//function to create a heading tag
function create_header(tagname,attrname2,attrvalue2,content){
  let header = document.createElement(tagname);
  header.setAttribute(attrname2,attrvalue2);
  header.innerText = content;
  return header;
}
//function to create paragraph
function create_para(tagname,attrname,attrvalue,content){
  let para = document.createElement(tagname);
  para.setAttribute(attrname,attrvalue);
  para.innerText= content;
  return para;
}
//function to create a label
function create_label(tagname,attrname,attrvalue,attrname3,attrvalue3,content){
  let label = document.createElement(tagname);
  label.setAttribute(attrname,attrvalue);
  label.setAttribute(attrname3,attrvalue3);
  label.innerText = content;
  return label;
}
//function to create break
function create_break(){
  let break1 = document.createElement("br");
  return break1;
}
//function to create input
function create_input(tagname,attrname,attrvalue,attrname4,attrvalue4,attrname5,attrvalue5,attrname6,attrvalue6){
  let input =document.createElement(tagname);
  input.setAttribute(attrname,attrvalue);
  input.setAttribute(attrname4,attrvalue4);
  input.setAttribute(attrname5,attrvalue5);
  input.setAttribute(attrname6,attrvalue6);
  return input;
}
//function to create a button
function create_button(tagname,attrname,attrvalue,attrname7,attrvalue7,attrname8,attrvalue8,content){
  let butt = document.createElement(tagname);
  butt.setAttribute(attrname,attrvalue);
  butt.setAttribute(attrname7,attrvalue7);
  butt.setAttribute(attrname8,attrvalue8);
  butt.innerText= content;
  return butt;
}
//function to create div
function create_div(tagname,attrname,attrvalue){
  div = document.createElement(tagname);
  div.setAttribute(attrname,attrvalue);
  return div;
}

let section1 = create_section("section","class","section");
let heading1 =  create_header("h1","class","heading","Our OpenAPI allows consumers and smart devices to schedule and minimise CO2 emission around UK");
let para = create_para("p","class","paragraph",`Carbon dioxide emissions are the primary driver of global climate change. It's widely recognized that to avoid the worst impacts of climate change, the world needs to urgently reduce emissions. But, how this responsibility is shared between regions, countries, and individuals has been an endless point of contention in international discussions.`);

section1.append(heading1,para);//appended heading1 and para to section1
document.body.append(section1);//appended section to body

let div = document.createElement("div");
div.className = "div"
let label1 = create_label("label","for","search","class","label",`Enter the details: 
(enter the  date in year-month-date format, of which you want to know the CO2 emissions)`);

let break2 = create_break();

let input1 = create_input("input","type","text","id","search","class","input","placeholder","2024-02-22");

let break3 = create_break();

let button = create_button("button","type","button","class","button","onclick","button_click()","Click Me");

div.append(label1,break2,input1,break3,button)
document.body.append(div);

//disable the button initialy
button.disabled = true;
// Add an event listener to the input field to enable/disable the button
document.querySelector(".input").addEventListener("input", function() {
    if (this.value.trim() !== "") { // Check if there is input
        button.disabled = false; // Enable the button
    } else {
        button.disabled = true; // Disable the button if there is no input
    }
});
//Async funtion to retrive the data from the API
async function button_click(){
  if (!button.disabled){
  try//Try block/Test block which contains the test code
  {
    let get_input = document.querySelector(".input").value;
    let get_input1 = document.querySelector(".input").value = "";
    let container = create_div("div","class","container");
    let row = create_div("div","class","row");
  let res =  await fetch(`https://api.carbonintensity.org.uk/intensity/${get_input}`)
  let res1 = await res.json()
  //console.log(res1);
  var weather_forecast = res1.data
  //console.log (weather_forecast);
  //Remove an existing card element
  let existingCard = document.querySelector(".main");
  if(existingCard){
    existingCard.remove();
  }
  //Remove an existing error statement from the element
  let existingError = document.querySelector(".span");
  if(existingError){
    existingError.remove();
  }
  for(var i=0;i<weather_forecast.length;i++)
  {
  var col = document.createElement("div");
  col.className = "col-sm-12 col-md-12 col-lg-12"
  var card = document.createElement("div");
  card.className = "main"
  card.innerHTML =`<div class="card border-success mb-3" style="max-width: 30rem;">
  <div class="card-header">CO2 Indensity level</div>
  <div class="card-body text-success">
    <h5 class="card-title">From: ${weather_forecast[i].from}</h5>
    <h5 class="card-title">To: ${ weather_forecast[i].to}</h5>
    <h5 class="card-title">Actual: ${weather_forecast[i].intensity.actual}</h5>
    <h5 class="card-title">Forecast: ${weather_forecast[i].intensity.forecast}</h5>
    <h5 class="card-title">Index: ${weather_forecast[i].intensity.index}</h5>
     </div>
</div>`
col.append(card);
}
row.append(col);
container.append(row);
document.body.append(container);
}catch(error)//Catch block to handle the error
{
  let div = document.createElement("div");
  div.className = "span";
  div.innerHTML = "Oops!! Data Not Found"
  //Remove an existing error statement from the element
  let existingError = document.querySelector(".span");
  if(existingError){
    existingError.remove();
  }
  //Remove an existing card element
  let existingCard = document.querySelector(".main");
  if(existingCard){
    existingCard.remove();
  }
 document.body.append(div);
}
}
}
