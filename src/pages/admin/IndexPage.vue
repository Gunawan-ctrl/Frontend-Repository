<template>
  <q-page>
    <q-card class="q-pa-md q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el class="text-blue-7" label="Home" icon="dashboard" />
      </q-breadcrumbs>
    </q-card>
    <div class="row q-px-md q-gutter-md">
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img style="height: 90px" src="icons/banner_4.jpg" />

          <q-card-section>
            <div class="text-caption text-grey">Repository</div>
            <div class="text-h4 text-weight-bold">
              {{ this.dataRepositories }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img style="height: 90px" src="icons/banner_2.jpg" />

          <q-card-section>
            <div class="text-caption text-grey">Categories</div>
            <div class="text-h4 text-weight-bold">
              {{ this.dataCategories }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img style="height: 90px" src="icons/banner_1.jpg" />

          <q-card-section>
            <div class="text-caption text-grey">Subjects</div>
            <div class="text-h4 text-weight-bold">{{ this.dataSubject }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card flat class="bg-teal-1">
          <q-img style="height: 90px" src="icons/banner_3.jpg" />

          <q-card-section>
            <div class="text-caption text-grey">Authors</div>
            <div class="text-h4 text-weight-bold">{{ this.dataAuthor }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
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
                <div class="col-2 q-table__title">Repository system</div>
                <p class="text-caption">
                  Practical course application storage system
                </p>
              </div>

              <q-space />

              <q-btn
                flat
                unelevated
                icon-right="document_scanner"
                @click="exportTable()"
                text-color="indigo-10"
              >
                <q-tooltip>Export Data</q-tooltip>
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
                <q-td key="REPOSITORY_CODE" :props="props">
                  <q-badge color="primary">
                    RPS{{ props.row.REPOSITORY_CODE }}
                  </q-badge>
                </q-td>
                <q-td key="TITLE" :props="props">
                  {{ props.row.TITLE }}
                </q-td>
                <q-td key="SUBJECT" :props="props">
                  {{ props.row.SUBJECT }}
                </q-td>
                <q-td key="AUTHOR" :props="props">
                  {{ props.row.AUTHOR }}
                </q-td>
                <q-td key="SEMESTER" :props="props">
                  {{ props.row.SEMESTER }}
                </q-td>
                <q-td key="URL" :props="props">
                  <a
                    target="_blank"
                    :href="props.row.URL"
                    style="text-decoration: none"
                  >
                    {{ props.row.URL }}
                  </a>
                  <q-tooltip>{{ props.row.DESC }}</q-tooltip>
                </q-td>
                <q-td key="CREATED_AT" :props="props">
                  {{ props.row.CREATED_AT }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import exportFile from "quasar/src/utils/export-file.js";

const columns = [
  {
    name: "REPOSITORY_CODE",
    align: "left",
    label: "Repository Code",
    field: "REPOSITORY_CODE",
  },
  { name: "TITLE", align: "left", label: "Categories", field: "TITLE" },
  {
    name: "SUBJECT",
    align: "left",
    label: "Subject",
    field: "SUBJECT",
  },
  { name: "AUTHOR", align: "left", label: "Author", field: "AUTHOR" },
  {
    name: "SEMESTER",
    align: "left",
    label: "Semester",
    field: "SEMESTER",
  },
  { name: "URL", align: "left", label: "URL", field: "URL" },
  {
    name: "CREATED_AT",
    align: "left",
    label: "Created",
    field: "CREATED_AT",
  },
  { name: "action", align: "left", label: "", field: "action" },
];

const rows = [
  {
    REPOSITORY_CODE: "Repository Code",
    TITLE: "Title",
    SUBJECT: "Submitted",
    AUTHOR: "Author",
    SEMESTER: "Semester",
    URL: "URL",
    CREATED_AT: "10 Juli",
  },
  {
    REPOSITORY_CODE: "unknown",
    TITLE: "Identifier",
    SUBJECT: "django",
    AUTHOR: "Gunawan",
    SEMESTER: "intern",
    URL: "URL",
    CREATED_AT: "11 Juli",
  },
];

export default {
  name: "IndexPage",
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
      dataAuthor: [],
      dataSubject: [],
      dataCategories: [],
      dataRepositories: [],
      listCategories: [],
      listSubject: [],
      listAuthor: [],
      listReporitories: [],
    };
  },
  methods: {
    exportTable() {
      const content = [
        "Repository Code; Categories; Subject; Author; Semester; URL; Created",
      ]
        .concat(
          rows.map((row) => {
            return `${row.REPOSITORY_CODE};${row.TITLE};${row.SUBJECT};${row.AUTHOR};${row.SEMESTER};${row.URL};${row.CREATED_AT}`;
          })
        )
        .join("\r\n");

      const status = exportFile("repository-system.csv", content, "text/csv");

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
