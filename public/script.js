let itemList = document.getElementById("item-list");
let addBttn = document.getElementById("add-bttn");
let newItemInput = document.getElementById("new-item");
let specsDiv = document.getElementById("specs");
let dateInput = document.getElementById("date-input");


const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

const inputLength = () =>{
    return newItemInput.value.length;
}

const timeMinutes = (date) =>{
    let minutes = date.getMinutes()
    if (minutes < 10){
        return `0${minutes}`
    } 
    return minutes;
}

const getCurDate = () =>{
    let curDate = new Date;
    let amOrPm;

    if (curDate.getHours() < 12){
        amOrPm = "am"
    } else {
        amOrPm = "pm"
    }

    return `${months[curDate.getMonth()]} ${curDate.getDate()}, ${curDate.getFullYear()}
    at ${curDate.getHours()%12}:${timeMinutes(curDate)}${amOrPm}`
}

const createDeleteBttn = () =>{
    let deleteBttn = document.createElement("button");
    deleteBttn.innerHTML = "&times"
    deleteBttn.className = "delete";
    deleteBttn.onclick = deletListItem;
    return deleteBttn;
}

const createDiv = () =>{
    let div = document.createElement("div");
    div.className = "item-div"
    return div;
}

const deletListItem = (e) =>{
    e.target.parentElement.parentElement.remove();
}

const formattedDate = (date) =>{
    let YMD = date.split("-");
    let year = YMD[0];
    let month = YMD[1];
    let day = YMD[2];

    return `${month}/${day}/${year}`;
}

const createListItem = () =>{
    let item = newItemInput.value;
    let div = createDiv();
    let li = document.createElement("li");    
    li.appendChild(div);
    if (dateInput.value.length > 0){
        div.appendChild(document.createTextNode(`${item} ${formattedDate(dateInput.value)}`));
    } else {
        div.appendChild(document.createTextNode(item))
    }
    div.appendChild(createDeleteBttn());
    div.onclick = markItemComplete;
    itemList.appendChild(li);
    hideSpecs();
    newItemInput.value = "";
    dateInput.value = "";
}


const markItemComplete = (e) =>{
    e.target.classList.toggle("complete");
}

const addItemAfterKeypress = (e) =>{
    if (inputLength() > 0 && e.keyCode === 13){
        createListItem();
    }
}

const addItemAfterClick = (e) =>{
    if (inputLength() > 0){
        createListItem();
    }
}

const displaySpecs = () =>{
    specsDiv.style.display = "block";
    hideOnClickOutside(specsDiv);
}

const hideSpecs = () =>{
    specsDiv.className = "hidden"
}

addBttn.addEventListener("click", addItemAfterClick);
newItemInput.addEventListener("keypress", addItemAfterKeypress);
newItemInput.addEventListener("click", displaySpecs);

function hideOnClickOutside(ele) {
    const outsideClickListener = event => {
        if (event.target !== newItemInput  && event.target !== dateInput) { // or use: event.target.closest(selector) === null
          ele.style.display = 'none'
          newItemInput.onclick = displaySpecs;
          removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

const isVisible = (ele) => ele.style.display !== "";

