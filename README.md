# Expedia testing tool

## About

Backend tool made with **Ruby** and **Sinatra** that replicates Expedia's production behavior. Despite being a personal project used for a technical interview, it was used to compare/test types, filters, segments, prices, and flight combinations in the development stage of the Expedia Flight Shop.

## Up services

```
$ docker compose build
$ docker compose up
```

To see the front-end page go to http://localhost:8080/ in your browser.

## Usage

Select `Choose file` to proof preselected configurations of flights (roundtrip, multicity 2 cities, multicity 4 cities) stored in the `data-set/` folder.
<p align="center">
    <img src="https://user-images.githubusercontent.com/43507646/233896427-6f388ad4-a5d1-4245-b594-002a6eb4e6f0.png" />
</p>

## Screenshots

Production Multicity 4 cities   |  Tool Multicity 4 cities
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/43507646/233896035-c3da06a5-2284-48f0-9a6f-3b8ed14bf1a2.png) |  ![image](https://user-images.githubusercontent.com/43507646/233894979-1337d8dd-032a-4d0c-a66e-c7f365e1e356.png)



Roundtrip             |  Control Panel
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/43507646/233895150-d3f9ef71-396d-4751-982e-702a49bc52a2.png) | ![image](https://user-images.githubusercontent.com/43507646/233894029-0283f904-3cf7-4cfc-b14e-d226ff64e6f1.png)





