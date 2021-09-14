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
    First version created in June 2021. Implemented with the help of <a href="https://v3.vuejs.org">Vue</a> <var>{{ version }}</var> and <a href="https://www.typescriptlang.org">TypeScript</a> <var>{{ typescriptVersion }}</var>.
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

<script lang="ts">
import { defineComponent, version } from "vue";
import ClockAngle from "@/components/ClockAngle.vue";

export default defineComponent({
  name: "App",

  components: {
    ClockAngle,
  },

  setup() {
    console.group("Starting up application...");

    console.info("Vue version", version);

    const vueAppName = process.env.VUE_APP_NAME;
    const vueAppVersion = process.env.VUE_APP_VERSION;
    console.info("App", vueAppName, vueAppVersion);

    const typescriptVersion = process.env.VUE_APP_TYPESCRIPT_VERSION;
    console.info("TypeScript version", typescriptVersion);

    console.info("All engines started");
    console.groupEnd();

    return {
      version,
      vueAppVersion,
      typescriptVersion
    };
  }

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

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
