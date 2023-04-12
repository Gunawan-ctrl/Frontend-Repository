<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-indigo-10">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2">
          <q-avatar class="q-mr-md">
            <img src="icons/repo-ico.png" />
          </q-avatar>
          REPOSITORY APP
        </q-toolbar-title>

        <q-btn
          class="text-capitalize text-subtitle2"
          stretch
          flat
          :to="{ name: 'home' }"
          label="Home"
        />
        <q-btn-dropdown
          class="text-capitalize text-subtitle2"
          stretch
          flat
          label="Repository"
        >
          <q-list>
            <q-item clickable v-close-popup :to="{ name: 'allRepository' }">
              <q-item-section side class="text-indigo-10">
                <q-icon name="apps" />
              </q-item-section>
              <q-item-section>
                <q-item-label>All Repository</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'addRepository' }">
              <q-item-section side class="text-indigo-10">
                <q-icon name="add_circle_outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Add Repository</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          class="text-capitalize text-subtitle2"
          stretch
          flat
          label="Categories"
        >
          <q-list>
            <q-item clickable v-close-popup :to="{ name: 'allCategories' }">
              <q-item-section side class="text-indigo-10">
                <q-icon name="apps" />
              </q-item-section>
              <q-item-section>
                <q-item-label>All Categories</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'addCategories' }">
              <q-item-section side class="text-indigo-10">
                <q-icon name="add_circle_outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Add Categories</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          class="text-capitalize text-subtitle2"
          stretch
          flat
          label="Sign Out"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      confirm: false,
      dataUser: this.$q.localStorage.getItem("dataUser"),
    };
  },
  methods: {
    logout() {
      this.$q.localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
