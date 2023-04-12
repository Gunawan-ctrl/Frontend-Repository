<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="dashboard" />
        <q-breadcrumbs-el label="Repository" icon="apps" />
        <q-breadcrumbs-el
          class="text-grey-7"
          label="Add Repository"
          icon="add_circle_outline"
        />
      </q-breadcrumbs>
    </q-card>
    <div class="row q-col-gutter-md q-px-md">
      <div class="col-12 col-md-9">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  color="indigo-10"
                  text-color="white"
                  icon="add_circle_outline"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Add Repository Data</q-item-label>
                <q-item-label caption>
                  This is the form used to enter repository data
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal class="q-mt-md q-mb-md">
              <q-card-section class="col-md-6 q-gutter-lg">
                <q-input
                  color="orange"
                  filled
                  dense
                  readonly
                  v-model="REPOSITORY_CODE"
                  label="Repository Code"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="qr_code" />
                  </template>
                </q-input>

                <q-select
                  color="orange"
                  filled
                  dense
                  v-model="SUBJECT"
                  :options="options.subjectoptions"
                  option-label="SUBJECT"
                  key="SUBJECT"
                  label="Subject"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="subject" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.SUBJECT }}</q-item-label>
                        <q-item-label caption>{{
                          scope.opt.STUDY_PROGRAM
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  color="orange"
                  dense
                  filled
                  type="number"
                  v-model="SEMESTER"
                  label="Semester"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="pin" />
                  </template>
                </q-input>

                <q-input
                  color="orange"
                  dense
                  filled
                  type="textarea"
                  v-model="DESC"
                  label="Description"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="subject" />
                  </template>
                </q-input>
              </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-md-6 q-gutter-lg">
                <q-select
                  color="orange"
                  filled
                  dense
                  v-model="CATEGORIES"
                  :options="options.categoriesoptions"
                  label="Categories"
                  option-label="TITLE"
                  key="TITLE"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="subject" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.TITLE }}</q-item-label>
                        <q-item-label caption>{{
                          scope.opt.DESC
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-select
                  color="orange"
                  filled
                  dense
                  v-model="AUTHOR"
                  :options="options.authoroptions"
                  option-label="AUTHOR"
                  key="AUTHOR"
                  label="Author"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="school" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.AUTHOR }}</q-item-label>
                        <q-item-label caption>{{
                          scope.opt.PHONE
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  color="orange"
                  dense
                  filled
                  v-model="URL"
                  label="App Url"
                >
                  <template v-slot:before>
                    <q-icon class="q-mr-md" name="link" />
                  </template>
                </q-input>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions class="q-ma-sm">
              <q-btn
                outline
                color="primary"
                type="submit"
                icon-right="done_all"
                label="Submit Data"
              />
              <q-btn
                outline
                color="warning"
                type="reset"
                icon-right="restart_alt"
                label="Reset Data"
              />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>

      <div class="col-xs-12 col-md-3">
        <div class="col-xs-12 col-md-3">
          <q-card>
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                expand-separator
                icon="info"
                label="Information"
                class="text-grey-8"
                header-class="text-indigo-10"
                default-opened
              >
                <q-card>
                  <q-card-section>
                    Sistem repositori digunakan untuk menyimpan informasi
                    aplikasi yang digunakan pada matakuliah berpraktikum, saran
                    yang diberikan untuk sistem dengan size yang besar dapat di
                    unggah terlebih dahulu ke dalam google drive atau
                    penyimpanan online lainnya, lalu salin link untuk dapat di
                    unduh dan masukan ke dalam form URL.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
var rand = Math.floor(Math.random() * 10000);

const model = () => {
  return {
    REPOSITORY_CODE: rand,
    CATEGORIES: null,
    SUBJECT: null,
    AUTHOR: null,
    SEMESTER: null,
    URL: null,
    DESC: null,
  };
};

export default {
  name: "AddRepository",
  components: {},
  data() {
    return {
      form: model(),
      REPOSITORY_CODE: null,
      SUBJECT: null,
      SEMESTER: null,
      DESC: null,
      CATEGORIES: null,
      AUTHOR: null,
      URL: null,
      options: {
        categoriesoptions: [],
        subjectoptions: [],
        authoroptions: [],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onSubmit() {},
    getList() {},
    onReset() {
      this.CATEGORIES = null;
      this.SEMESTER = null;
      this.SUBJECT = null;
      this.AUTHOR = null;
      this.DESC = null;
    },
  },
};
</script>
