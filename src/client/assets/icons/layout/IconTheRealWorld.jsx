/* eslint-disable no-use-before-define */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import React from 'react';
import versor from 'versor';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import './IconTheRealWorld.scss';

// https://jorin.me/d3-canvas-globe-hover/

//
// Configuration
//

// ms to wait after dragging before auto-rotating
const rotationDelay = 1000;
// scale of the globe (not the canvas element)
const scaleFactor = 1;
// autorotation speed
const degPerSec = 6;
// start angles
const angles = { x: -20, y: 40, z: 0 };
// colors
const colorWater = '#5ed6ef';
const colorGraticule = '#6fdaf1';
const colorLand = '#e5f8fc';
const colorCountry = '#ffc7c7';

//
// Variables
//

let current = null;
let canvas = null;
let context = null;
let path = null;
const projection = d3.geoOrthographic().precision(0.1);
const graticule = d3.geoGraticule10();
const water = { type: 'Sphere' };
let v0; // Mouse position in Cartesian coordinates at start of drag gesture.
let r0; // Projection rotation as Euler angles at start.
let q0; // Projection rotation as versor at start.
let lastTime = d3.now();
const degPerMs = degPerSec / 1000;
let width;
let height;
let land;
let countries;
let countryList;
let autorotate; let now;
let diff;
let rotation;
let currentCountry;


//
// Handler
//

function enter(country) {
  country = countryList.find(c => c.id === country.id);
  current.text(country && (country.name || ''));
}

function leave(/* country */) {
  current.text('');
}

//
// Functions
//

function setAngles() {
  rotation = projection.rotate();
  rotation[0] = angles.y;
  rotation[1] = angles.x;
  rotation[2] = angles.z;
  projection.rotate(rotation);
}

function scale() {
  // width = document.documentElement.clientWidth;
  // height = document.documentElement.clientHeight;
  width = canvas.node().offsetWidth;
  height = canvas.node().offsetHeight;
  canvas.attr('width', width).attr('height', height);
  projection
    .scale((scaleFactor * Math.min(width, height)) / 2)
    .translate([width / 2, height / 2]);
  render();
}

function startRotation(delay) {
  autorotate.restart(rotate, delay || 0);
}

function stopRotation() {
  autorotate.stop();
}

function dragstarted() {
  v0 = versor.cartesian(projection.invert(d3.mouse(this)));
  r0 = projection.rotate();
  q0 = versor(r0);
  stopRotation();
}

function dragged() {
  const v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)));
  const q1 = versor.multiply(q0, versor.delta(v0, v1));
  const r1 = versor.rotation(q1);
  projection.rotate(r1);
  render();
}

function dragended() {
  startRotation(rotationDelay);
}

function render() {
  context.clearRect(0, 0, width, height);
  fill(water, colorWater);
  stroke(graticule, colorGraticule);
  fill(land, colorLand);
  if (currentCountry) {
    fill(currentCountry, colorCountry);
  }
}

function fill(obj, color) {
  context.beginPath();
  path(obj);
  context.fillStyle = color;
  context.fill();
}

function stroke(obj, color) {
  context.beginPath();
  path(obj);
  context.strokeStyle = color;
  context.stroke();
}

function rotate(elapsed) {
  now = d3.now();
  diff = now - lastTime;
  if (diff < elapsed) {
    rotation = projection.rotate();
    rotation[0] += diff * degPerMs;
    projection.rotate(rotation);
    render();
  }
  lastTime = now;
}

async function loadData(cb) {
  const world = await fetch('/world-110m.json').then(res => res.json());
  d3.tsv('/world-country-names.tsv').then((countriesz) => {
    cb(world, countriesz);
  });
}

// https://github.com/d3/d3-polygon
function polygonContains(polygon, point) {
  const n = polygon.length;
  let p = polygon[n - 1];
  const x = point[0]; const
    y = point[1];
  let x0 = p[0]; let
    y0 = p[1];
  let x1; let
    y1;
  let inside = false;
  for (let i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
    x0 = x1, y0 = y1;
  }
  return inside;
}

function mousemove() {
  const c = getCountry(this);
  if (!c) {
    if (currentCountry) {
      leave(currentCountry);
      currentCountry = undefined;
      render();
    }
    return;
  }
  if (c === currentCountry) {
    return;
  }
  currentCountry = c;
  render();
  enter(c);
}

function getCountry(event) {
  const pos = projection.invert(d3.mouse(event));
  return countries.features.find(
    f => f.geometry.coordinates.find(
      c1 => polygonContains(c1, pos) || c1.find(function (c2) {
        return polygonContains(c2, pos);
      })
    )
  );
}


export default class extends React.PureComponent {
  componentDidMount() {
    current = d3.select('.icon-globe__label');
    canvas = d3.select('.icon-globe');
    context = canvas.node().getContext('2d');
    path = d3.geoPath(projection).context(context);

    //
    // Initialization
    //

    setAngles();

    canvas
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('mousemove', mousemove)
      .on('touchmove', mousemove);

    loadData((world, cList) => {
      land = topojson.feature(world, world.objects.land);
      countries = topojson.feature(world, world.objects.countries);
      countryList = cList;

      window.addEventListener('resize', scale);
      scale();
      autorotate = d3.timer(rotate);
    });
  }

  render() {
    const { color, className, ...restProps } = this.props;
    return (
      <div className={`icon-globe__wrapper ${className || ''}`} {...restProps}>
        <canvas className="icon-globe" />
        <div className="icon-globe__shadow" />
        <div className="icon-globe__label" />
      </div>
    );
  }
}
