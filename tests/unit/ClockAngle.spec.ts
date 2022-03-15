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

    // describe("Calculate state", () => {
    //
    //     beforeAll(() => {
    //         jest.useFakeTimers("modern");
    //         jest.setSystemTime(new Date(2021, 11, 24, 15, 20, 45));
    //     });
    //
    //     afterAll(() => {
    //         jest.useRealTimers();
    //     });
    //
    //     it("calculates state correctly", () => {
    //
    //         const wrapper = mount(ClockAngle);
    //
    //
    //         expect(wrapper.vm.state.secondHand.angleDeg).toBe(false);
    //
    //
    //     });
    // });
});