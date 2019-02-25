<i18n>
{
  "en": {
    "login": "Log in",
    "profile": "Profile",
    "quit": "Logout",
    "register": "Sign in",
    "resetpass": "Reset passwd"
  },
  "ru": {
    "login": "Войти",
    "profile": "Профиль",
    "quit": "Выход",
    "register": "Регистрация",
    "resetpass": "Сбос пароля"
  }
}
</i18n>

<template>
<div class="page-navbar">
  <component
    :is="logoLinkTagName"
    class="logo"
    :to="logoLink && isRouter(logoLink.router) ? logoLink.url : null"
    :href="logoLink ? logoLink.url : null"
  >
    <span class="logo-icon">
      <slot name="logo" />
    </span>
    <span class="logo-title">
      {{ title }}
      <slot name="title" />
    </span>
  </component>

  <div class="navgition-links">
    <component
      v-for="(link, index) in navigationLinks"
      :is="isRouter(link.router) ? routerComponentName : 'a'"
      :key="index"
      :class="['navgition-link', { '_active': link.isActive }]"
      :to="isRouter(link.router) ? link.url : null"
      :href="link.url"
    >
      <span class="navgition-link-icon" />
      <span v-text="link.label" />
    </component>
  </div>

  <div class="bottom">
    <slot name="bottom" />

    <div class="user">
      <div 
        class="user-logo"
        :title="isAuthorised ? userName : null"
      >
        <IconAuth />
      </div>
      <div
        v-if="isAuthorised"
        class="user-name"
      >
        <span>{{ userName }}</span>
      </div>
      <div class="user-menu">
        <template v-if="!isAuthorised">
          <span
            class="user-menu-item"
            @click="$emit('login')"
          >
            {{ $t('login') }}
          </span>
          <span
            class="user-menu-item"
            @click="$emit('register')"
          >
            {{ $t('register') }}
          </span>
        </template>
        <template
          v-else
        >
          <span
            class="user-menu-item"
            @click="$emit('open-profile')"
          >
            {{ $t('profile') }}
          </span>
          <span
            class="user-menu-item"
            @click="$emit('logout')"
          >
            {{ $t('quit') }}
          </span>
        </template>
      </div>
    </div>
  </div>
  <slot />
</div>
</template>

<script>
import { has } from 'lodash-es';
import IconAuth from './IconAuth.vue';

export default {
  components: {
    IconAuth,
  },
  props: {
    /**
     * Main logo link
     *
     * @type {{url: string, router?: boolean}}
     */
    logoLink: {
      type: Object,
      validator(value) {
        return has(value, 'url');
      },
    },
    title: {
      type: String,
    },
    /**
     * Links for routing
     *
     * @typedef {{label: string, url: string, isActive: boolean, router?: boolean}} Link
     * @type {Link[]}
     */
    navigationLinks: {
      default: () => [],
      type: Array,
    },
    /** User has auth */
    isAuthorised: {
      default: false,
      type: Boolean,
    },
    /** Authed user name */
    userName: {
      default: '',
      type: String,
    },
  },

  computed: {
    routerComponentName() {
      if (this.$options.components.NuxtLink) {
        return 'NuxtLink';
      }
      if (this.$options.components.RouterLink) {
        return 'RouterLink';
      }
      return '';
    },
    logoLinkTagName() {
      if (!this.logoLink) {
        return 'span';
      }

      if (this.logoLink && this.logoLink.router) {
        return this.routerComponentName;
      }

      return 'a';
    },
  },

  methods: {
    /**
     * Default value for router is true
     * @param {?Boolean} router
     * @return {Boolean}
     */
    isRouter(router) {
      return router === false ? false : true;
    },
  },
};
</script>

<style scoped lang="scss">
$navbar-color: #203d5f;
$hover-navbar-item-color: #2f6ecd;
$font-color: #6b85a2;
$hover-font-color: #fff;

.page-navbar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  background-color: $navbar-color;
  transition: width 0.2s ease-out 0.1s;
  color: $font-color;
  z-index: 10;

  &:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: background-color 0.2s ease-out 0.1s;
    z-index: -1;
  }

  &:after {
    content: '';
    pointer-events: none;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: opacity 0.3s ease-out;
    box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
  }

  &:hover {
    width: 224px;

    &:before {
      background-color: rgba($navbar-color, 0.4);
    }

    &:after {
      opacity: 1;
    }
  }
}

.logo {
  height: 80px;
  color: $hover-font-color;
  font-size: 24px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  overflow: hidden;
}

.logo-icon {
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-title {
  flex-shrink: 0;
}

.navgition-links {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.navgition-link {
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: $font-color;

  &:hover {
    color: $hover-font-color;
    background-color: rgba($navbar-color, 0.5);

    & > .navgition-link-icon {
      border-color: $hover-font-color;
    }
  }

  &._active,
  &._active:hover {
    color: $hover-font-color;
    background-color: $hover-navbar-item-color;

    & > .navgition-link-icon {
      background-color: $hover-font-color;
      border-color: $hover-font-color;
    }
  }
}
.navgition-link-icon {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0 30px 0 14px;
  border: 2px solid $font-color;
  flex-shrink: 0;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.user {
}
.user-logo {
  padding: 16px;
  cursor: pointer;
  max-width: 80px;
  width: 100%;
}

.user-menu {
  opacity: 0;
  transition: opacity 0.2s ease-out;
  position: absolute;
  width: 144px;
  bottom: 0;
  left: 80px;

  .user:hover & {
    opacity: 1;
  }
}

.user-name {
  position: absolute;
  width: 144px;
  height: 80px;
  bottom: 0;
  left: 80px;
  opacity: 1;
  transition: opacity 0.2s ease-out;
  display: flex;
  align-items: center;

  .user:hover & {
    opacity: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 100%;
  }
}

.user-menu-item {
  display: block;
  height: 40px;
  line-height: 40px;
  cursor: pointer;

  &:hover {
    color: $hover-font-color;
  }
}
</style>
