<template>

  <div class="clock-angle">

    <div class="settings">
      <div>
        <input id="faceWithNumbers" type="checkbox" v-model="faceWithNumbers"/>
        <label for="faceWithNumbers">
          Face with numbers
        </label>
      </div>

      <div>
        <input id="showingAngles" type="checkbox" v-model="showingAngles"/>
        <label for="showingAngles">
          Showing angles
        </label>
      </div>

      <div>
        <input id="showingDigitalClock" type="checkbox" v-model="showingDigitalClock"/>
        <label for="showingDigitalClock">
          Showing digital clock
        </label>
      </div>

      <div>
        <input id="twentyFourHours" type="checkbox" v-model="twentyFourHours"/>
        <label for="twentyFourHours">
          24-hour analog dial
        </label>
      </div>

      <div>
        <input id="smoothSecondHand" type="checkbox" v-model="smoothSecondHand"/>
        <label for="smoothSecondHand">
          Smooth second hand
        </label>
      </div>

      <div>
        <input id="smoothMinuteHand" type="checkbox" v-model="smoothMinuteHand"/>
        <label for="smoothMinuteHand">
          Smooth minute hand
        </label>
      </div>

      <div>
        <input id="smoothHourHand" type="checkbox" v-model="smoothHourHand"/>
        <label for="smoothHourHand">
          Smooth hour hand
        </label>
      </div>

      <div>
        <input id="showSecondHand" type="checkbox" v-model="showSecondHand"/>
        <label for="showSecondHand">
          Showing second hand
        </label>
      </div>

      <div>
        <input id="showHands" type="checkbox" v-model="showHands"/>
        <label for="showHands">
          Showing hands
        </label>
      </div>

    </div>

    <ClockAngleCanvas
        :settings="settings"
        :state="state"/>

    <div class="current-state">
      <div class="math color-angle-seconds">
        <div v-if="settings.showSecondHand">
          {{ angleSeconds }}
        </div>
        <div v-else>
          &nbsp;
        </div>
      </div>

      <div class="math color-angle-minutes">
        {{ angleMinutes }}
      </div>

      <div class="math color-angle-hours">
        {{ angleHours }}
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import ClockAngleCanvas from "@/components/ClockAngleCanvas.vue";
import { State } from "@/types/State";

export default defineComponent({
  name: "ClockAngle",

  components: {
    ClockAngleCanvas
  },

  setup() {

    const faceWithNumbers = ref(true);
    const showingAngles = ref(true);
    const showingDigitalClock = ref(true);
    const twentyFourHours = ref(false);
    const smoothSecondHand = ref(false);
    const smoothMinuteHand = ref(false);
    const smoothHourHand = ref(false);
    const showSecondHand = ref(true);
    const showHands = ref(true);

    let lastHandledTimestamp = 0;

    const settings = reactive({
      showAngles: showingAngles,
      twentyFourHours,
      faceWithNumbers,
      smoothSecondHand,
      smoothMinuteHand,
      smoothHourHand,
      showSecondHand,
      showHands,
      showDigitalClock: showingDigitalClock,
    });

    const padDegreeAndFixed = (
      degrees: number,
      maxLength: number,
      decimals = 2
    ) => {
      return degrees.toFixed(decimals).padStart(maxLength);
    };

    const formatDegrees = (label: string, degrees: number, smooth: boolean) => {
      const metaText = smooth ? "smooth" : "discrete";
      const maxLength = 19 - label.length;
      return `${label}: ${padDegreeAndFixed(degrees, maxLength)}° (${metaText})`;
    };

    const angleSeconds = computed(() => formatDegrees("Angle seconds", state.value.secondHand.angleDeg, settings.smoothSecondHand));

    const angleMinutes = computed(() => formatDegrees("Angle minutes", state.value.minuteHand.angleDeg, settings.smoothMinuteHand));

    const angleHours = computed(() => formatDegrees("Angle hours", state.value.hourHand.angleDeg, settings.smoothHourHand));

    onMounted(() => {
      // console.log("onMounted");
      init();
      // console.log("process.env.VUE_APP_VERSION", process.env.VUE_APP_VERSION);
    });

    function calculateState(): State {

      const now = new Date();
      const hours = now.getUTCHours();
      const minutes = now.getUTCMinutes();
      const seconds = now.getUTCSeconds();
      const ms = now.getUTCMilliseconds();

      const angleSecondsDeg = smoothSecondHand.value
          ? 6 * (seconds + ms / 1000)
          : 6 * seconds;

      const angleMinutesDeg = smoothMinuteHand.value
          ? 6 * (minutes + seconds / 60 + ms / (60 * 1000))
          : 6 * minutes;

      let angleHoursDeg = null;

      if (!twentyFourHours.value) {
        // Modulo 12 since we have a 12-hour clock and not a 24-hour clock.
        angleHoursDeg = smoothHourHand.value
            ? (60 * (hours % 12) + minutes + seconds / 60 + ms / (60 * 1000)) / 2
            : (60 * (hours % 12) + minutes) / 2;

      } else {
        angleHoursDeg = smoothHourHand.value
            ? (60 * hours + minutes + seconds / 60 + ms / (60 * 1000)) / 4
            : (60 * hours + minutes) / 4;
      }

      const angleSecondsRad = (angleSecondsDeg - 90) * Math.PI / 180;

      const angleMinutesRad = (angleMinutesDeg - 90) * Math.PI / 180;

      const angleHoursRad = (angleHoursDeg - 90) * Math.PI / 180;

      const state = {
        time: {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        },
        secondHand: {
          angleDeg: angleSecondsDeg,
          angleRad: angleSecondsRad
        },
        minuteHand: {
          angleDeg: angleMinutesDeg,
          angleRad: angleMinutesRad
        },
        hourHand: {
          angleDeg: angleHoursDeg,
          angleRad: angleHoursRad
        }
      } as State;

      return state;
    }

    const state = ref(calculateState() as State);

    function updateLoop(timestamp: number) {
      window.requestAnimationFrame(updateLoop);

      // Do not bother to recalculate, except every 20 ms.
      if (timestamp - lastHandledTimestamp < 20) {
        return;
      }

      state.value = calculateState();

      lastHandledTimestamp = timestamp;
    }

    const init = () => {
      console.group("Initalizing Clock Angle component");

      window.requestAnimationFrame(updateLoop);

      console.log("Component up and running");
      console.groupEnd();
    };

    return {
      faceWithNumbers,
      showingAngles,
      showingDigitalClock,
      twentyFourHours,
      smoothSecondHand,
      smoothMinuteHand,
      smoothHourHand,
      showSecondHand,
      showHands,

      angleSeconds,
      angleMinutes,
      angleHours,

      settings,

      state,
    };
  }

});
</script>

<style scoped>

.settings, .current-state {
  /*max-width: 50rem;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 0.8rem;
}


.settings > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.math {
  font-family: Courier, monospace;
  white-space: pre;
}

.color-angle-seconds {
  color: #a00;
}

.color-angle-minutes {
  color: #0a0;
}

.color-angle-hours {
  color: #00a;
}


</style>
