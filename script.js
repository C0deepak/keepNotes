const lt = document.getElementById("light");
const dk = document.getElementById("dark");
const body = document.getElementsByTagName("body")[0];
let add = document.querySelector(".add")
let popup = document.querySelector(".popup")
let allNotes = document.querySelector(".all-notes")
const keepNotes = JSON.parse(localStorage.getItem("notes") || "[]");
let noteTitle = document.getElementById("note-title")
let noteBody = document.getElementById("note-body")
let updateId;
let colo = ""

let p = document.createElement('p')
function pop(mes) {
    p.textContent = mes
    popup.appendChild(p)
    popup.style.display = "initial"
    setTimeout(() => {
        popup.style.display = "none"
    }, 3000)
}
function colocheck(color){
    colo = color;
    pop(`${colo} selected`);
}
function showNotes(){
    let localIndex = -1;
    document.querySelectorAll(".prev-note").forEach(note => note.remove())
    keepNotes.forEach((note, index) => {
        let prevNote = document.createElement("div");
        prevNote.classList.add("prev-note")
        prevNote.innerHTML = `
                            <div class="prev-note-title">
                                <p>${note.title}</p>
                            </div>
                            <p class="prev-note-body">
                                ${note.note}
                            </p>
                            <div class="extra">
                                <i class="fa-solid fa-pencil" onclick = "updateModal(${index})"></i>
                                <i class="fa-solid fa-trash" onclick = "delNote(${index})"></i>
                            </div>`
        prevNote.style.backgroundColor = note.col
        allNotes.appendChild(prevNote)
        ++localIndex;
    });
    if(localIndex < 0){
        let prevNote = document.createElement("div");
        prevNote.classList.add("prev-note")
        prevNote.textContent = "Your Notes Will appear here, Add some notes !!!"
        allNotes.appendChild(prevNote);
    }
}
showNotes()

function light() {
    dk.style.transform = "translateX(0px)"
    lt.style.transform = "translateX(250%)"
    body.classList.remove("dark");
    body.classList.add("light");
    document.getElementById("logo").style.fontWeight = "bold"
}
function dark() {
    dk.style.transform = "translateX(250%)"
    lt.style.transform = "translateX(0px)"
    body.classList.add("dark");
    body.classList.remove("light");
}

function show() {
    noteBody.style.display = "initial";
}
function notShow() {
    noteBody.style.display = "none";
}
var submit = add.querySelector("button");
submit.addEventListener("click", e => {
    e.preventDefault();
    var title = document.getElementById("title").value
    var note = document.getElementById("note").value 
    if (note === "" || note === " ") {
        pop("Please write something to add!")
    }
    else {
        let newNote = {
            title: title,
            note: note,
            col: colo
        }
        keepNotes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(keepNotes));
        pop("Note Added successfully")
        document.getElementById("title").value = ""
        document.getElementById("note").value = ""
        colo = ""
        showNotes()
    }
})

function delNote(index){
    pop("Note deleted successfully")
    keepNotes.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(keepNotes));
    showNotes()
}

function showModal(index){
    let mod = document.querySelector(".modal")
    mod.classList.add("smodal");
    document.querySelector(".m-box").classList.add("smodal")
    mod.querySelector("#m-title").value = keepNotes[index].title
    mod.querySelector("#m-note").value= keepNotes[index].note
}
function notShowModal(){
    document.querySelector(".modal").classList.remove("smodal")
    document.querySelector(".m-box").classList.remove("smodal")
}
function updateModal(index){
    showModal(index)
    updateId = index
}
function updated(){
    let mod = document.querySelector(".modal")
    keepNotes[updateId].title = mod.querySelector("#m-title").value
    keepNotes[updateId].note = mod.querySelector("#m-note").value    
    localStorage.setItem("notes", JSON.stringify(keepNotes));
    pop("Note updated successfully")
    showNotes()
    notShowModal()
}





