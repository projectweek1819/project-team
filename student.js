function width(grid){
    return grid[0].length;
}

function height(grid){
    return grid.length;
}

function isInside(grid, position) {
    return (position.x < width(grid) && position.y < height(grid) && position.x >= 0 && position.y >= 0);
}

function swap(grid,p,q){
    let a = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = a;
}

function horizontalChainAt(grid, position){
    x = position.x;
    y = position.y;
    let t = 1;
    let i = 1;
    while(grid[y][x-i] == grid[y][x]){
        i++;
        t++;
    }
    i = 1;
    while(grid[y][x+i] == grid[y][x]){
        i++;
        t++;
    }
    return t;
}


function verticalChainAt(grid, position){
    x = position.x;
    y = position.y;
    let t = 1;
    let i = 1;
    while(y - i >= 0 && grid[y-i][x] == grid[y][x]){
        i++;
        t++;
    }
    i = 1;
    while(y + i < height(grid) && grid[y+i][x] == grid[y][x]){
        i++;
        t++;
    }
    return t;
}

function removeChains(grid){
    var r = 0;
    var b = 0;
    var g = 0;
    var foo = [];
    for (i = 0; i < width(grid); i++){
        for (j = 0; j < height(grid); j++)
        {
            if (verticalChainAt(grid, {x: i, y: j}) > 2) {
                if (grid[j][i] == "red"){
                    r = r + 1;
                    foo.push({position: {x: i, y: j}});
                }
                if (grid[j][i] == "blue"){
                    b = b + 1;
                    foo.push({position: {x: i, y: j}});
                }
                if (grid[j][i] == "green"){
                    g = g + 1;
                    foo.push({position: {x: i, y: j}});
                }
            }
            if (horizontalChainAt(grid, {x: i, y: j}) > 2){
                if (grid[j][i] == "red"){
                    r = r + 1;
                    foo.push({position: {x: i, y: j}});
                }
                if (grid[j][i] == "blue"){
                    b = b + 1;
                    foo.push({position: {x: i, y: j}});
                }
                if (grid[j][i] == "green"){
                    g = g + 1;
                    foo.push({position: {x: i, y: j}});
                }
            }
        }
    }
    for (i = 0; i < foo.length; i++){
        grid[foo[i].position.y][foo[i].position.x] = "";
    }
    if(r == 0 && g == 0 && b == 0){
        return {};
    }
    else if(g == 0 && r == 0){
        return {blue: b}
    }
    else if(r == 0 && b == 0){
        return {green: g};
    }
    else if(g == 0 && b == 0){
        return {red: r};
    }
    else if(r == 0){
        return {blue: b, green: g};
    }
    else if(b == 0){
        return {red: r, green: g};
    }
    else if(g == 0) {
        return {red: r, blue: b};
    }
    else{
        return {red: r, blue: b, green: g};
    }
}

function collapse(grid){
    for(let y = height(grid)-1; y > 0; y--){
        for(let x = 0; x <width(grid); x++){
            for(let y = height(grid)-1; y > 0; y--){
                var pos = {x,y};
                pos.y = y-1;
                if(grid[y][x] == ""){
                    swap(grid,{x,y}, pos);
                }
            }
        }
    }
}