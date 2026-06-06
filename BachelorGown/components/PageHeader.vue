<template>
  <div>
    <header class="header-wrapper">
      <section>
        <nuxt-link
          v-if="$route.path !== '/'"
          to="/"
          class="header-back"
          aria-label="返回"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </nuxt-link>
        <nuxt-link
          :to="{path: `/`}"
          style="text-decoration: none;"
        >
          <h1 class="header-title">文華高中 制服日</h1>
        </nuxt-link>
      </section>
    </header>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
  .header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 54px;
    z-index: 1020;
    background-color: var(--header-bg);
    box-shadow: 0 1px 6px 0 var(--header-shadow);
    transition: background-color 0.25s, box-shadow 0.25s;
  }

  .header-wrapper section {
    position: relative;
    max-width: 1080px;
    margin: auto;
    text-align: center;
  }

  .header-back {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: var(--header-link);
    text-decoration: none;
    padding: 0 12px;
  }

  .header-back:hover {
    opacity: 0.6;
  }

  .header-title {
    display: block;
    font-weight: lighter;
    font-size: 30px;
    line-height: 54px;
    color: var(--header-title);
  }

</style>
