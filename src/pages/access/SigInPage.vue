<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card style="width: 75%">
          <div class="row q-col-gutter-md">
            <div
              class="col-md-6"
              v-if="$q.screen.lg || $q.screen.xl || $q.screen.md"
            >
              <q-carousel
                animated
                v-model="slide"
                infinite
                height="100%"
                :autoplay="autoplay"
                class="rounded-borders"
                transition-prev="slide-right"
                transition-next="slide-left"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
              >
                <q-carousel-slide :name="1" img-src="icons/banner_1.jpg" />
                <q-carousel-slide :name="2" img-src="icons/banner_2.jpg" />
                <q-carousel-slide :name="3" img-src="icons/banner_3.jpg" />
                <q-carousel-slide :name="4" img-src="icons/banner_4.jpg" />
              </q-carousel>
            </div>
            <div class="row col-xs-12 col-md-6 justify-center">
              <div class="text-center q-mt-lg q-mb-lg">
                <div class="text-h6 q-mt-sm text-indigo-10 text-weight-bold">
                  REPOSITORY APP
                </div>
                <div class="text-caption text-grey-7">
                  Practical course application storage system
                </div>
                <div
                  class="text-subtitle2 q-mt-lg text-left"
                  style="font-size: 20px"
                >
                  Sign In
                </div>
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md q-mt-md"
                >
                  <q-input
                    dense
                    v-model="form.userName"
                    label="Email"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Lengkapin data email nya',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon size="20px" name="alternate_email" />
                    </template>
                  </q-input>

                  <q-input
                    dense
                    label="Password"
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Lengkapin data password nya',
                    ]"
                    counter
                  >
                    <template v-slot:prepend>
                      <q-icon size="20px" name="gpp_good" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <div class="text-subtitle2 q-mt-lg" align="right">
                    <q-btn
                      flat
                      unelevated
                      class="q-mr-md"
                      label="Reset"
                      type="reset"
                      color="grey"
                    />
                    <q-btn
                      label="Sign In"
                      type="submit"
                      color="indigo-10"
                      style="width: 150px"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      autoplay: true,
      form: {
        userName: "admin",
        password: 123,
        EMAIL: null,
        // password: null,
        role: null,
      },
      isPwd: true,
      visible: false,
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("users/login", {
          // EMAIL: this.EMAIL,
          userName: this.form.userName,
          password: this.form.password,
          role: this.form.role,
        })
        .then((res) => {
          if (res.data.status) {
            this.$q.localStorage.set("dataUser", res.data.data);
            this.$router.push({ name: "home" });
            this.$q.notify({
              type: "positive",
              message: res.data.msg,
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: res.data.msg,
            });
          }
        });
    },
    onReset() {
      // this.form.EMAIL = null;
      this.form.userName = null;
      this.form.password = null;
    },
  },
};
</script>
