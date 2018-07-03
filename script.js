let url = "https://jsonplaceholder.typicode.com/users";
const button = document.querySelector('.getRequest');
const div = document.querySelector('.users-list');
let userList = [];

class Http{
    constructor() {
    this.http = new XMLHttpRequest();
  }

  get(url, callback) {
      let call = callback || function(data){};
    this.http.open("GET", url);
    const self = this; // сохранить контекст вызова
    this.http.addEventListener("load", function () {
      if (self.http.status === 200) {
        call(null, self.http.responseText); // вызываем callback после ответа сервера
      } else {
        call(`Error: ${self.http.status}`, null);
      }
    });

    this.http.send();
  }
}

class UI {

    // Create user list
    addUser (res){
        let li='';
        res.forEach(function(el) {
            li += '<li class="user" data-id="' + el.id + '">' + el.name + '</li>';
        });
        // Create markup
        const ul = '<ul>' + li + '</ul>';
        this.innerText(ul, div)
    }

    // User info-box
    infoBox (id, setElement) {
        let someUser = userList.filter(function(el){
            return el.id == id;
        });
        let table = `
            <p class="close-info">
                <i class="fas fa-times-circle"></i>
            </p>
            <table>
                <tr>
                    <th>Name: </th>
                    <td>${someUser[0].name}</td>
                </tr>
                <tr>
                    <th>UserName: </th>
                    <td>${someUser[0].username}</td>
                </tr>                
                <tr>
                    <th>Email: </th>
                    <td>${someUser[0].email}</td>
                </tr>                
                <tr>
                    <th>Address: </th>                   
                    <td>
                        <tr>
                            <th></th>
                            <th>Street: </th>
                            <td>${someUser[0].address.street}</td>                            
                        </tr>                        
                    </td>
                    <td>
                        <tr>
                            <th></th>
                            <th>Suite: </th>
                            <td>${someUser[0].address.suite}</td>
                        </tr>                        
                    </td>
                    <td>
                        <tr>
                            <th></th>
                            <th>City: </th>
                            <td>${someUser[0].address.city}</td>
                        </tr>                        
                    </td>
                    <td>
                        <tr>
                            <th></th>
                            <th>Zip Code: </th>
                            <td>${someUser[0].address.zipcode}</td>
                        </tr>                        
                    </td>                                     
                </tr>
                <tr>
                    <th>Geo: </th>                    
                    <td>
                        <tr>
                            <th></th>
                            <th>Lat: </th>
                            <td>${someUser[0].address.geo.lat}</td>
                        </tr>                        
                    </td> 
                    <td>
                        <tr>
                            <th></th>
                            <th>Lng: </th>
                            <td>${someUser[0].address.lng}</td>
                        </tr>                        
                    </td> 
                </tr>
                <tr>
                    <th>Phone: </th>
                    <td>${someUser[0].phone}</td>
                </tr> 
                <tr>
                    <th>Website: </th>
                    <td>${someUser[0].website}</td>
                </tr>
                <tr>
                    <th>Company: </th>                   
                    <td>
                        <tr>
                            <th></th>
                            <th>Name: </th>
                            <td>${someUser[0].company.name}</td>                            
                        </tr>                        
                    </td>
                    <td>
                        <tr>
                            <th></th>
                            <th>Catch Phrase: </th>
                            <td>${someUser[0].company.catchPhrase}</td>
                        </tr>                        
                    </td>
                    <td>
                        <tr>
                            <th></th>
                            <th>BS: </th>
                            <td>${someUser[0].company.bs}</td>
                        </tr>                        
                    </td>                                                        
                </tr> 
                                           
            </table>
        `;

        let info = document.querySelectorAll('.user-info');
        if(info.length > 0) {
            for( let el of info){
                this.deleteElement(el);
            }
        }

        let active = document.querySelectorAll('li.active');
        if(active.length > 0) {
            for( let el of active){
                this.deleteClass(el, 'active');
            }
        }

        // Create info-box
        let divInfo = document.createElement('div');
        this.innerText(table,divInfo);
        divInfo.classList.add('user-info');
        setElement.insertAdjacentElement("beforebegin", divInfo);
    }

    // Add class
    addClass (el, className) {
        el.classList.add(className);
    }

    // Delete class
    deleteClass (el, className) {
        el.classList.remove(className);
    }

    // Insert text the info-box
    innerText (text, el) {
        el.innerHTML = text;
    }

    // Close the info-box
    deleteElement (el) {
        el.remove();
    }
}

class SortArray {

    sortArray(arr) {
        return arr.sort(function(prev, next) {
            if (prev.name < next.name) return -1;
            if (prev.name >= next.name) return 1;
        });
    }
}

button.addEventListener('click',function(e){

    const ui = new UI();
    const sortedArray = new SortArray();
    const http = new Http();

    http.get(url, function (err, res) {
        if(err) {
            alert ('ERROR')
        } else {
            userList = sortedArray.sortArray(JSON.parse(res));
            ui.addUser(userList);
            ui.innerText('Successful work!', p);
        }
    });
});

div.addEventListener('click', function(e){
    const ui = new UI();

    if(e.target.tagName === 'LI') {
        ui.infoBox(e.target.dataset.id, e.target);
        ui.addClass(e.target, 'active');
    }

    if(e.target.tagName === 'I') {
        ui.deleteClass(e.target.closest('div').nextElementSibling, 'active');
        ui.deleteElement(e.target.closest('div'));
    }
});


