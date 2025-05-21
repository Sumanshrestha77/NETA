<template>
    <div class="leader-catalog">
        <!-- Filter and search section -->
        <div class="mb-8 bg-gray-50 py-5 px-4 rounded-lg shadow-sm">
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
            >
                <!-- Left side: Filter dropdown -->
                <div class="w-full md:w-48">
                    <FilterDropdown
                        v-model="selectedLevel"
                        @update:modelValue="filterLeaders"
                    />
                </div>

                <!-- Right side: Search bar -->
                <div class="w-full md:w-auto md:flex-grow md:ml-4">
                    <SearchBar
                        :suggestions="searchSuggestions"
                        @search="handleSearch"
                        @clear="clearSearch"
                    />
                </div>
            </div>

            <!-- Results count and active filters -->
            <div
                class="mt-4 flex items-center justify-between text-sm text-gray-600"
            >
                <div>
                    Showing
                    <span class="font-medium">{{
                        filteredLeaders.length
                    }}</span>
                    leaders
                    <span v-if="selectedLevel">
                        in
                        <span class="font-medium">{{
                            getLevelLabel(selectedLevel)
                        }}</span>
                        level
                    </span>
                    <span v-if="searchQuery">
                        matching "<span class="font-medium">{{
                            searchQuery
                        }}</span
                        >"
                    </span>
                </div>

                <!-- Clear filters button -->
                <button
                    v-if="selectedLevel || searchQuery"
                    @click="clearFilters"
                    class="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    Clear filters
                </button>
            </div>
        </div>

        <!-- Leaders grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <transition-group
                name="leader-card"
                appear
                tag="div"
                class="contents"
            >
                <div
                    v-for="(leader, index) in paginatedLeaders"
                    :key="leader.id"
                    class="leader-card-container"
                    :style="{ animationDelay: `${index * 0.05}s` }"
                >
                    <LeaderCard
                        :leader="leader"
                        @like="handleLike"
                        @dislike="handleDislike"
                    />
                </div>
            </transition-group>
        </div>

        <!-- Empty state -->
        <div
            v-if="filteredLeaders.length === 0"
            class="flex flex-col items-center justify-center py-12 text-center"
        >
            <svg
                class="h-16 w-16 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
                No leaders found
            </h3>
            <p class="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
            </p>
            <button
                @click="clearFilters"
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
                Clear filters
            </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-10 flex justify-center">
            <nav
                class="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
            >
                <!-- Previous page -->
                <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{
                        'opacity-50 cursor-not-allowed': currentPage === 1,
                    }"
                >
                    <span class="sr-only">Previous</span>
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>

                <!-- Page numbers -->
                <template v-for="page in displayedPages" :key="page">
                    <button
                        v-if="page !== '...'"
                        @click="goToPage(page)"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                        :class="
                            currentPage === page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        "
                    >
                        {{ page }}
                    </button>
                    <span
                        v-else
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                        ...
                    </span>
                </template>

                <!-- Next page -->
                <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{
                        'opacity-50 cursor-not-allowed':
                            currentPage === totalPages,
                    }"
                >
                    <span class="sr-only">Next</span>
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    </div>
</template>

<script>
import FilterDropdown from "./FilterDropdown.vue";
import SearchBar from "./SearchBar.vue";
import LeaderCard from "./LeaderCard.vue";

export default {
    name: "LeaderCatalog",
    components: {
        FilterDropdown,
        SearchBar,
        LeaderCard,
    },
    props: {
        leaders: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedLevel: null,
            searchQuery: "",
            currentPage: 1,
            perPage: 8,
        };
    },
    computed: {
        filteredLeaders() {
            let result = [...this.leaders];

            // Filter by level
            if (this.selectedLevel) {
                result = result.filter(
                    (leader) =>
                        leader.level.toLowerCase() === this.selectedLevel
                );
            }

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(
                    (leader) =>
                        leader.name.toLowerCase().includes(query) ||
                        leader.party.toLowerCase().includes(query) ||
                        leader.position.toLowerCase().includes(query)
                );
            }

            return result;
        },
        totalPages() {
            return Math.ceil(this.filteredLeaders.length / this.perPage);
        },
        paginatedLeaders() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.filteredLeaders.slice(start, end);
        },
        displayedPages() {
            const totalShownPages = 5;
            const pages = [];

            if (this.totalPages <= totalShownPages) {
                // Show all pages if total is less than or equal to total shown pages
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Always include first page
                pages.push(1);

                // Calculate start and end of middle pages
                let startPage = Math.max(2, this.currentPage - 1);
                let endPage = Math.min(
                    this.totalPages - 1,
                    this.currentPage + 1
                );

                // Adjust if we're near the start
                if (this.currentPage <= 3) {
                    endPage = Math.min(
                        this.totalPages - 1,
                        totalShownPages - 1
                    );
                }

                // Adjust if we're near the end
                if (this.currentPage >= this.totalPages - 2) {
                    startPage = Math.max(
                        2,
                        this.totalPages - totalShownPages + 2
                    );
                }

                // Add ellipsis after first page if needed
                if (startPage > 2) {
                    pages.push("...");
                }

                // Add middle pages
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }

                // Add ellipsis before last page if needed
                if (endPage < this.totalPages - 1) {
                    pages.push("...");
                }

                // Always include last page
                pages.push(this.totalPages);
            }

            return pages;
        },
        searchSuggestions() {
            if (!this.searchQuery) return [];

            const query = this.searchQuery.toLowerCase();
            return this.leaders
                .filter(
                    (leader) =>
                        leader.name.toLowerCase().includes(query) ||
                        leader.party.toLowerCase().includes(query)
                )
                .slice(0, 5);
        },
    },
    methods: {
        filterLeaders() {
            this.currentPage = 1;
        },
        handleSearch(query) {
            this.searchQuery = query;
            this.currentPage = 1;
        },
        clearSearch() {
            this.searchQuery = "";
            this.currentPage = 1;
        },
        clearFilters() {
            this.selectedLevel = null;
            this.searchQuery = "";
            this.currentPage = 1;
        },
        handleLike(data) {
            this.$emit("like", data);
        },
        handleDislike(data) {
            this.$emit("dislike", data);
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.scrollToTop();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.scrollToTop();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.scrollToTop();
        },
        scrollToTop() {
            // Scroll to the top of the catalog with smooth animation
            window.scrollTo({
                top: this.$el.offsetTop - 100,
                behavior: "smooth",
            });
        },
        getLevelLabel(value) {
            const levelMap = {
                federal: "Federal",
                province: "Province",
                local: "Local",
            };
            return levelMap[value] || value;
        },
    },
};
</script>

<style scoped>
.leader-card-container {
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.leader-card-enter-active,
.leader-card-leave-active {
    transition: all 0.5s ease;
}

.leader-card-enter-from,
.leader-card-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.leader-card-move {
    transition: transform 0.5s ease;
}
</style>
