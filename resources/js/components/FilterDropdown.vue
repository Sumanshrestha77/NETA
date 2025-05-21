<template>
    <div class="relative">
        <button
            @click="toggleDropdown"
            class="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <span>{{
                selectedOption ? selectedOption.label : "Filter by Level"
            }}</span>
            <svg
                class="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                :class="{ 'transform rotate-180': isOpen }"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        <!-- Dropdown menu -->
        <div
            v-if="isOpen"
            class="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            v-click-outside="closeDropdown"
        >
            <div class="py-1">
                <button
                    @click="selectOption(null)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    :class="{ 'bg-blue-50 text-blue-600': !selectedOption }"
                >
                    All Levels
                </button>
                <button
                    v-for="option in options"
                    :key="option.value"
                    @click="selectOption(option)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    :class="{
                        'bg-blue-50 text-blue-600':
                            selectedOption &&
                            selectedOption.value === option.value,
                    }"
                >
                    {{ option.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterDropdown",
    props: {
        modelValue: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default: () => [
                { label: "Federal", value: "federal" },
                { label: "Province", value: "province" },
                { label: "Local", value: "local" },
            ],
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        selectedOption() {
            if (!this.modelValue) return null;
            return this.options.find(
                (option) => option.value === this.modelValue
            );
        },
    },
    directives: {
        clickOutside: {
            mounted(el, binding) {
                el.clickOutsideEvent = function (event) {
                    if (!(el === event.target || el.contains(event.target))) {
                        binding.value(event);
                    }
                };
                document.addEventListener("click", el.clickOutsideEvent);
            },
            unmounted(el) {
                document.removeEventListener("click", el.clickOutsideEvent);
            },
        },
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown() {
            this.isOpen = false;
        },
        selectOption(option) {
            this.$emit("update:modelValue", option ? option.value : null);
            this.closeDropdown();
        },
    },
};
</script>
