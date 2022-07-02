const terminal = document.getElementById(`terminal`)
const lines = document.getElementsByClassName(`line`)
const textbox = document.getElementById(`textbox`)

const cmds = [
    `help`,
    `clear`,
    `info`,
    `exit`,
    `js`,
    `url`,
]
const helpcmds = [
    `help - List all available commands`,
    `clear - Clears the terminal`,
    `info - Get website information`,
    `exit - Go back to main website`,
    `js (script) - Run some javascript`,
    `url (url) - Go to a url`
]

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

var cmdmemory = [``,`help`]
var memoryselect = 0;

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

var enter = new Boolean(false)

window.addEventListener('keydown', function (e) {
        if (e.key == `Enter` && enter==false) {
            command(textbox.value.toLowerCase())
            enter=true
            cmdmemory[0]=textbox.value
            cmdmemory.unshift(``)
        }
        
        if (e.key == `Enter`) {
            textbox.value=""
            memoryselect=0
        }
        if (e.key == `ArrowUp`) {
            memoryselect+=1
            memoryselect=clamp(memoryselect,0,cmdmemory.length-1)
            textbox.value=cmdmemory[memoryselect]
        }
        if (e.key == `ArrowDown`) {
            memoryselect-=1
            memoryselect=clamp(memoryselect,0,cmdmemory.length-1)
            textbox.value=cmdmemory[memoryselect]
        }

}, false);
window.addEventListener('keyup', function (e) {
    if (e.key == `Enter`) {
        textbox.value=""
        enter=false
    }
}, false);


function command(command) {
    terminal.innerHTML+=`<h4 class="line" style="color: #0a7a09;">User:~$ ${command} </h4>`
    if (cmds.includes(command) || cmds.includes(command.slice(0,2)) || cmds.includes(command.slice(0,3))) {
        console.log(`Command found`)

        if (command==`help`) {
            terminal.innerHTML+=`<h4 class="line">Avaliable commands:</h4>`
            for (var i=0;i<helpcmds.length;i++) {
                terminal.innerHTML+=`<h4 class="line">${helpcmds[i]}</h4>`
            }
        }

        if (command==`clear`) {terminal.innerHTML+=`<h4 class="line">Avaliable commands:</h4>`
            terminal.innerHTML=``
        }

        if (command==`info`) {
            terminal.innerHTML+=`<h4 class="line">This is a terminal i built</h4>`
            terminal.innerHTML+=`<h4 class="line">that i and others can use to quick calculations (using js)</h4>`
            terminal.innerHTML+=`<h4 class="line">or even run javascript code if inspect element is blocked</h4>`
            terminal.innerHTML+=`<h4 class="line">Main website: itz-electro.github.io or type "exit"</h4>`
        }

        if (command==`exit`) {
            window.location.assign(`../index.html`)
        }

        if (command.slice(0,2) == `js`) {
            var solution=command.slice(2,command.length)
            solution=solution.replace(`console.log`, `output`)
            try {
                solution=eval(solution)
                if (solution != undefined) {
                    terminal.innerHTML+=`<h4 class="line">${solution}</h4>`
                }
            } catch(err) {
                terminal.innerHTML+=`<h4 class="line">${err}</h4>`
            }
        }

        if (command.slice(0,3) == `url`) {
            var url=command.slice(3,command.length)
            window.location.assign(url)
        }


    } else if (command != ``) {
        console.log(`Not a command`)
        terminal.innerHTML+=`<h4 class="line">Command '${command}' does not exist</h4>`
    }
    document.getElementById(`input`).scrollIntoView();
}

function output(x) {
    terminal.innerHTML+=`<h4 class="line">${x}</h4>`
}

function secret() {
    terminal.innerHTML+=`<h4 class="line">Shhh... This is a secret, dont tell anyone...</h4>`
}
