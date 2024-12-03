chrome.storage.local.get(["readerModeSavedPages"]).then((result) => {
    const tableBody = document.querySelector("#savedLinks tbody");
    let readerModeSavedPages = result.readerModeSavedPages
    readerModeSavedPages.forEach((item)=>{
    const row = tableBody.insertRow();
    const nameCell = row.insertCell(0);    
    nameCell.innerText = item;

    const actionsCell = row.insertCell(1);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button');
    deleteButton.addEventListener('click', () => {
        row.remove();
        readerModeSavedPages = readerModeSavedPages.filter(check => check !== item)
        chrome.storage.local.set({readerModeSavedPages});
    });
    actionsCell.appendChild(deleteButton);
    })
  });
 