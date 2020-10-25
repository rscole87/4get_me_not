
class Item {
    constructor(itemName, dueDate, completed = false) {
        this.itemName = itemName;
        this.dueDate = dueDate;
        this.completed = completed;
    }
    
    
}


const formattedDate = () =>{
    let YMD = this.dueDate.split("-");
    let year = YMD[0];
    let month = YMD[1];
    let day = YMD[2];
    return `${month}/${day}/${year}`;
}

const createDeleteBttn = () =>{
    let deleteBttn = document.createElement("button");
    deleteBttn.innerHTML = "&times"
    deleteBttn.className = "delete";
    deleteBttn.onclick = deletListItem;
    return deleteBttn;
}

const deletListItem = (e) =>{
    e.target.parentElement.parentElement.remove();
}

const createHtml = () =>{
    let div = document.createElement("div");
    div.className = "item-div";
    let li = document.createElement("li");    
    li.appendChild(div);
    if (this.dueDate.length > 0){
        div.appendChild(document.createTextNode(`${this.itemName} ${formattedDate()}`));
    } else {
        div.appendChild(document.createTextNode(this.itemName))
    }
    div.appendChild(createDeleteBttn());
    div.onclick = markItemComplete;
}

const markItemComplete = (e) =>{
    e.target.classList.toggle("complete");
}

export default Item;

