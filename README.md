## Build State

* branch master: [![Build Status](https://travis-ci.org/Krymnos/IDP-frontend.svg?branch=master)](https://travis-ci.org/Krymnos/IDP-frontend)

# PROJECT IDP-FRONTEND

This component acts as a interface for our IDP- Error detection use case and debugging. It visualizes the provenance data generated in the IoT pipeline which is stored in Cassandra Database and then communicates with the backend to populate the data. The frontend will be issuing the GET requests to the API endpoints defined in the Backend system. These endpoints are listed in the Backend repository [README.md](https://github.com/Krymnos/IDP-backend) file.

## Requirements

For running the system, you will only need Node.js installed on your environement.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v9.4.0

    $ npm --version
    5.6.0
---
## Install

    $ git clone https://github.com/Krymnos/IDP-frontend.git
    $ cd IDP-frontend
    $ npm install

### Configure app to run on desired Port.

To configure the app to run on a desired port
Open the file app.js under bin/www folder.

- by default Port is 8080
- Change the port to your desired port.

## Start & watch

    $ npm start
    
## Access the Application

    http://localhost:8080

## Simple build for production

    $ npm run build

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

---

## Languages & tools

### Framework
- [Express](https://expressjs.com/) Express is a fast, un-opinionated, minimalist web application framework for Node.js. It is designed for building web applications and is the de facto standard server framework for Node.js.
### HTML

- [Pug](https://pugjs.org/) It is View-Engine templating.

### JavaScript

- [JSHint](http://www.jshint.com/docs/) is used to prevent JavaScript error.

### CSS

- [bootstrap](https://getbootstrap.com/) provides a set of stylesheets that provide basic style definitions for all key HTML components. These provide a uniform, modern appearance for formatting text, tables and form elements.

### Network Graph Library

- [Visjs](http://visjs.org/) A dynamic, browser based visualization library. The library is designed to be easy to use, to handle large amounts of dynamic data, and to enable manipulation of and interaction with the data. This library enabled use to visualize the nodes in the pipeline. and it was represented as DAG (Directed Arrow Graph). This library is licenses under Apache 4.0 and MIT

---
## Screnshots
 - Dashboard
 ![dashboard Dashboard](https://lh3.googleusercontent.com/HMZ9-ltqapKs0AR7U1gAgGTbzI5qc7A9ItoY3D6jqv7Ze_lp28BqqB6uawTY1yr_5oRy7FQAsH8xJ40oRVK0nv5H_v60c5Y1IBwGe9LIvIaZ7KcI0_iu9e9Jtv4wwZwhS6C_7aN4wvgThvcQSHilcrAMuOTpJe30KEqxUhg_4yIiNqXF3bYeZDOOV62JWSU0qDPfvMH8aozhQ4WQjYRPaGBSn1KjObbf1nuV3_LHXHfCyNfavoMeLxQmQbxZLuASnxjrvDLEq7GCqV03v_9UfOd8FWGghgGvpgnyMa5v8j4D3zHZQBtKKfpP_ezBbPTwsdujo-3-jfbcZ0BpDdYYQRx3QpBzfqkE7EP6IzmQaoSjOJIdGr0AHtVnU227vUsgFsa4Gjb4pz4ewCFUKxVG4uBD8cE8Pq5YgPNrryMuZ1VlL8hGDa6QyBLzupjMiBtSE1xG0qQAO2_wzVskUBoxU9BK0s306PuUM7my69t8vVyOD3U2Hl9khuG7Sd1bdRROIWjin_q-vsVtovP1kiEQo-CwXMNW-L2LqZV6sci6qWshaw0mgfCIdf_ICLkS-nMvqLyr9ibm_iLLV4cjgAm2m9fHV_kyQ8OaWHvrsjS0=w1902-h923-no)

- Node Visualisation
![node node](https://lh3.googleusercontent.com/y9O-iw6IApXvm5jVjRIqA7K1ULzc3x2VL6Pa4ipfOhdyZMwoc_CwKnDL4L6dHap2J2Slgfo0LgpKDo791Dbt7XkWpGxnzM0YCcGKOXikKiU6hD9CGs87ISNEi1-aIhwmt_2ID3dcdgGPV7EgFicGrBCOAgfRh40fsG7-wArB1Wqy0Nnr9BnpdnmmAdhzJUweFSLYwIr1KP4UCOZhg2pnuDI78BkxqP2DYtfcHl2-pTUEMYMhlPTsiPhjy_6PxOCat-vXUfLTWYojWJI6DRHwLZEfzWDF6hC0MGR-dF3UlPaPiKCahMXbbapBS1MJ7me8b2K0LN_lAY4finknskNLTclqt8aU-h_Xe_PROp7CU52Wpbiicxfn82fReaKIOo9u7J3Q7sZnvt6ddcw7jCxN1_Y4gmFQj_U0WPt_FZtPB0Ku4iqW5RwPQ1tJtJl_6AzFGjpYIKBxgefzYaI74qvT8PkHvWlTGuOMepPd1Jw51w-B9Tm2Mr9XhV_DCRwfhEZ6CEGQ6ZAjQ8Sue0dF64ldSWvvnRPSj5rUinGm6IXiHAyfOAJM6I-W2hynrZmHIsFqu2WEsB69ixa9flU9PBOvvSS6lUiOvbhrXEb5rzQI=w1748-h983-no)

- CQL Editor
![node node](https://lh3.googleusercontent.com/-o1vf-koWXhXPYy8NwRpKlfn94YSnp9ABWfnCSirV7Y3Ti0m94OD5b_4GjNwuf4kheCzgof7q-xnQJDX8LtGDMRlhOxK6VGnBVC2ON5ScUeXUSB_SOG8DKoVhxE3Cwq7iLa-4n6gwG0M7x-ifeRYREomY_uCvPYZaowtT7TBfHKj4uvfu8aIjzwczghRf_kjqO0v2yWv5KvjBGM1pZ2mkYv5FONHPX4bXWh79WPj-eRMCUh1hsLuwlnp_nPhfjZEsLSZIg-hBO6__k2stIfAW0qThwbFRcft1IvD-IjzMNrt2101dtbpBSb1PKtqrX93FORlPSXP7MjCWwMSwCJ65-dBhGUj5UytVDQFlMPHoubkOz2tvRHTSAKCWxaO9QArLwS2EOYVxmCnLBTaFWekR7oKboChhKt8KyfaP8jpUZJvO-dPokSZP3PTS_qfvhIVtVGT-ALD9xgBNz8CFpPm67YtWv3jUEmCqHmUoJhGDUsU5qWoESbbMPQoMY7a1xCKzpprdC325JLBDFK81V7pYQLOq8Ep9s4AS3kJo4xp0ZmskkzbM2WgGAJbu0p1NT5LuYr6tIZlWcDZqf9OqHMOzK62Vv-mER8G3zZGxRGc=w1023-h532-no)


