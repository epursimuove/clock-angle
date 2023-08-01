<script setup lang="ts">
import {version} from "vue";
import ClockAngle from "@/components/ClockAngle.vue";
import {name as appName, version as appVersion} from "../package.json";

console.group("Starting up application...");

console.info("Vue version", version);

// const vueAppName = "# TODO #"; //process.env.VUE_APP_NAME;
// const vueAppName = import.meta.env.VITE_VUE_APP_NAME;
const vueAppName = appName;
// const vueAppVersion = import.meta.env.VITE_VUE_APP_VERSION;
const vueAppVersion = appVersion;
console.info("App", vueAppName, vueAppVersion);

// const typescriptVersion = "# TODO #"; //process.env.VUE_APP_TYPESCRIPT_VERSION;
// const typescriptVersion = import.meta.env.VITE_TYPESCRIPT_VERSION;
const typescriptVersion = "5.1.6"; // TODO How to make this value dynamic from actual pnpm-lock.yaml file?
// console.info("TypeScript version", typescriptVersion);

console.info("All engines started");
console.groupEnd();
</script>

<template>

  <header>
    <div>
      <a href="./">
        <img src="/favicon-clock.svg" alt="Favicon for NNM Clock angle" width="32" height="32" />
      </a>
    </div>

    NNM Clock angle
    <small class="meta">{{ vueAppVersion }}</small>
  </header>

  <ClockAngle/>

  <h1>About</h1>

  <p>
    Animation of <em>clock angles</em> in an analog clock, using the <a href="https://anders.nemonisimors.com/currentTime.php">current Zulu time</a>. You can control the animation by the checkboxes at the top.
  </p>

  <p>
    This is an enhancement of the <a href="https://anders.nemonisimors.com/clockAngle.php">original clock angle</a>. Complete documentation and theory can be found on the original page.
  </p>

  <p>
    First version created in June 2021. Second version implemented in July 2023. Implemented with the help of <a href="https://vuejs.org">Vue</a> <var>{{ version }}</var> and <a href="https://www.typescriptlang.org">TypeScript</a><!-- <var>{{ typescriptVersion }}</var>-->.
  </p>

  <footer>
    <div>
      <em>NNM Clock angle</em> <small>{{ vueAppVersion }}</small>
    </div>
    <div>
      Code repository: <a href="https://github.com/epursimuove/clock-angle">https://github.com/epursimuove/clock-angle</a>
    </div>
    <div>
      Copyright &copy; 2021-&infin;
      <a href="https://anders.nemonisimors.com">Anders Gustafson</a>
    </div>
    <div>
      <a href="https://www.nemonisimors.com"><em>Nemo nisi mors</em></a>
    </div>
  </footer>

</template>

<style scoped>

body {
  margin: 0 1rem;
  /*background-color: black;*/
  /*color: white;*/
  max-width: 840px;
}

header {
  margin: 1rem 0;
  font-size: 2.0em;
  font-weight: bold;
}

h1 {
  margin-top: 2.5rem;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

code {
  font-family: Courier, monospace;
}

footer {
  margin: 2rem 0 1rem;
  font-size: 0.9em;
  color: hsl(100, 0%, 60%);
}

.meta {
  color: hsl(100, 0%, 60%);
}
</style>
