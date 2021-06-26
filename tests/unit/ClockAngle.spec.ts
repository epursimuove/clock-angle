import { mount } from "@vue/test-utils";
import ClockAngle from "@/components/ClockAngle.vue";

describe("ClockAngle.vue", () => {

    it("renders correctly", () => {
        const wrapper = mount(ClockAngle);

        expect(wrapper.html()).toContain("Face with numbers");
        expect(wrapper.html()).toContain("Showing angles");
        expect(wrapper.html()).toContain("Showing digital clock");
        expect(wrapper.html()).toContain("canvas");
    });
});