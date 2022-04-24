console.log("hi welcome to magic notes");
const addbtn = document.getElementById("addBtn");
const text = document.getElementById("addTxt");
const title = document.getElementById("title");
class notes_template {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}
showNotes();
addbtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");
  if (notes == null && text.value != "") {
    notesObj = [];
    let note = new notes_template(title.value, text.value);
    notesObj.push(note);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    console.log("null= " + notesObj);
  } else if (text.value == "") {
    alert("Write something");
  } else {
    notesObj = JSON.parse(notes);
    let note = new notes_template(title.value, text.value);
    notesObj.push(note);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    console.log(notesObj);
  }
  text.value = "";
  title.value = "";
  showNotes();
});
//showing the notes..
function showNotes() {
  let notes = localStorage.getItem("notes");
  let note_html = "";
  if (notes == null) return;
  else {
    notesObj = JSON.parse(notes);
    console.log("the index " + notesObj.length);
    if (notesObj.length == 0)
      note_html = `<p style="font-size:1.5rem">Note &#128465; is Empty &#128530 </p>`;
    else {
      notesObj.forEach((element, index) => {
        note_title =
          notesObj[index].title == ""
            ? `Note ${index + 1}`
            : notesObj[index].title;
        notesObj[index].title = note_title;
        note_html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body ">
                            <h5 class="card-title">${note_title}</h5>
                            <p class="card-text"> ${notesObj[index].text}</p>
                            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                    </div>`;
      });
      localStorage.setItem("notes", JSON.stringify(notesObj));
    }
  }

  let notesElm = document.getElementById("notes");
  notesElm.innerHTML = note_html;
}
//Deleting note..
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  notesObj = JSON.parse(notes);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
