var cols = 7; //just change this nr if you want it to be bigger
var rows = cols;
var wdt = 800/cols;
var colors = ["#800014" /*red*/ , "#3F8000" /*green*/ , "#0354A6" /*blue*/ , "orange", "purple", "#CC7722" /*Ochre*/ ];
var score = 0

function setup() {
    createCanvas(cols*wdt+1, rows*wdt+1); // responsive canvas (+1 voor laatste lijn)
}

function draw() {
    background(255);
    //draw the playingfield
    playField = make2Darray(cols, rows);
    //safety mesure
    noLoop();
}

function make2Darray(cols, rows) {
    //create empty array
    var playField = new Array(cols);
    for (var i = 0; i < playField.length; i++) {
        playField[i] = new Array(rows);
    }
    //places random color values, coordinates and width in each spot; 
    //used to give the created rectangles the color.
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var randomColor = random(colors);
                x = i * wdt;
                y = j * wdt;
                playField[j][i] = { color: randomColor, position: { x: x, y: y}, width: wdt};
                //fills block with exact same randomColor value as the element
                fill(playField[j][i].color);
                stroke(0);
                rect(x, y, wdt, wdt);
        }
    }
    return playField;
}

//gives position of grid item
function mousePressed(){
    //checks if mouse position is inside canvas and return it
    if(mouseX<rows*wdt && mouseY<cols*wdt){
        return mousePos = findElement({x: mouseX, y: mouseY});
    
      }
      //logs position of mouse
      //console.log(mousePos);
}

//checks how much blocks of same color are horizontally next to eachother
function horizontalChainAt(grid, position) {
    x = position.x / wdt;
    y = position.y / wdt;
    let t = 1;
    let i = 1;
    while (x - i > -1 && grid[y][x - i].color == grid[y][x].color) {
        i++;
        t++;
    }
    i = 1;
    while (x + i < cols && grid[y][x + i].color == grid[y][x].color) {
        i++;
        t++;
    }
    return t;
}

//checks how much blocks of same color are vertically next to eachother
function verticalChainAt(grid, position) {
    x = position.x / wdt;
    y = position.y / wdt;
    let t = 1;
    let i = 1;
    while (y - i >= 0 && grid[y - i][x].color == grid[y][x].color) {
        i++;
        t++;
    }
    i = 1;
    while (y + i < rows && grid[y + i][x].color == grid[y][x].color) {
        i++;
        t++;
    }
    return t;
}

//replaces empty array elements
function replaceEmptySpots() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if(playField[j][i].color == "black") {  
                var randomColor = random(colors);
                x = i * wdt;
                y = j * wdt;
                playField[j][i] = { color: randomColor, position: { x: x, y: y}, width: wdt};
                //fills block with exact same randomColor value as the element
                fill(playField[j][i].color);
                stroke(0);
                rect(x, y, wdt, wdt);
            }
        }
    }
    return playField;
}

function isInside(grid, position) {
    if (widthArray(grid) > position.x && position.x >= 0) {
        if (heightArray(grid) > position.y && position.y >= 0) {
            return true;
        }
        return false;
    }
    return false;
}

function swap(grid,p,q){ //verwisselt de kleuren van twee vakken binnen het playField
    //y is rijen, x is plaats in de rij
    px = p.x/wdt;
    py = p.y/wdt;
    qx = q.x/wdt;
    qy = q.y/wdt;
    var blockKleur1 = playField[py][px].color
    var blockKleur2 = playField[qy][qx].color
    updateBlockColor(py,px, blockKleur2);
    updateBlockColor(qy,qx, blockKleur1);
    return playField;
}

function removeChains(grid){
    var places = [];
    for (i = 0; i < cols; i++){
        for (j = 0; j < rows; j++){
            v = verticalChainAt(grid, {x: (i*wdt), y: (j*wdt)});
            h = horizontalChainAt(grid, {x: (i*wdt), y: (j*wdt)});
            if (v >= 3){
                score = score + 2**(v-2);
                places.push({x: i, y: j});
            }
            if (h >= 3){
                score = score + 2**(h-2);
                places.push({x: i, y: j});
            }
        }
    }
    for (v=0; v < places.length; v++) {
        let x = places[v].x;
        let  y = places[v].y;
        updateBlockColor(y, x, "black");
    }
    return playField;
}

function findElement(position) { //geeft de beginpositie van het aangeklikte vakje aan
    x = position.x - position.x % wdt;
    y = position.y - position.y % wdt;
    return element = {x: x, y: y};
}

function widthArray(grid) {
    return grid[0].length;
}

function heightArray(grid) {
    return grid.length;
}

function updateBlockColor(j,i , strKleur) {
    x = i * wdt;
    y = j * wdt;
    playField[j][i] = { color: strKleur, position: { x: x, y: y}, width: wdt};
    fill(playField[j][i].color);
    stroke(85);
    rect(x, y, wdt, wdt);
}

function collapse(grid){
    for (a = 1; a < grid.length; a++){
        for (i = 0; i < grid.length; i++){
            for (j = 0; j < grid[0].length; j++){
                if(grid[i][j].color == "black" && i>0){
                    p = {x: j*wdt, y: i*wdt};
                    q = {x: (j)*wdt, y: (i-1)*wdt};
                    swap(playField, p, q);
                }
            }
        }
    }
}

function checker(grid) {
    removeChains(grid);
    collapse(grid);
    replaceEmptySpots();
}

function neighbourCheck(p,q){
    return (Math.abs(p.x-q.x) + Math.abs(p.y-q.y)==1);
}

function userswap(grid,p,q){
    xp = p.x - 1;
    xq = q.x - 1;
    yp = rows - p.y;
    yq = rows - q.y;
    if(neighbourCheck(p,q)) {
        var blok1 = grid[yp][xp].color;
        var blok2 = grid[yq][xq].color;
        updateBlockColor(yp, xp, blok2);
        updateBlockColor(yq, xq, blok1);
    }
    return playField;
}

function userchecker(grid) {
    removeChains(grid);
    collapse(grid);
    replaceEmptySpots();
    return "your current score is:" + (score*1203);
}
