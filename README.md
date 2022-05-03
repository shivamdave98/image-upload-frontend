# Getting started with the image upload/gallery app

## Prerequisites

Please ensure you have `npm` and `yarn` installed on your machine

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

## Clone the repository

You may clone the repository onto your machine using `git clone https://github.com/shivamdave98/image-upload-frontend.git`

I'd recommend cloning it your Desktop or Home folder

## Terminal Sessions

Please open **3 terminal sessions**

1 will be for package installations
2 will be for launching the backend
3 will be for launching the frontend

## Setup for Frontend

In the **1st terminal session**, please `cd` into the `image-upload-frontend` directory containing the project files

Now run `yarn`

*note this may take a few minutes

## Setup for Backend

Now in the same terminal session, `cd api`

We are now in the backend folder of this project

Create a python virtual environment and activate it

```console
$ python3 -m venv env
$ source env/bin/activate
```

Now we should be in our virtual environment `env` (which we can exit any time by ctrl + c)

Now, we can install all of our python and backend libraries...

```console
pip install flask
pip install flask_sqlalchemy
pip install flask_praetorian
pip install flask_cors
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade Pillow
pip install uuid
pip install python-dotenv
```

## Running the Backend

In the **2nd terminal session**, please `cd` into the `image-upload-frontend` directory containing the project files

Now run `yarn start-api`

## Running the Frontend

In the **3rd terminal session**, please `cd` into the `image-upload-frontend` directory containing the project files

Now run `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Now the app should be running and you can interact with the website.
