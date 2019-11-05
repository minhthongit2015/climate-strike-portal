/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
import React from 'react';
import * as d3 from 'd3';
import './IconTheRealWorld.scss';
import * as topojson from 'topojson-client';
import * as versor from 'versor';

const Config = {
  rotationDelay: 3000, // ms to wait after dragging before auto-rotating
  scaleFactor: 0.9, // scale of the globe (not the canvas element)
  degPerSec: 6, // autorotation speed
  angles: { x: -20, y: 40, z: 0 }, // start angles
  colorWater: '#fff',
  colorLand: '#111',
  colorGraticule: '#ccc',
  colorCountry: '#a00'
};


export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.countryList = null;
    this.water = { type: 'Sphere' };
    this.graticule = d3.geoGraticule10();

    this.v0 = undefined; // Mouse position in Cartesian coordinates at start of drag gesture.
    this.r0 = undefined; // Projection rotation as Euler angles at start.
    this.q0 = undefined; // Projection rotation as versor at start.

    this.lastTime = d3.now();
    this.degPerMs = Config.degPerSec / 1000;
    this.width = undefined;
    this.height = undefined;
    this.land = undefined;
    this.countries = undefined;
    this.autorotate = undefined;
    this.now = undefined;
    this.diff = undefined;
    this.roation = undefined;
    this.currentCountry = undefined;

    this.dragstarted = this.dragstarted.bind(this);
    this.dragged = this.dragged.bind(this);
    this.dragended = this.dragended.bind(this);
    this.mousemove = this.mousemove.bind(this);
  }

  componentDidMount() {
    this.current = d3.select('#current');
    this.canvas = d3.select('#globe');
    this.context = this.canvas.node().getContext('2d');
    this.projection = d3.geoOrthographic().precision(0.1);
    this.path = d3.geoPath(this.projection).context(this.context);

    this.setAngles();

    this.canvas
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended))
      .on('mousemove', this.mousemove);

    this.loadData((world, cList) => {
      this.land = topojson.feature(world, world.objects.land);
      this.countries = topojson.feature(world, world.objects.countries);
      this.countryList = cList;

      window.addEventListener('resize', this.scale);
      this.scale();
      this.autorotate = d3.timer(this.rotate);
    });
  }

  handleEnter(country) {
    country = this.countryList.find(c => c.id === country.id);
    this.current.text(country && (country.name || ''));
  }

  handleLeave(/* country */) {
    this.current.text('');
  }

  setAngles() {
    const rotation = this.projection.rotate();
    rotation[0] = Config.angles.y;
    rotation[1] = Config.angles.x;
    rotation[2] = Config.angles.z;
    this.projection.rotate(rotation);
  }

  scale() {
    this.width = '100%';
    this.height = '100%';
    this.canvas.attr('width', this.width).attr('height', this.height);
    this.projection
      .scale((Config.scaleFactor * Math.min(this.width, this.height)) / 2)
      .translate([this.width / 2, this.height / 2]);
    this.renderCanvas();
  }

  startRotation(delay) {
    this.autorotate.restart(this.rotate, delay || 0);
  }

  stopRotation() {
    this.autorotate.stop();
  }

  dragstarted() {
    this.v0 = versor.cartesian(this.projection.invert(d3.mouse(this)));
    this.r0 = this.projection.rotate();
    this.q0 = versor(this.r0);
    this.stopRotation();
  }

  dragged() {
    const v1 = versor.cartesian(this.projection.rotate(this.r0).invert(d3.mouse(this)));
    const q1 = versor.multiply(this.q0, versor.delta(this.v0, v1));
    const r1 = versor.rotation(q1);
    this.projection.rotate(r1);
    this.renderCanvas();
  }

  dragended() {
    this.startRotation(Config.rotationDelay);
  }

  renderCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.fill(this.water, Config.colorWater);
    this.stroke(this.graticule, Config.colorGraticule);
    this.fill(this.land, Config.colorLand);
    if (this.currentCountry) {
      this.fill(this.currentCountry, Config.colorCountry);
    }
  }

  fill(obj, color) {
    this.context.beginPath();
    this.path(obj);
    this.context.fillStyle = color;
    this.context.fill();
  }

  stroke(obj, color) {
    this.context.beginPath();
    this.path(obj);
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  rotate(elapsed) {
    this.now = d3.now();
    this.diff = this.now - this.lastTime;
    if (this.diff < elapsed) {
      this.rotation = this.projection.rotate();
      this.rotation[0] += this.diff * this.degPerMs;
      this.projection.rotate(this.rotation);
      this.renderCanvas();
    }
    this.lastTime = this.now;
  }

  // eslint-disable-next-line class-methods-use-this
  loadData(cb) {
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', (error, world) => {
      if (error) throw error;
      d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', (error1, countries) => {
        if (error1) throw error1;
        cb(world, countries);
      });
    });
  }

  // https://github.com/d3/d3-polygon
  polygonContains(polygon, point) {
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

  mousemove() {
    const c = this.getCountry(this);
    if (!c) {
      if (this.currentCountry) {
        this.handleLeave(this.currentCountry);
        this.currentCountry = undefined;
        this.renderCanvas();
      }
      return;
    }
    if (c === this.currentCountry) {
      return;
    }
    this.currentCountry = c;
    this.renderCanvas();
    this.handleEnter(c);
  }

  getCountry(event) {
    const pos = this.projection.invert(d3.mouse(event));
    return this.countries.features.find(
      f => f.geometry.coordinates.find(
        c1 => this.polygonContains(c1, pos) || c1.find(c2 => this.polygonContains(c2, pos))
      )
    );
  }

  render() {
    const { color, className, ...restProps } = this.props;
    return (
      <div className={`icon-globe-wrapper ${className || ''}`} {...restProps}>
        <canvas id="globe" className="icon-globe" />
        <div id="current" />
      </div>
    );
  }
}
