# Graph Theory Interactive Tool

## What is it?
A web app to visually create and manipulate graphs and run algorithms on them. This project is made to demonstrate both web development in **JavaScript** and graph theory **algorithms**.
## How was it developed?
All code is available on this repo for learning purposes! I will go over how **challenging aspects** of the app were created as I add them. Most of the code is in the file graph.js
### Drawing Curved Edges:
Creating curves that start between two points (vertices) and curve exactly to the position of the mouse is not trivial. The way I implemented them is Bezier Curves(https://en.wikipedia.org/wiki/B%C3%A9zier_curve).
Lets start with drawing the curves. When the user clicks on an edge and drags it with the mouse the curve has to draw from the first vertice, to the mouse position, to the second vertice. In order to have a correct quadratic Bezier Curve satisfying these constraints we need to **calculate an appropriate control point**, C. The key point to notice is the closest value of t to the control point will be the **critical point of the first derivate** of the curve. This works out to always be t = 0.5. Now we can rearrange the equations on the wikipedia page to solve for out control point C. Once we have C we use the built in quadraticCurveTo method in the canvas!
### Directed Edges:
The triangles showing a direction of an edge are rotated based on the curve of the edge. The only trick here is **approximating the angle of the Bezier curve**. My approach is to take the start point and the point that is 10% of the distance in, t = 0.1. After finding this angle I can draw a triangle that is rotated using simple trig functions that has the illusion of pointing into the vertice.
### Detecting Clicks on Curves:
While still not trivial, JavaScript will do most of the work for us. We need to use the built in method **isPointInPath**. We now have to create a path surrounding our Bezier curve. The trick is to use two more curves with a slight offset of the original. Using these we can surround the original curve with a thicker curve that acts as our hitbox for the user clicking on edges.
## Usage
When complete there will be a DOCS describing what all the tools and algorithms do, and how to use them.
## License
All code and assets were created by James Andreou and is strictly for learning. **ALL RIGHTS RESERVED**.
