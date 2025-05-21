<template>
    <div class="relative">
        <div class="flex items-center">
            <div class="relative flex-grow">
                <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                    <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    v-model="searchQuery"
                    type="text"
                    class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                    placeholder="Search leaders..."
                    @input="debounceSearch"
                    @keyup.enter="search"
                    @keyup.esc="clear"
                />
                <button
                    v-if="searchQuery"
                    @click="clear"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    <svg
                        class="h-5 w-5 text-gray-400 hover:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <button
                @click="search"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Search
            </button>
        </div>

        <!-- Search suggestions (optional) -->
        <div
            v-if="showSuggestions && suggestions.length > 0"
            class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden"
        >
            <ul class="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                <li
                    v-for="suggestion in suggestions"
                    :key="suggestion.id"
                    @click="selectSuggestion(suggestion)"
                    class="px-4 py-2 cursor-pointer hover:bg-blue-50 flex items-center"
                >
                    <div class="flex-shrink-0 h-8 w-8">
                        <img
                            class="h-8 w-8 rounded-full object-cover"
                            :src="suggestion.photo"
                            :alt="suggestion.name"
                        />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">
                            {{ suggestion.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ suggestion.party }} · {{ suggestion.level }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        suggestions: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["search", "clear"],
    data() {
        return {
            searchQuery: "",
            showSuggestions: false,
            debounceTimeout: null,
        };
    },
    watch: {
        searchQuery(newVal) {
            this.showSuggestions = newVal.length > 0;
        },
    },
    methods: {
        debounceSearch() {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.$emit("search", this.searchQuery);
            }, 300);
        },
        search() {
            this.$emit("search", this.searchQuery);
            this.showSuggestions = false;
        },
        clear() {
            this.searchQuery = "";
            this.$emit("clear");
        },
        selectSuggestion(suggestion) {
            this.searchQuery = suggestion.name;
            this.$emit("search", this.searchQuery);
            this.showSuggestions = false;
        },
    },
};
</script>
