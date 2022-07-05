# The ARC Game
The Abstraction and Reasoning Corpus made into a web game

The aim of this repository is to create easy to use UI interface for François Chollet's [Abstraction and Reasoning Corpus](https://github.com/fchollet/ARC) such so children as young as three years old might be able to play with it.

Link to the game: https://volotat.github.io/ARC-Game/

## About

The goal of the game is to solve visual tasks given several examples at the beginning. Tasks are presented as several pairs of grids with arbitrary resolution which contains cells of different colors. Each pair represent some transformation of the input grid into output grid. The task itself is to find that transformation and apply it onto test grids that are presented at the bottom of the page. Only exact solutions, in which all cells match the expected answer, are considered correct ones.
 
### Level structure

![level example](/images/level_example.jpg "This is a Title") 

*Example grid pairs at the top, test grid pair at the middle and color palette at the bottom of an image.*

## Controls

There are several ways to interact with test grids:

<!--1. You can change color of any cell by clicking on it.-->
1. You can choose any color from the palette and then paint with it on the grid.
2. You can fill some space on the grid by dragging the color from the pallet.
3. You can copy input grid data onto output grid by clicking on it.

## Differences with original ARC

Fixed grid sizes: in the original ARC user can specify arbitrary grid size on test output. Some tasks are made such that this mechanics plays important role in solving it. In "The ARC Game" output grid already given in correct size which make such tasks much easier. Unfortunately, I wasn't able to found any good interface for changing grid size that would not be too confusing for children.

## Build from source 

This web-app made with parcel bunlder. To be able to build it from source code make sure to install parcel with following command:

```bash
npm install -g parcel-bundler
```

Then run it as your local web application:

```bash
npm start
```

At this point you should be able to visit http://localhost:1234/ and see the game's web page.
