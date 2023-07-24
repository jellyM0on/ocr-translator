//Sources selection
function displaySources(sources){
    const menu = document.querySelector('#src-btn-content')
    let first = menu.firstElementChild

    if(first){
      while(first){
        first.remove(); 
        first = menu.firstElementChild
      }
    } else {
        for (let i=0; i<sources.length; i++){
            const item = document.createElement("li"); 
            item.onclick = () => selectSource(sources[i]); 
            const text = document.createTextNode(`${sources[i].name}`); 
            item.appendChild(text); 
            menu.appendChild(item); 
          }
    }
  }

const menuSource = document.getElementById('src-btn'); 
menuSource.onclick = () => displaySources(sources.srcs())

