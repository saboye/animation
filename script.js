var $ = function(id) {
    return document.getElementById(id);
};

var bounce;
var my_canvas;
var ball_array = new Array();
var timer;
//A random color generator function 
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
//A random color to gradent converter function 
function randomGradient() {
    var color_1 = randomColor();
    var color_2 = '#FFFFFF';
    var gradient_angle = Math.round(Math.random() * 90);
    var random_gradient = "linear-gradient(" + gradient_angle + "deg, " + color_1 + ", " + color_2 + ")";
    return random_gradient;
}

function ball() {
    this.x = Math.random() * my_canvas.canvas.width;
    this.y = Math.random() * my_canvas.canvas.height;
    this.vx = (Math.random() - 0.5) * (3);
    this.vy = (Math.random() - 0.5) * (2);
    this.color = randomGradient();
    this.radius = 12;
    this.move = ball_move;
    this.draw = ball_draw;
}

function ball_move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.radius > my_canvas.canvas.width) {
        this.x = my_canvas.canvas.width - this.radius;
        this.vx *= bounce;
    } else if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= bounce;
    }

    if (this.y + this.radius > my_canvas.canvas.height) {
        this.y = my_canvas.canvas.height - this.radius;
        this.vy *= bounce;

    } else if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= bounce;
    }

}

var myColor = randomColor();

function ball_draw() {

    var grd = my_canvas.createLinearGradient(0, 0, 900, 200);
    grd.addColorStop(0, myColor);
    grd.addColorStop(1, '#FFFFFF');
    my_canvas.save();
    my_canvas.fillStyle = grd;
    my_canvas.strokeStyle = 'black';
    my_canvas.lineWidth = 2;
    my_canvas.beginPath();
    my_canvas.arc(this.x, this.y, this.radius, 0, 6.28, false);
    my_canvas.closePath();
    my_canvas.stroke();
    my_canvas.fill();
    my_canvas.restore();
}

function create_balls() {
    for (var i = 0; i < 75; i++) {
        var temp = new ball();
        ball_array.push(temp);
    }

}

function going() {
    var x;
    my_canvas.beginPath();
    my_canvas.fillStyle = '#ffd756';
    my_canvas.rect(0, 0, my_canvas.canvas.width, my_canvas.canvas.height);
    my_canvas.fill();
    for (x in ball_array) {
        ball_array[x].move();
        ball_array[x].draw();
    }
}

function resize_can() {
    my_canvas.canvas.width = window.innerWidth / 2;
    my_canvas.canvas.height = window.innerHeight / 2;
}

window.onload = function() {
    bounce = -1;
    my_canvas = $("myCanvas").getContext('2d');
    window.onresize = resize_can;
    resize_can();
    create_balls();
    timer = setInterval(going, 10);
    //An Event listining timer stop the animation 
    document.getElementById("stop").onclick = function() {
        clearInterval(timer);
    };
    //An Event listining timer run the code to slow the speed
    document.getElementById("slow").onclick = function() {
        clearInterval(timer);
        timer = setInterval(going, 60);
    };

    //An Event listining timer run the code to fast speed
    document.getElementById("fast").onclick = function() {
        clearInterval(timer); //clear timer first
        timer = setInterval(going, 0.5);
    };

    //An Event listining timer run the code to normal speed
    document.getElementById("normal").onclick = function() {
        clearInterval(timer); //clear timer first
        timer = setInterval(going, 10);
    };
    // The random color change when the page refresh on the window onlonad 
    document.getElementsByTagName('h1')[0].style.color = randomColor();
    document.getElementsByTagName('h2')[0].style.color = randomColor();
};