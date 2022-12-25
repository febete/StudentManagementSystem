//==============LECTURE CLASS====================
const LecturesArray =[];

class Lecture
{
  constructor(lectureId,lectureName,noteSystem)
  {
    this.lectureId=lectureId;
    this.lectureName=lectureName;
    this.noteSystem=noteSystem;
    this.students=[];
  }

  //method of adding students to the course
  addStudent(student){
    this.students.push(student);
  }
  
}

var idOfLecture=1;
function addLecture(nameOfLecture,typeOfNoteSystem)
{
    let newLecture;
    var unique=true;

      for (let index = 0; index < LecturesArray.length; index++) {
        if(nameOfLecture==LecturesArray[index].lectureName)
        {
          unique=false;
          alert("System already have same lecture");  
        }
      }
      //If unique is true it should be added, if false it shouldn't be added because it has the same element
      if(unique){
        //add new course
      newLecture=new Lecture(idOfLecture,nameOfLecture,typeOfNoteSystem);
      LecturesArray.push(newLecture);
      idOfLecture++; 
      }      
}


 

const radioButtons= document.querySelectorAll('input[name="ns"]');

//method after click add lecture button 
function btn_addLectures()
 {
    
    // #Getting input from user into height variable.
    let nameOfLecture=document.querySelector("#Lecture").value;
    
    let typeOfNoteSystem;

    // #assign selected radio button value to Note system
    let selectedNoteSystem;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedNoteSystem = radioButton.value;
            typeOfNoteSystem=radioButton.value;
            break;
        }
    }
    // #give warning if no radio button is selected
    if(!selectedNoteSystem)
    {
        alert(`You haven't selected any Note System`);
    }
    // show the output:
    //output.innerText = selectedNoteSystem ? `You selected ${selectedNoteSystem}` : alert(`You haven't selected any Note System`);       
    
    //Give warning if lecture name box is empty, add if not
    if(nameOfLecture==""){
      alert("Please give a Lecture Name");
    }else{
      addLecture(nameOfLecture,typeOfNoteSystem);
    }

     //It works to make the course we add appear in the courses that the student will add.
     dropdown_Lecture();
  
     //To reset the inside of the input box after adding
     document.querySelector("#Lecture").value="";
     
     //To reset the inside of the radio button after adding
     for (const radioButton of  document.querySelectorAll('input[name="ns"]')) {
      radioButton.checked=false;
  }
 }




//for hiding table
 function btn_hideLectures()
 {
  liste.style.display="none";
 }




 const liste=document.querySelector("#liste");
 liste.style.display="none";

function hideTable()
{
  //we made table headers visible
  liste.style.display="";

  var row =liste.getElementsByTagName("tr");

 //it deletes all rows except header that was before run.
  for (let index = 1; index < row.length; index++) {
    row[index].remove();
    index--; //eleman silinince lenght azaldığıiçin indexi de 1 düşürüyoruz
    //When the element is deleted and the length decreases, we decrease the index by 1
  }
}


//List table of the lectures
 function btn_listLectures()
 {
  //print if there is data in the table that can be printed
  if(studentArray.length!=0){
    hideTable();
    for(var i = 0; i < LecturesArray.length; i++) {
      var lectureName =LecturesArray[i].lectureName;
      //let noteSystem =LecturesArray[i][2];  we dont need noteSystem
      var array=LecturesArray[i].students;

      if(array.length>=1)
      {
        for (let index = 0; index < array.length; index++) {
          let id=array[index].id;
        let name =array[index].name;
        let surname=array[index].surname;
        let midtermNote=array[index].midtermNote;
        let finalNote=array[index].finalNote;
  
        addRow(lectureName,id,name,surname,midtermNote,finalNote);        
        } 
      }
    }
  }
    
 }



/* list the desired course*/ 
 function btn_listSelectedLectures()
 {

    hideTable();

    let lectureOfStudent=document.querySelector("#lectureSelectedInput").value;

    for(var i = 0; i < LecturesArray.length; i++) {
      var lectureName =LecturesArray[i].lectureName;
      //let noteSystem =LecturesArray[i][2];  we dont need noteSystem
      var array=LecturesArray[i].students;

      if(lectureOfStudent==lectureName)
      {
        for (let index = 0; index < array.length; index++) {
          let id=array[index].id;
        let name =array[index].name;
        let surname=array[index].surname;
        let midtermNote=array[index].midtermNote;
        let finalNote=array[index].finalNote;
  
        addRow(lectureName,id,name,surname,midtermNote,finalNote);
        }  
      }
    }
    document.querySelector("#lectureSelectedInput").value="";
 }



//Deletes the selected course from the system
 function  btn_DeleteLecture(){
  
  let lectureOfStudent=document.querySelector("#lectureSelectedInput").value;

  for(var i = 0; i < LecturesArray.length; i++) {
    var lectureName =LecturesArray[i].lectureName;
    //let noteSystem =LecturesArray[i][2];  we dont need noteSystem
    var array=LecturesArray[i].students;
    if(lectureOfStudent==lectureName)
    {
      LecturesArray.splice([i],1);
    }
  }
  
  //Called function to delete also from dropdown options
  delete_dropdown_Lecture(lectureOfStudent);

  document.querySelector("#lectureSelectedInput").value="";

 }




//==============STUDENT CLASS===============

const studentArray=[];
  
class Student{
  constructor(id,name,surname,lecture,midtermNote,finalNote){
    this.id=id;
    this.name=name;
    this.surname=surname;
    this.lecture=lecture;
    this.midtermNote=midtermNote;
    this.finalNote=finalNote;
    this.lectures=[];
  }
  addLecture(id)
  {
    this.lectures.push(id);
  }
}




//add Student in the system
function addStudent(idOfStudent,nameOfStudent,surnameOfStudent,lectureOfStudent,midtermNoteOfStudent,finalNoteOfStudent)
{
    let newStudent= new Student(idOfStudent,nameOfStudent,surnameOfStudent,lectureOfStudent,midtermNoteOfStudent,finalNoteOfStudent);
    studentArray.push(newStudent);

    //we also add the student to the lesson
    LecturesArray.forEach(function(item){
      if(item.lectureName==lectureOfStudent)
      {
        item.addStudent(newStudent);
      }
    });
}




//Assigns existing courses in the system to dropdown for students to see
function dropdown_Lecture(){
  var list = document.getElementById('lectureList');
  
  var option = document.createElement('option');
  option.value=LecturesArray[LecturesArray.length-1].lectureName;

  var bool=false;
  var optionsOfList=list.getElementsByTagName("option");
  //Check if there is a course in the list.
  for (let index = 0; index < optionsOfList.length; index++) {
    if( (optionsOfList[index].value) == option.value )
    {
        bool=true;
    }
  }
  //add if not in listed
  if(bool==false){
    list.appendChild(option);
  }
}




//The deleted course will also be deleted in dropdown.
function delete_dropdown_Lecture(deletedLecture){
  var list=document.getElementById("lectureList");

  var optionsOfList=list.getElementsByTagName("option");

  for (let index = 0; index < optionsOfList.length; index++) {
    if( (optionsOfList[index].value) == deletedLecture )
    {
      optionsOfList[index].remove();    
    }
  }
}



//If the add student button is pressed, the system adds students.
function btn_addStudents(){
    
    var availableCourses=[];
    for (let index = 0; index < LecturesArray.length; index++) {
     
      availableCourses.push(LecturesArray[index].lectureName);
    }
    let idOfStudent=document.querySelector("#studentId").value;
    let nameOfStudent=document.querySelector("#name").value;
    let surnameOfStudent=document.querySelector("#surname").value;
    let lectureOfStudent=document.querySelector("#lectureInput").value;
    let midtermNoteOfStudent=document.querySelector("#midNote").value;
    let finalNoteOfStudent=document.querySelector("#finalNote").value;
    
    //warn if midterm or final is not within the desired value ranges
    
    if(idOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }else if(nameOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }
    else if(surnameOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }else if(lectureOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }else if(midtermNoteOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }else if(finalNoteOfStudent=="")
    {
      alert("You must fill in all the  blanks!!")
      return;
    }
    else if (!(midtermNoteOfStudent > 0 && midtermNoteOfStudent < 100)) 
    {
      alert("Midterm grade must be between 0 and 100!");
      return;
    }else if(!(finalNoteOfStudent > 0 && finalNoteOfStudent < 100))
    {
      alert("Final grade must be between 0 and 100!");
      return;
    }else if(idOfStudent<0)
    {
      alert("Student number must be greater than 0!")
      return;
    }else{
      var isUnique =true;
      
      LecturesArray.forEach(function(item){
        if(item.lectureName==lectureOfStudent)
        {
          item.students.forEach(function(stdnt)
          {
            if(stdnt.id==idOfStudent)
            {
              alert("There cannot be two people with the same id.")
              isUnique=false;
              return;
            }
          });
        }    
      });
      if(isUnique)
      {
        addStudent(idOfStudent,nameOfStudent,surnameOfStudent,lectureOfStudent,midtermNoteOfStudent,finalNoteOfStudent);
      }
    }
   


   
    //shows the student's letter grade and grade
    const [totalGrades,grades] =calculateScore(midtermNoteOfStudent,finalNoteOfStudent,lectureOfStudent);
    
    //After adding, we delete the inside of the buttons
    document.querySelector("#name").value="";
    document.querySelector("#studentId").value="";
    document.querySelector("#surname").value="";
    document.querySelector("#lectureInput").value="";
    document.querySelector("#midNote").value="";
    document.querySelector("#finalNote").value="";
}


function calculateScore(midtermNoteOfStudent,finalNoteOfStudent,lectureOfStudent){
   // Input is string so typecasting is necessary. */
   let totalGrades =parseFloat((midtermNoteOfStudent*40)/100) +parseFloat((finalNoteOfStudent*60)/100);

    //The function that determines which scoring system the course belongs to.
    let letterSystem;
    LecturesArray.forEach(function(item){
      if(item.lectureName==lectureOfStudent)
      {
        letterSystem=item.noteSystem;
      }
    });

    let grades;
    if(letterSystem="7")
    {
      if(totalGrades<=100 && totalGrades>=90)
      {
        grades="A";
      }else if(totalGrades<=89 && totalGrades>=80)
      {
        grades="B";
      }else if(totalGrades<=79 && totalGrades>=70)
      {
        grades="C";
      }else if(totalGrades<=69 && totalGrades>=60)
      {
        grades="D";
      }else
      {
        grades="F"
      }
    }else if(letterSystem="10")
    {
      if(totalGrades<=100 && totalGrades>=93)
      {
        grades="A";
      }else if(totalGrades<=92 && totalGrades>=85)
      {
        grades="B";
      }else if(totalGrades<=84 && totalGrades>=77)
      {
        grades="C";
      }else if(totalGrades<=76 && totalGrades>=70)
      {
        grades="D";
      }else
      {
        grades="F"
      }
    }

    return [totalGrades,grades];
}


//returns failed students
function btn_FailedStudents()
{
  hideTable();

  for(var i = 0; i < LecturesArray.length; i++) {
  
      var lectureName =LecturesArray[i].lectureName;
      var array=LecturesArray[i].students;
      
      for (let index = 0; index < array.length; index++) {

      var id=array[index].id;
      var name =array[index].name;
      var surname=array[index].surname;
      var midtermNote=array[index].midtermNote;
      var finalNote=array[index].finalNote;

      
        let [totalGrades,grades]=calculateScore(midtermNote,finalNote,lectureName);
        console.log(grades);
        if(grades=="F"){
          addRow(lectureName,id,name,surname,midtermNote,finalNote);
        }
   
      }         

    }
}

//returns passed students
function btn_PassedStudents()
{
  hideTable();

  for(var i = 0; i < LecturesArray.length; i++) {
  
      var lectureName =LecturesArray[i].lectureName;
      var array=LecturesArray[i].students;
      
      for (let index = 0; index < array.length; index++) {

      var id=array[index].id;
      var name =array[index].name;
      var surname=array[index].surname;
      var midtermNote=array[index].midtermNote;
      var finalNote=array[index].finalNote;

      
        let [totalGrades,grades]=calculateScore(midtermNote,finalNote,lectureName);
        if(grades!="F"){
          addRow(lectureName,id,name,surname,midtermNote,finalNote);
        }
   
      }         

    }
}





//Find students matching their first and last names from the system
function btn_SearchStudents()
{

  hideTable();

  let nameOfStudent=document.querySelector("#searchName").value;
  let surnameOfStudent=document.querySelector("#searchSurname").value;
  

  for(var i = 0; i < LecturesArray.length; i++) {
      var lectureName =LecturesArray[i].lectureName;
      //let noteSystem =LecturesArray[i][2];  we dont need noteSystem
      var array=LecturesArray[i].students;
      for (let index = 0; index < array.length; index++) {

      var id=array[index].id;
      var name =array[index].name;
      var surname=array[index].surname;
      var midtermNote=array[index].midtermNote;
      var finalNote=array[index].finalNote;

      if((name == nameOfStudent) && (surname == surnameOfStudent))
      {    
        addRow(lectureName,id,name,surname,midtermNote,finalNote);
      }
        
      }
               

    }
}



//creates a new row each time to print to the table
function addRow(lectureName,id,name,surname,midtermNote,finalNote)
{
  //shows the student's letter grade and grade
  const [totalGrades,grades] =calculateScore(midtermNote,finalNote,lectureName);

  //we create td elements
  let tselect=document.createElement("input");
  tselect.type="checkbox";
  tselect.id="checkboxSelect";

  let tlectureName=document.createElement("td");
  let tid=document.createElement("td");
  let tname=document.createElement("td");
  let tsurname=document.createElement("td");
  let tmidterm=document.createElement("td");
  let tfinal=document.createElement("td");
  let tscore=document.createElement("td");
  let tletterScore=document.createElement("td");

  let tdelete=document.createElement("input");
  tdelete.type="button";
  tdelete.id="btnDelete"
  tdelete.setAttribute("onclick", "deleteStudent(this)");
  let tupdate=document.createElement("input");
  tupdate.type="button";
  tupdate.id="btnUpdate";
  tupdate.setAttribute("onclick","updateStudent(this)");

  tlectureName.textContent=lectureName;
  tid.textContent=id;
  tname.textContent=name;
  tsurname.textContent=surname;
  tmidterm.textContent=midtermNote;
  tfinal.textContent=finalNote;
  tscore.textContent=totalGrades;
  tletterScore.textContent=grades;

  tdelete.value="delete";
  tupdate.value="change";

  let tddelete=document.createElement("td");
  tddelete.appendChild(tdelete);
  
  let tdupdate=document.createElement("td");
  tdupdate.appendChild(tupdate);
  


  //we create the tr element
  let tr=document.createElement("tr");

  

  //We add the tds in tr
  tr.appendChild(tselect);

  tr.appendChild(tlectureName);
  tr.appendChild(tid);
  tr.appendChild(tname);
  tr.appendChild(tsurname);
  tr.appendChild(tmidterm);
  tr.appendChild(tfinal);
  tr.appendChild(tscore);
  tr.appendChild(tletterScore);

  tr.appendChild(tddelete);
  tr.appendChild(tdupdate);


  
  //We add the tr element into the list(table)
  liste.appendChild(tr);
}

//delete the student from course and table
function deleteStudent(thisbutton)
{
  let deleteLecture=thisbutton.parentElement.parentElement.getElementsByTagName("td")[0].innerHTML;
  let deleteStudentId=thisbutton.parentElement.parentElement.getElementsByTagName("td")[1].innerHTML;
  
  
  //we also delete the student from the course
  LecturesArray.forEach(function(item){
    if(item.lectureName==deleteLecture)
    {
      for (let index = 0; index < item.students.length; index++) {
        if(item.students[index].id==deleteStudentId)
          
          
          item.students.splice([index],1); //dersten öğrenciyi silsin
          btn_listLectures() //update the table again
      }
     
    }
  });
 
}



//creates new table for update student notes
const updateList=document.querySelector("#updateList");
updateList.style.display="none";

function updateStudent(thisbutton)
{
  
  updateList.style.display="";
  if(updateList.getElementsByTagName("tr").length==0)
  {

    thisbutton.parentElement.parentElement.style.backgroundColor="Green";

  let updateMidInput=document.createElement("input");
  updateMidInput.placeholder="New Midterm";
  updateMidInput.type="number";
  updateMidInput.id="updateMidInput";
  let tdUpdateMidInput=document.createElement("td");
  tdUpdateMidInput.appendChild(updateMidInput);

  let updateFinalInput=document.createElement("input");
  updateFinalInput.placeholder="New Final"
  updateFinalInput.type="number";
  updateFinalInput.id="updateFinalInput";
  let tdUpdateFinalInput=document.createElement("td");
  tdUpdateFinalInput.appendChild(updateFinalInput);

  let tupdate=document.createElement("input");
  tupdate.type="button";
  tupdate.id="btnUpdateNew";
  tupdate.setAttribute("onclick","updateStudentScore(this)");
  tupdate.value="update";
  let tdupdate=document.createElement("td");
  tdupdate.appendChild(tupdate);

  let tcancel=document.createElement("input");
  tcancel.type="button";
  tcancel.id="btnCancelNew";
  tcancel.setAttribute("onclick","CancelScore(this);");
  tcancel.value="cancel";
  let tdcancel=document.createElement("td");
  tdcancel.appendChild(tcancel);
  

  let tr=document.createElement("tr");
  //We add the tds in tr
  tr.appendChild(tdUpdateMidInput);
  tr.appendChild(tdUpdateFinalInput);
  tr.appendChild(tdcancel)
  tr.appendChild(tdupdate);
  //We add the tr element into the list(table)
  updateList.appendChild(tr);
  }
}



//updates student's midterm exam grade and final exam grade
function updateStudentScore(thisbutton){

  let input=thisbutton.parentElement.parentElement.getElementsByTagName("td")[0].innerHTML;
  
  let newMid=document.querySelector("#updateMidInput").value;
  let newFinal=document.querySelector("#updateFinalInput").value;

  var changingStudentId ;
  const btnUpdateNodeList = document.querySelectorAll("#btnUpdate");
  btnUpdateNodeList.forEach((Button) => {
    if(Button.parentElement.parentElement.style.backgroundColor=="green")
    {    
      changingStudentId = Button.parentElement.parentElement.getElementsByTagName("td")[1];
    }
  });

  studentArray.forEach(function(student){
    
    if(student.id==changingStudentId.innerHTML)
    {
      

      //change if there is midterm or final grade entered
      if(newMid=="" && newFinal=="")
      {
        //alert("totally blank")
        return;
      }else if(newMid!="" && newFinal!="")
      {
        //alert("full");
        student.finalNote=newFinal;
        student.midtermNote=newMid;
        
      }
      else if(newMid!="")
      {
        alert("final is blank")
        student.midtermNote=newMid;
        return;
        
      }else if(newFinal!="")
      {
        alert("midterm is blank")
        student.finalNote=newFinal;
        return;
      }
     
      alert("The student's grade has been updated. Please re-list")
    }
    
  });
}



function CancelScore(thisbutton)
{
  thisbutton.parentElement.parentElement.parentElement.style.display="none";

  //deleted by pressing cancel
  thisbutton.parentElement.parentElement.remove();

  console.log((document.querySelectorAll("#btnUpdate"))); //it returns NodeList
  const btnUpdateNodeList = document.querySelectorAll("#btnUpdate");

  btnUpdateNodeList.forEach((Button) => {
    if(Button.parentElement.parentElement.style.backgroundColor=="green")
    {
      
      Button.parentElement.parentElement.style.backgroundColor="#2496d3";
    }
  });
}
