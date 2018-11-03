var myArray = ["Ryan","Odessa","Areli","Matt"];

window.onload = build;

document.getElementById('addNew').addEventListener('click', addName, false);

function addName() {
    var a = document.getElementById('addFriend').value;
    myArray.push(a);
    //rebuild html table
    build();
}

function build() {
    var html = "<h1>Dynamic List Editor</h1><table>";
    for (var x = 0; x < myArray.length; x++) {
        html += '<tr id="id' + x + '" data-row="' + x + '"><td>' + myArray[x] + '</td><td><a href="#" data-action="delete">Del</a></td><td><a href="#" data-action="edit">Edit</a></td></tr>';
    }
    document.querySelector('.output').innerHTML = html;

    var dad = document.querySelectorAll("[data-action='delete']");

    for (x = 0; x < dad.length; x++) {
        dad[x].addEventListener('click', function () {
            //prevent action of #
            event.preventDefault();
            var iValue = this.closest('[data-row]').getAttribute('data-row');
            var r = myArray.splice(iValue, 1);
            //rebuild after removing
            build();
            console.log(r);
        });
    }
    var dae = document.querySelectorAll("[data-action='edit']");

    for (x = 0; x < dae.length; x++) {
        dae[x].addEventListener('click', function () {
            //prevent action of #
            event.preventDefault();
            var row = this.closest('[data-row]');
            var rid = row.getAttribute('data-row');
            row.style.backgroundColor = 'Yellow';

            var td = row.firstElementChild;
            var input = document.createElement('input');
            input.type="text";
            input.value= td.innerText;
            td.innerHTML = "";
            td.appendChild(input);
            //automatically jump into input field
            input.focus();
            //update after user edits
            input.onblur = function() {
                td.removeChild(input);
                td.innerHTML = input.value;
                myArray[rid] = input.value;
                row.style.backgroundColor = "White";
            }
        });
    }

}


