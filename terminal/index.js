const terminal = document.getElementById(`terminal`)
const lines = document.getElementsByClassName(`line`)

var input=``
var inputstyle=`style="color: #0a7a09;"`
terminal.innerHTML+=`<h4 class="line" ${inputstyle}>User:~$  </h4>`

const cmds = [
    `help`,
    `clear`,
    `info`,
    `js`,
    `exit`,
]
const helpcmds = [
    `help - List all available commands`,
    `clear - Clears the terminal`,
    `info - Get website information`,
    `js (script) - Run some javascript`,
    `exit - Go back to main website`,
]

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });

window.addEventListener('keydown', function (e) {
    if (e.key.length == 1) {
        input+=e.key
        lines[lines.length-1].innerHTML=`<h4 class="line" ${inputstyle}>User:~$ ${input}| </h4>`
    } else {
        if (e.key == `Enter`) {command(input.toLowerCase())}
        if (e.key == `Backspace`) {
            input=input.slice(0,input.length-1)
            lines[lines.length-1].innerHTML=`<h4 class="line" ${inputstyle}>User:~$  ${input}| </h4>`
        }
    }
  }, false);

function command(command) {
    input=``
    if (cmds.includes(command) || cmds.includes(command.slice(0,2))) {
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

        if (command.slice(0,2) == `js`) {
            var solution=command.slice(2,command.length)
            solution=solution.replace(`console.log`, `output`)
            solution=eval(solution)
            if (solution != undefined) {
                terminal.innerHTML+=`<h4 class="line">${solution}</h4>`
            }
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

    } else if (command != ``) {
        console.log(`Not a command`)
        terminal.innerHTML+=`<h4 class="line">Command '${command}' does not exist</h4>`
    }
    terminal.innerHTML+=`<h4 class="line" ${inputstyle}>User:~$  </h4>`
    lines[lines.length-1].scrollIntoView();
}

function output(x) {
    terminal.innerHTML+=`<h4 class="line">${x}</h4>`
}