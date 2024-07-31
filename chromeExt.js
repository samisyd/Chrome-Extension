// Go to chrome://extensions/ on a chrome browser , select developer mode and add this folder to add new ext 

let myLeads = []
const inputsave = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



function render( leads) {
    let listItems = ""
    // Render the leads in the unordered list using ulEl.textContent
    for (let i=0;i<leads.length; i++) {
        
        //listItems += "<li>"+ myLeads[i] + "</li>"
        
        // another way to do the same above is 
        // let li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)

        // Wrap the lead in an anchor tag (<a>) inside the <li>
        // Can you make the link open in a new tab?
        
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        
        // instead use template strings / literals
        listItems += `
                <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                </li>
                `
    }

    ulEl.innerHTML = listItems
}


// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM
delBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = ""
})

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

// 2. Listen for clicks on tabBtn. Log Per's LinkedIn URL to the console
tabBtn.addEventListener("click", function() {

    chrome.tabs.query( {active: true, currentWindow: true}, function(tabs){

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})


inputsave.addEventListener("click", function() {
    
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})


