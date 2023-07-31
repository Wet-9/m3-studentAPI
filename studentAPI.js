var express = require('express');
var app = express();
app.use(express.json());

// Custom Middleware logger
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log('Request #' + requestCount + ': ' + req.method + ' ' + req.url);
  next();
});

//Server start
var server = app.listen(8000, function() {
    console.log("server is ON");
})


// students array
const students = [
    {id: 1, name: "Donald Duck", section: "A", gpa: 4, nationality: "Canadian"},
    {id: 2, name: "Joe Mama", section: "B", gpa: 2, nationality: "American"},
    {id: 3, name: "Mickey Deer", section: "C", gpa: 3.2, nationality: "Korean"}];

// Receive all of the students
app.get('/students',(req, res)=>{
    res.send(students);
});

// Get students by ID
app.get('/students/id/:id', (req, res)=>{
    const student = students.find((element)=>{
    if (element.id === parseInt(req.params.id)) 
    return true});
    if (student) {return res.status(200).send(student);}
    return res.status(404).send('Wrong ID, No Student Found ');
    });

// Get students by section
app.get('/students/section/:section', (req, res)=>{
    const student = students.find((element)=>{
    if (element.section === req.params.section) 
    return true});
    if (student) {return res.status(200).send(student);}
    return res.status(404).send('Wrong section, No Student Found ');
    });
  


// HTTP POST ADD student
app.post('/students/add_student', (req, res)=>{
    const student = {
         id: req.body.id,
         name: req.body.name,
         section: req.body.section,
         gpa: req.body.gpa,
         nationality: req.body.nationality
    };
    students.push(student);
    res.status(200).send(student);
    });

// HTTP Put update by ID
app.put('/students/overwrite/:id', (req, res)=>{
        const student = students.find((element)=>{
        if(element.id === parseInt(req.params.id) )
            {return true;}
        });
        if(student){
            student.id = req.body.id;
            student.name = req.body.name;
            student.section = req.body.section,
            student.gpa = req.body.gpa,
            student.nationality = req.body.nationality;
            return res.status(200).send(student);
        }
        return res.status(404).send('Wrong ID, No student Found');
    });

// Patch small update based on ID

app.patch('/students/update/:id', (req, res)=>{
    const student = students.find((element)=>{
    if (element.id === parseInt(req.params.id)) 
    {return true;}
    });
    if (student) {
    for (let i in req.body){
    student[i] = req.body[i];
    }
    return res.status(200).send(student);
    }
    return res.status(404).send('Wrong ID, No Student Found');
    });


// delete student by ID
app.delete('/students/delete/:id', (req, res) => {
    const iddelete = parseInt(req.params.id);
  
    const student = students.find((element) => {
      return element.id === iddelete;
    });
  
    if (student) {
      const index = students.indexOf(student);
      students.splice(index, 1);
      return res.status(200).send(student);
    }
  
    return res.status(404).send('Wrong ID, No Student Found');
  });
  