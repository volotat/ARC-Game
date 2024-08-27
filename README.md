# The ARC Game
The Abstraction and Reasoning Corpus made into a web game

The aim of this repository is to create easy to use UI interface for François Chollet's [Abstraction and Reasoning Corpus](https://github.com/fchollet/ARC-AGI) such so children as young as three years old might be able to play with it. With the help of this UI one can explore a potential of using ARC as educational material for developing abstraction and reasoning skills of young kids, as ARC tasks are designed to challenge cognitive abilities such as pattern recognition, logical reasoning, and problem-solving, making them ideal for early childhood development.<!--There are also a printable version of the game available at [ARC_for_kids.pdf](ARC_for_kids.pdf). Compiled as a book there are only a subset of the tasks selected that are the most suitable for educational/playing purposes.-->

Link to the game: https://volotat.github.io/ARC-Game/  
<!--Link to the book: [ARC_for_kids.pdf](ARC_for_kids.pdf) --> 

## About

The goal of the game is to solve visual tasks given several examples at the beginning. Tasks are presented as several pairs of grids with arbitrary resolution which contain cells of different colors. Each pair represents some transformation of the input grid into output grid. The task itself is to find that transformation and apply it onto test grids that are presented at the bottom of the page. Only exact solutions, in which all cells match the expected answer, are considered correct ones.
 
### Level structure

![level example](/images/level_example.jpg) 

*Example grid pairs at the top, test grid pair at the middle and color palette at the bottom of an image.*

## Controls

There are several ways to interact with test grids:

<!--1. You can change color of any cell by clicking on it.-->
1. You can choose any color from the palette and then paint with it on the grid.
2. You can fill some space on the grid by dragging the color from the pallet.
3. You can copy input grid data onto output grid by clicking on it.

## Differences with original ARC

Fixed grid sizes: in the original ARC user can specify arbitrary grid size on test output. Some tasks are made such that this mechanics plays important role in solving it. In "The ARC Game" output grid already given in correct size which make such tasks much easier. Unfortunately, I wasn't able to found any good interface for changing grid size that would not be too confusing for children.

Note that the tasks were synchronized with [ARC-AGI](https://github.com/fchollet/ARC-AGI) repository at 20.08.2024.

## Printable version

While web version is more than enough for kids that are already proficient in using web interfaces, for younger kids some physical version of the game might be a much more accessible medium. To make it possible to move present tasks on a simple list of paper, now each task could be printed with "Print" command in your browser of choice. For printing the webpage would be adjusted accordingly. For example, colors of the cell would be slightly shifted to correspond for a typical set of 10 colored markers/pencils.  
Here are colors that are changed in printable version:  
  
Black -> Transparent (white)  
Green -> Dark Green  
Aqua -> Deep Blue  
Grey -> Black (very dark grey)  
Magenta -> Dark Violet  
Maroon -> Brown  

<!--There is [ARC_for_kids.pdf](ARC_for_kids.pdf) available as a book that contain only a selected subset of the most suitable tasks (no tedious tasks, tasks with huge grid, ambiguous tasks and so on.) and some instructions, so it could be used on its own as a complete educational material.-->

![print version example](/images/print_example.png) 

*Example of a level available for printing on a typical A4 paper.*

## Build from source 

This web-app made with parcel bunlder. To be able to build it from source code make sure to install parcel with following command:

```bash
npm install -g parcel-bundler
```

Then run it as your local web application:

```bash
cd source
nvm use --lts
npm start
```

At this point you should be able to visit http://localhost:1234/ and see the game's web page.


## Last update changes (28.08.2024)
* Added new CSS style for printing pages.
* Tasks e7a25a18, 3ee1011a, bd14c3bf moved to 'Easy' category.
* Tasks 662c240a, b0f4d537, 4e45f183, c87289bb moved to 'Medium' category. 
* Tasks a8610ef7, 423a55dc, 6d0160f0 moved to 'Hard' category.
* Task 27a28665 moved to 'Multiple solutions' category.
* All tasks are synchronized with ARC-AGI repository on the following date: 25.08.2024 (1.0.2 release)
* Fixed issue with draggable flood-fill feature.
<!--* - Added compilation of the most suitable tasks for solving by hands as ARC_for_kids.pdf ebook.-->
