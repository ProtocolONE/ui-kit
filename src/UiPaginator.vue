<template>
<div class="ui-paginator">
  <div class="pages">
    <button
      v-if="pagesCount > 1"
      class="pages-item"
      type="button"
      :class="{'_inactive' : currentPage === 1}"
      @click.prevent="prevPage"
    >
      <span>
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1L2 4.95506L6 9"
            stroke="#2F6ECD"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>
    <button
      v-for="page in pagesList"
      :key="page"
      class="pages-item"
      type="button"
      :class="{'_active': currentPage === page}"
      @click.prevent="requestPageChange(page)"
    >
      <span>{{ page }}</span>
    </button>
    <button
      v-if="pagesCount > 1"
      class="pages-item"
      type="button"
      :class="{'_inactive' : currentPage === pagesCount}"
      @click.prevent="nextPage"
    >
      <span>
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9L5 5.04494L1 1"
            stroke="#2F6ECD"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'UiPaginator',

  props: {
    /**
     * Total items count from api response metadata
     */
    count: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      required: true,
    },
    offset: {
      type: [String, Number],
      required: true,
    },
  },

  computed: {
    pagesCount() {
      return Math.ceil(this.count / this.limit);
    },

    pagesList() {
      const pagesInViewport = 5;
      const allPages = Array.from(Array(this.pagesCount)).map((num, index) => index + 1);
      if (this.pagesCount <= pagesInViewport) {
        return allPages;
      }

      let pagesOffset = 2;
      if (this.currentPage === 1) {
        pagesOffset = 0;
      } else if (this.currentPage === 2) {
        pagesOffset = 1;
      } else if (this.currentPage + 1 === this.pagesCount) {
        pagesOffset = 3;
      } else if (this.currentPage === this.pagesCount) {
        pagesOffset = 4;
      }
      const firstViewportPageIndex = this.currentPageIndex - pagesOffset;

      const val = allPages.slice(firstViewportPageIndex, firstViewportPageIndex + pagesInViewport);

      return val;
    },

    currentPage() {
      return (this.offset + this.limit) / this.limit;
    },

    currentPageIndex() {
      return this.currentPage - 1;
    },
  },

  methods: {
    requestPageChange(page) {
      const newOffset = (page - 1) * this.limit;
      this.$emit('pageChanged', {
        offset: newOffset,
      });
    },

    prevPage() {
      if (this.currentPage === 1) {
        return;
      }
      this.requestPageChange(this.currentPage - 1);
    },

    nextPage() {
      if (this.currentPage === this.pagesCount) {
        return;
      }
      this.requestPageChange(this.currentPage + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-paginator {
  background: #f6f6f6;
  padding-right: 20px;
}

.pages {
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

.pages-item {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f6ecd;
  text-decoration: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: none;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 3px;
  }

  &:hover {
    span {
      background: #e9e9e9;
    }
  }

  &._active {
    color: #fff;

    span {
      background: #2f6ecd;
    }
  }

  &._inactive {
    color: #b1b1b1;
    cursor: default;

    span {
      background: transparent;
    }

    path {
      stroke: #b1b1b1;
    }
  }
}
</style>
