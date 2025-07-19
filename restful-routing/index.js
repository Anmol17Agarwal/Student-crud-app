const express = require('express');
const app = express()
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine","ejs")

app.use(express.urlencoded());
app.use(express.json())
app.use(methodOverride('_method'));

const students = [
    {
        id:uuid(),
        firstName: "Abhishek",
        secondName:"Sharma",
        age:16,
        stream:"PCM",
        rank:10
    },{
        id:uuid(),
        firstName: "Mukesh",
        secondName:"Rastogi",
        age:16,
        stream:"PCMB",
        rank:12
    },{
        id:uuid(),
        firstName: "Shuyash",
        secondName:"Yadav",
        age:16,
        stream:"PCB",
        rank:4
    }
]

app.get('/', (req,res)=>{
    res.send("Working Fine")
    // res.send(student)
})

app.get('/students',(req,res)=>{
    res.render("students",{students})
})

app.get('/students/new',(req,res)=>{
    res.render("add");
})

app.post('/students',(req,res)=>{
    const {firstName, secondName, age,stream,rank } = req.body;
    const studentId = uuid();
    students.push({
        id: studentId,
        firstName,
        secondName,
        age,
        stream,
        rank
    })
    res.redirect('/students')
})

app.get('/students/:id',(req,res)=>{
    const studentId = req.params.id;
    const student = students.find((student)=> student.id === studentId);
    res.render("show",{student})
})


app.get("/students/:id/edit", (req, res) => {
  const studentId = req.params.id;
  const student = students.find((student) => student.id === studentId);
  res.render("edit", { student });
});


app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { firstName, secondName, age,stream,rank } = req.body;

  const student = students.find(student => student.id === studentId);

  if(firstName) student.firstName = firstName;
  if(secondName) student.secondName = secondName;
  if(age) student.age = age;
  if(rank) student.rank = rank;
  if(stream) student.stream = stream;

  res.redirect("/students");
})

app.delete("/students/:id",(req,res)=>{
    const studentId = req.params.id;
  const studentIndex = students.findIndex(student => student.id === studentId);
  students.splice(studentIndex,1);
  res.redirect("/students");

})

app.listen(5000,()=>{
    console.log("Server is up at port",5000)
})