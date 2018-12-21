# project-team
project-team created by GitHub Classroom

The goal of this game is to make chains of 3 or more tiles of the same colour, 
so that they will get removed from the playfield and replaced by new tiles until you're unable to swap tiles anymore.

User manual: open 'index.html' in your webbrowser and press "CTRL + SHIFT + J" to open your browser console.
We have not added mouse responsibility yet, so you will have to write your commands in the console.
There are 2 functions for you to use:
  - userswap(grid, loc1, loc2): this function will swap the tiles with locations loc1 and loc2 if they are adjacent.
      To properly use this function, type "userswap(playField, {x: a,y: b}, {x: c, y: d})".
      Letters 'a,b,c,d' are variables you have to fill in yourself, giving the coordinates for both locations.
        a: x-coordinate for the first tile you want to swap
        b: y-coordinate for the first tile you want to swap
        c: x-coordinate for the second tile you want to swap
        d: y-coordinate for the second tile you want to swap
      A schematic on how to retrieve the proper coordinates can be found on the following link: https://gyazo.com/6cb952afab26527e4db87f651f8dcec8
  - userchecker(grid): this function will check for chains of 3 or more tiles with identical colours, remove them from the playfield, 
      drop filled tiles above down like pulled by gravity, and then drop some new tiles to fill up all empty spaced.
      To properly use this function, simply type "userchecker(playField)".
      Keep repeating the use of this function untill there are no chains of 3 or more identically coloured tiles left.
Alternating between using these 2 functions will make you able to play the game.      

Notes: 
  - We have not implemented a scoring system yet, so there is currently no real way to track your score.
  - If you want to change up the size of your field, open 'sketch.js' in a text editor of your choice and check the first 2 lines.
      Change them to "var cols = X" and "var rows = Y" to change the playfield to use X columns and Y rows,
      with X and Y being numbers of your own choice.
        
