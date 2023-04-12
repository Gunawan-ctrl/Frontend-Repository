<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="dashboard" />
        <q-breadcrumbs-el label="Categories" icon="apps" />
        <q-breadcrumbs-el
          class="text-grey-7"
          label="All Categories"
          icon="apps"
        />
      </q-breadcrumbs>
    </q-card>
    <div class="row q-ma-md">
      <div class="col-xs-12">
        <q-card>
          <q-table
            title="Data repositori"
            :rows="rows"
            class="text-grey-8"
            :columns="columns"
            row-key="name"
            :pagination="pagination"
            :filter="filter"
          >
            <template v-slot:top>
              <div class="col">
                <div class="col-2 q-table__title">Categories Data</div>
                <p class="text-caption">
                  All data active categories record system
                </p>
              </div>

              <q-space />

              <q-btn
                @click="exportTable()"
                flat
                icon-right="document_scanner"
                text-color="indigo-10"
              >
                <q-tooltip> Export Data </q-tooltip>
              </q-btn>

              <q-btn
                flat
                color="indigo-10"
                icon="search"
                @click="visibles = !visibles"
                size="md"
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visibles">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 300px"
                    color="primary"
                    v-model="filter"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="CATEGORIES_CODE" :props="props">
                  <q-badge color="primary">
                    CTR{{ props.row.CATEGORIES_CODE }}
                  </q-badge>
                </q-td>
                <q-td key="TITLE" :props="props">{{ props.row.TITLE }}</q-td>
                <q-td key="DESC" :props="props">{{ props.row.DESC }}</q-td>
                <q-td key="CREATED_AT" :props="props">
                  {{ props.row.CREATED_AT }}
                </q-td>
                <q-td key="action" :props="props">
                  <q-btn
                    round
                    flat
                    color="indigo-10"
                    @click="this.editData(props.row)"
                    size="sm"
                    icon="edit"
                    no-caps
                    class="q-ml-sm"
                  />
                  <q-btn
                    round
                    flat
                    @click="this.delete(props.row.GUID)"
                    color="indigo-10"
                    size="sm"
                    icon="delete"
                    no-caps
                    class="q-ml-sm"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>

        <q-dialog v-model="categories">
          <q-card
            class="my-card"
            flat
            bordered
            style="width: 600px; max-width: 60vw"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="school" size="40px" color="indigo-10" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Categories Data</q-item-label>
                <q-item-label caption> Edit data categories </q-item-label>
              </q-item-section>

              <q-item-section class="col-1">
                <q-btn
                  flat
                  dense
                  icon="close"
                  class="float-right"
                  color="grey-8"
                  v-close-popup
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-form @submit="onSubmit">
              <q-card-section horizontal>
                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    outlined
                    v-model="form.CATEGORIES_CODE"
                    label="Categories Code"
                    readonly
                  />
                  <q-input
                    dense
                    outlined
                    type="textarea"
                    v-model="form.DESC"
                    label="Description"
                  />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input dense outlined v-model="form.TITLE" label="Title" />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat color="indigo-10" type="submit"> Update </q-btn>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import exportFile from "quasar/src/utils/export-file.js";

const model = () => {
  return {
    CATEGORIES_CODE: null,
    TITLE: null,
    DESC: null,
  };
};

const columns = [
  {
    name: "CATEGORIES_CODE",
    align: "left",
    label: "Categories Code",
    field: "CATEGORIES_CODE",
  },
  {
    name: "TITLE",
    align: "left",
    label: "Title",
    field: "TITLE",
  },
  {
    name: "DESC",
    align: "left",
    label: "Desc",
    field: "DESC",
  },
  {
    name: "CREATED_AT",
    align: "left",
    label: "Created",
    field: "CREATED_AT",
  },
  {
    name: "action",
    required: true,
    align: "left",
    label: "",
    field: "action",
  },
];

const rows = [
  {
    CATEGORIES_CODE: "Repository Code",
    TITLE: "Title",
    DESC: "Submitted",
    CREATED_AT: "10 Juli",
  },
  {
    CATEGORIES_CODE: "Categories Code",
    TITLE: "Gunawan",
    DESC: "Unpublished",
    CREATED_AT: "11 Juli",
  },
];

export default {
  name: "AllCategories",
  components: {},
  data() {
    return {
      columns,
      rows,
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 8,
      },
      filter: "",
      visibles: false,
      categories: false,
      form: model(),
      GUID: null,
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    onSubmit() {},
    getCategories: async function () {},
    exportTable() {
      const content = ["Categories Code; Title; Deskripsi; Created"]
        .concat(
          rows.map((row) => {
            return `${row.CATEGORIES_CODE};${row.TITLE};${row.DESC};${row.CREATED_AT}`;
          })
        )
        .join("\r\n");

      const status = exportFile(
        "all-categories-system.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
