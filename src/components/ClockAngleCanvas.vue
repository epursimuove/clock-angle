<script setup lang="ts">
import type {Coordinates, Settings, State} from "@/types/types";
import {onMounted, watch} from "vue";

const props = defineProps<{
  settings: Settings;
  state: State;
}>();

const radius = 200;
const radiusInnerCircle = 8; //radius / 2 - 20;
const origoX = 250;
const origoY = 270;
const digitalClockY = 20;

const lengthSecondHand = radius;
const lengthMinuteHand = radius;
const lengthHourHand = radius - 60;

// const colorCircle = "#333";
const colorCircle = "#999";
const colorMinuteMarkers = "#999";
const colorAngleStarter = "#bbb";
const colorText = "#333";
const colorSecondHand = "#a00";
const colorMinuteHand = "#0a0";
const colorHourHand = "#00a";

onMounted(() => {
  // console.log("onMounted");
  init();
  // console.log("process.env.VUE_APP_VERSION", process.env.VUE_APP_VERSION);
});

const init = () => {
  console.group("Initializing Clock Angle canvas component");

  const canvasClockAngle = document.getElementById(
      "canvasClockAngle"
  ) as HTMLCanvasElement;
  const canvasWidth = canvasClockAngle?.width;
  const canvasHeight = canvasClockAngle?.height;
  let cx: CanvasRenderingContext2D;

  function drawStaticContent(state: State) {
    if (props.settings.showAngles) {
      drawAngleStarter();
    }

    drawClockFace(state);

    drawCircles();
  }

  function drawDynamicContent(state: State) {

    addTexts(state);

    if (props.settings.showAngles) {
      drawAngles(state);
    }

    if (props.settings.showHands) {
      drawHourHand(state);
      drawMinuteHand(state);
      if (props.settings.showSecondHand) {
        drawSecondHand(state);
      }
    }
  }

  function drawAngleStarter() {
    cx.strokeStyle = colorAngleStarter;
    cx.lineWidth = 1.0;
    cx.setLineDash([10, 10]);

    cx.beginPath();
    cx.moveTo(origoX, origoY - radiusInnerCircle);
    cx.lineTo(origoX, origoY - radius);
    cx.closePath();
    cx.stroke();
  }

  function drawClockFace(state: State) {
    drawMarkers(state);
  }

  function drawCircles() {
    cx.strokeStyle = colorCircle;
    cx.lineWidth = 3.0;
    cx.setLineDash([]);

    const outerCircle = false;
    if (outerCircle) {
      cx.beginPath();
      cx.arc(origoX, origoY, radius, 0, Math.PI * 2, false);
      cx.closePath();
      cx.stroke();
    }

    cx.beginPath();
    cx.arc(origoX, origoY, radiusInnerCircle, 0, Math.PI * 2, false);
    cx.closePath();
    cx.stroke();
  }

  function drawMarkers(state: State) {
    drawMinuteMarkers();

    const stepInDegrees = props.settings.twentyFourHours ? 15 : 30;
    drawHourMarkers(state, stepInDegrees);
  }

  function drawMinuteMarkers() {
    for (let angleDeg = 0; angleDeg < 360; angleDeg += 6) {
      const angleRad = ((angleDeg - 90) * Math.PI) / 180;

      // const thickness = 1;
      const thickness = angleDeg % 30 === 0 ? 2 : 1;
      const length = thickness * 8;
      // const length = 5;

      const xOuter = origoX + radius * Math.cos(angleRad);
      const xInner = origoX + (radius - length) * Math.cos(angleRad);
      const yOuter = origoY + radius * Math.sin(angleRad);
      const yInner = origoY + (radius - length) * Math.sin(angleRad);

      const coordinates = {
        outer: {
          x: xOuter,
          y: yOuter,
        },
        inner: {
          x: xInner,
          y: yInner,
        },
      };

      drawMarker(coordinates, thickness, colorMinuteMarkers);
    }
  }

  function drawHourMarkers(state: State, stepInDegrees: number) {
    let hourValue = state.time.hours < 12 ? 0 : stepInDegrees === 30 ? 12 : 0;
    let minuteValue = 0;

    for (let angleDeg = 0; angleDeg < 360; angleDeg += stepInDegrees) {
      const angleRad = (angleDeg - 90) * Math.PI / 180;

      // const thickness = angleDeg % 90 === 0 ? 3 : 2;
      const thickness = angleDeg % (stepInDegrees * 3) === 0 ? 3 : 2;
      const length = thickness * 10;

      const xOuter = origoX + radius * Math.cos(angleRad);
      const yOuter = origoY + radius * Math.sin(angleRad);
      const xInner = origoX + (radius - length) * Math.cos(angleRad);
      const yInner = origoY + (radius - length) * Math.sin(angleRad);
      const xNumberHourCenter = origoX + (radius - 40) * Math.cos(angleRad);
      const yNumberHourCenter = origoY + (radius - 40) * Math.sin(angleRad);
      const xNumberMinuteCenter = origoX + (radius + 15) * Math.cos(angleRad);
      const yNumberMinuteCenter = origoY + (radius + 15) * Math.sin(angleRad);

      const coordinates = {
        outer: {
          x: xOuter,
          y: yOuter
        },
        inner: {
          x: xInner,
          y: yInner
        },
        numberHourCenter: {
          x: xNumberHourCenter,
          y: yNumberHourCenter
        },
        numberMinuteCenter: {
          x: xNumberMinuteCenter,
          y: yNumberMinuteCenter
        }
      };

      if (props.settings.faceWithNumbers) {
        drawHourNumbers(hourValue, coordinates);
        if (angleDeg % 30 === 0) {
          drawMinuteNumbers(minuteValue, coordinates);
        }
      } else {
        drawMarker(coordinates, thickness, colorHourHand);
      }

      hourValue++;
      if (angleDeg % 30 === 0) {
        minuteValue += 5;
      }
    }
  }

  function drawMarker(
      coordinates: Coordinates,
      thickness: number,
      color: string
  ) {
    cx.strokeStyle = color;
    cx.lineWidth = thickness === 3 ? 11.0 : thickness === 2 ? 7.0 : 1.0;
    cx.setLineDash([]);

    cx.beginPath();

    cx.moveTo(coordinates.outer.x, coordinates.outer.y);
    cx.lineTo(coordinates.inner.x, coordinates.inner.y);

    cx.closePath();
    cx.stroke();
  }

  function drawHourNumbers(hourValue: number, coordinates: Coordinates) {

    if (coordinates.numberHourCenter) {
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      cx.fillStyle = colorHourHand;
      cx.font = "20px 'Courier New'";

      cx.fillText(
          hourValue.toString(),
          coordinates.numberHourCenter.x,
          coordinates.numberHourCenter.y
      );
    }
  }

  function drawMinuteNumbers(minuteValue: number, coordinates: Coordinates) {

    if (coordinates.numberMinuteCenter) {
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      cx.fillStyle = colorMinuteMarkers;
      cx.font = "12px 'Courier New'";

      cx.fillText(
          minuteValue.toString(),
          coordinates.numberMinuteCenter.x,
          coordinates.numberMinuteCenter.y
      );
    }
  }

  function addTexts(state: State) {

    if (props.settings.showDigitalClock) {
      cx.textAlign = "center";
      cx.fillStyle = colorText;
      cx.font = "36px 'Courier New'";

      const hours = state.time.hours.toString().padStart(2, "0");
      const minutes = state.time.minutes.toString().padStart(2, "0");
      const seconds = state.time.seconds.toString().padStart(2, "0");

      const time = `${hours}:${minutes}:${seconds}Z`;

      cx.fillText(time, origoX, digitalClockY);
    }
  }

  function drawAngles(state: State) {
    if (props.settings.showSecondHand) {
      drawAngle(state.secondHand.angleRad, 60, colorSecondHand);
    }
    drawAngle(state.minuteHand.angleRad, 40, colorMinuteHand);
    drawAngle(state.hourHand.angleRad, 20, colorHourHand);
  }

  function drawAngle(
      angleRad: number,
      distanceFromInnerCircle: number,
      color: string
  ) {
    cx.strokeStyle = color;
    cx.lineWidth = 3.0;
    cx.setLineDash([]);

    cx.beginPath();
    cx.arc(origoX, origoY, radiusInnerCircle + distanceFromInnerCircle, -Math.PI / 2, angleRad, false);
    cx.stroke();
  }

  function drawSecondHand(state: State) {
    cx.strokeStyle = colorSecondHand;
    cx.lineWidth = 3.0;
    cx.setLineDash([]);

    cx.beginPath();

    const xInner = origoX + radiusInnerCircle * Math.cos(state.secondHand.angleRad);
    const yInner = origoY + radiusInnerCircle * Math.sin(state.secondHand.angleRad);

    const xSeconds = origoX + lengthSecondHand * Math.cos(state.secondHand.angleRad);
    const ySeconds = origoY + lengthSecondHand * Math.sin(state.secondHand.angleRad);

    cx.moveTo(xInner, yInner);
    cx.lineTo(xSeconds, ySeconds);

    cx.closePath();
    cx.stroke();
  }

  function drawMinuteHand(state: State) {
    cx.strokeStyle = colorMinuteHand;
    cx.lineWidth = 5.0;
    cx.setLineDash([]);

    cx.beginPath();

    const xInner = origoX + radiusInnerCircle * Math.cos(state.minuteHand.angleRad);
    const yInner = origoY + radiusInnerCircle * Math.sin(state.minuteHand.angleRad);

    const xMinutes = origoX + lengthMinuteHand * Math.cos(state.minuteHand.angleRad);
    const yMinutes = origoY + lengthMinuteHand * Math.sin(state.minuteHand.angleRad);

    cx.moveTo(xInner, yInner);
    cx.lineTo(xMinutes, yMinutes);

    cx.closePath();
    cx.stroke();
  }

  function drawHourHand(state: State) {
    cx.strokeStyle = colorHourHand;
    cx.lineWidth = 7.0;
    cx.setLineDash([]);

    cx.beginPath();

    const xInner = origoX + radiusInnerCircle * Math.cos(state.hourHand.angleRad);
    const yInner = origoY + radiusInnerCircle * Math.sin(state.hourHand.angleRad);

    const xHours = origoX + lengthHourHand * Math.cos(state.hourHand.angleRad);
    const yHours = origoY + lengthHourHand * Math.sin(state.hourHand.angleRad);

    cx.moveTo(xInner, yInner);
    cx.lineTo(xHours, yHours);

    cx.closePath();
    cx.stroke();
  }

  function clearCanvas() {
    cx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  watch(() => props.state,
      (state, previousState) => {
        // console.log('state', state);
        clearCanvas();
        drawStaticContent(state);
        drawDynamicContent(state);
      });

  if (typeof canvasClockAngle?.getContext !== "undefined") {
    cx = canvasClockAngle?.getContext("2d") as CanvasRenderingContext2D;

    // window.requestAnimationFrame(updateLoop);
    console.log("Canvas component up and running");
    console.groupEnd();
  }
};


</script>

<template>

  <div>
    <div class="canvas-wrapper">
      <canvas id="canvasClockAngle" width="500" height="500" />
    </div>
  </div>

</template>

<style scoped>

.canvas-wrapper {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

canvas {
  /*border: 1px solid lightgray;*/
  max-width: 100%;
}

</style>
