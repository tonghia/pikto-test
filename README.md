## Overview

Single page application to add text and image into canvas
Front-end uses Angular framework
Libraries: Bootstrap for styles, NgFileUpload to get image data from front-end, FileSaver to export file data.

## App flow

Let start from front-end/src/app
AppModule (app.module.ts)
    - bootstrap: initialize root component which is AppComponent
    - imports: add other module which add more components to declarations, providers array
    - declarations: declare View components use in this module
    - provides: inject Service (Singleton pattern) which can be shared by all components in this module

AppComponent
    - In app.component.html : the AppComponent use 2 child components - SidePaneComponent, CanvasComponent

SidePaneComponent
    Handle Upload Images and adding Elements (Images, Texts) into Canvas Component
    - SidePaneComponent inject AppService which is a Singleton Object share by both SidePane and Canvas Components
    - When an elements in SidePaneComponent is select, it call AppService addElement (an Subject object of RXJS)
    addElement will fire and event and pass data to any chanel which is listening to it.

CanvasComponent
    Handle Logic for elements' behaviors.

## Evaluate Features

Below are the basic features for the application:

| Evaluate | Feature |
|-----------|:-----------:|
| Good | see the existing images from folder `images` to the images list |
| Good | *upload image* to folder `images` and directly added to images list |
| Good | *add image / text* from the menu to the canvas |
| OK   | *move and delete the image / text* inside the canvas |
| Good | the created objects on canvas can be saved and repopulated on refresh browser |

*move features is not perfect, it is slow


## Evaluate Requirements

| Evaluate | Requirement |
|-----------|:-----------:|
| Good | App should have the features listed |
| Good | App should work on modern browsers (Chrome / Firefox)|
| Good | App logic and data flow are written in a functional and reactive programming concept. Separate the logic between pplication data state and template view / user interactions (unidirectional data flow).|
| OK   | Use libraries as less as possible|
| Good | Code and flow should be properly documented|
| Bad  | Build automated test for the app|


## How To Install

### API

To set up the environment dependencies ( node version 5++ )

```
$ cd {project_path}/server

$ npm install

$ npm run start
```

Server is listening to port `8001`

### FRONTEND

```
$ cd {project_path}/front-end

$ npm install

$ ng serve
```

Client is listening to port `4200`

