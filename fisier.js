function rand(a, b) {
    return Math.trunc(a + (b - a) * Math.random()) - 1;
}

window.onload = function () {
    let nume = document.getElementsByTagName("h1")[0];
    let val = localStorage.getItem("titlu");
    if (val == null) {
        nume.style.color = 'rgb(137, 100, 166)';
    } else {
        nume.style.color = val;
    }
    document.onkeydown = function (e) {
        if (e.key == 'Escape') {
            localStorage.setItem("titlu", nume.style.color);
        }
    }
    let buton = document.getElementById("buton");
    let timp = setTimeout(function () {
        setInterval(function () {
            let h1 = document.getElementsByTagName("h1")[0];
            h1.style.color = "rgb(" + rand(0, 256) + ", " + rand(0, 256) + ", " + rand(0, 256) + ")";
        }, 100);
    }, 3000);
    buton.onclick = function () {
        document.body.classList.toggle("dark");

    }
    let ul = document.getElementById("todolist");
    let li = ul.getElementsByTagName("li");
    let section = document.getElementById("java");
    for (let el of li) {
        el.onclick = function () {
            if (el.style.textDecoration == 'line-through') {
                el.style.textDecoration = "none";
                if (document.body.classList == 'dark')
                    el.getElementsByTagName("a")[0].style.color = 'rgb(216, 210, 204)';
                else
                    el.style.color = 'black';
                ul.insertBefore(el, ul.firstChild);
            } else {
                if (document.body.classList == 'dark')
                    el.getElementsByTagName("a")[0].style.color = 'rgba(216, 210, 204, 50%)';
                else
                    el.style.color = '#916371';
                el.style.textDecoration = "line-through";
                let p = document.createElement("p");
                p.classList.add("data");
                p.innerHTML = "Ati realizat task-ul la data de: " + (new Date()).toString();
                section.appendChild(p);
                p.onclick = function () {
                    p.remove();
                }
                ul.appendChild(el);
            }
        }
    }
    let titlu = document.getElementById("spann");
    titlu.onclick = function (e) {
        if (e.currentTarget == e.target) {
            let list = document.getElementById("todolist").getElementsByTagName("li");
            let nr = 0;
            for (let li of list) {
                if (li.style.textDecoration == 'line-through') {
                    nr += 1;
                }
            }
            alert("Ati facut " + nr + " activitati");
            e.stopPropagation();
        }
    }
    let paragraf = document.getElementById("ptLista");
    paragraf.onclick = function () {
        alert("Aveti de facut " + document.getElementById("todolist").getElementsByTagName("li").length + " activitati");
    }
    let submit = document.getElementById("sub");
    let font = localStorage.getItem("fonturi");
    if (font != null) {
        document.body.style.fontSize = font;
    }
    submit.onclick = function () {
        let range = document.getElementById("cantitate");
        document.body.style.fontSize = range.value + 'px';
        submit.style.fontSize = range.value + 'px';
        localStorage.setItem("fonturi", submit.style.fontSize);
    }
}
