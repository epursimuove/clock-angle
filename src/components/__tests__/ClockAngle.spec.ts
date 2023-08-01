import { describe, it, expect } from 'vitest'

import {mount} from '@vue/test-utils'
import ClockAngle from "../ClockAngle.vue";

describe("ClockAngle", () => {
    it('renders properly', () => {
        const wrapper = mount(ClockAngle);

        // expect(wrapper.html()).toContain<string>("Face with numbers");
        // expect(wrapper.html()).toContain<string>("Showing angles");
        // expect(wrapper.html()).toContain<string>("Showing digital clock");
        // expect(wrapper.html()).toContain<string>("canvas");
    });
});