let controlEdit,
  controlSearch = false;
let directory = [];
let person = [];
let counter = 0;
let documentElement;

function saveButton() {
  const inputName = document.getElementById("input-name").value;
  const inputSurname = document.getElementById("input-surname").value;
  const inputTelephone = document.getElementById("input-telephone").value;
  if (inputName == "" || inputSurname == "" || inputTelephone == "") {
    window.alert("Boşlukları uygun şekilde doldurun");
  } else {
    if (controlEdit == true) {
      documentElement.getElementsByTagName("td")[1].innerHTML = inputName;
      documentElement.getElementsByTagName("td")[2].innerHTML = inputSurname;
      documentElement.getElementsByTagName("td")[3].innerHTML = inputTelephone;
      filter(documentElement);
      directory[documentElement.getElementsByTagName("td")[0].innerHTML] = {
        name: inputName,
        surname: inputSurname,
        telephone: inputTelephone,
        id: counter,
      };
      controlEdit = false;
    } else {
      person = {
        name: inputName,
        surname: inputSurname,
        telephone: inputTelephone,
        id: counter,
      };
      directory.push(person);
      tableList(inputName, inputSurname, inputTelephone, counter);
    }
  }
}
function deleteRow(element) {
  filter(element.closest("tr"));
  element.closest("tr").remove();
  directory = directory.filter(
    (person) =>
      person.id != element.closest("tr").getElementsByTagName("td")[0].innerHTML
  );
  counter--;
  hide();
}

function Edit(element) {
  controlEdit = true;
  documentElement = element.closest("tr");
  document.getElementById("input-name").value =
    documentElement.getElementsByTagName("td")[1].innerHTML;
  document.getElementById("input-surname").value =
    documentElement.getElementsByTagName("td")[2].innerHTML;
  document.getElementById("input-telephone").value =
    documentElement.getElementsByTagName("td")[3].innerHTML;

  var directory = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
  });
  directory.show();
}

function filter(element_closest) {
  person = directory.filter(
    (person) =>
      person.id == element_closest.getElementsByTagName("td")[0].innerHTML
  );
}

function hide() {
  if (counter == 0) {
    document.getElementById("no-directory").hidden = false;
  } else {
    document.getElementById("no-directory").hidden = true;
  }
}

function reset() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-surname").value = "";
  document.getElementById("input-telephone").value = "";
}

function search_button_(e) {
  e.preventDefault();
  const searchValue = document.getElementById("search-textbox").value;
  const newPerson = directory.filter(
    (person) =>
      person.name.includes(searchValue) ||
      person.surname.includes(searchValue) ||
      person.telephone.includes(searchValue)
  );
  if (newPerson.length > 0) {
    controlSearch = true;
    document.getElementById("my-table").innerHTML = "";
    counter = 0;

    // const el = document
    // .createElement("thead")
    // .setAttribute("id","my-table")
    // const table = document.getElementById("my-table");
    //console.log(element.parentElement);
    // console.log(directory[person[0].id].id);
    // var dizi = directory.map(element => {
    // return element.id != directory[person[0].id].id && element});
    // directory = directory.filter((element)=> element.id != directory[person[0].id].id )
    // delete directory[person[0].id]
    // document.getElementById("my-table").children().setAttribute("hidden","hidden")

    newPerson.forEach((val) => {
      {
        const inputName = val.name;
        const inputSurname = val.surname;
        const inputTelephone = val.telephone;
        tableList(inputName, inputSurname, inputTelephone, val.id);
      }
    });
  } else if (controlSearch == true) {
    controlSearch = false;
    person.forEach((directory) => {
      const inputName = directory.name;
      const inputSurname = directory.surname;
      const inputTelephone = directory.telephone;
      tableList(inputName, inputSurname, inputTelephone, 0);
    });
  }
}
function tableList(name, surname, telephone, number) {
  const el = document.createElement("tr");
  const tdEl = `
    <td onclick="">${number}</td>
    <td>${name}</td>
    <td>${surname}</td>
    <td>${telephone}</td>
    <td colspan="2">
    <input type="button" style="background-color:green;" value="Düzenle"  id="add-button" class="btn btn-success" onclick="Edit(this)">
    <input type="button" onclick="deleteRow(this)" style="background-color:red;" class="btn btn-danger" value="Sil">
    </td>
    `;
  el.innerHTML = tdEl;
  document.getElementById("my-table").appendChild(el);
  counter++;
  hide();
}
