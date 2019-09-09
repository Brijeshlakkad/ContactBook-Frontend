<template>
  <div>
    <div class="no-contact-selection" v-if="contactListLength>2">Empty Contact List</div>
    <div>
      <div class="row justify-content-center">
        <div class="col-10 col-md-4">
          <form @submit.prevent="changePageSteps">
            <input type="text" class="form-control input-center" v-model="pageSteps" />
            <!-- @input="$v.pageSteps.$touch()" v-if="$v.pageSteps.$dirty && $v.pageSteps.$invalid" -->
            <div style="color:red;">
              <div
                v-if="!$v.pageSteps.isPageStepValid || !$v.pageSteps.required"
                class="invalid-feedback"
              >Invalid</div>
            </div>
          </form>
        </div>
      </div>
      <div class="contact-list">
        <div class="fill-padding">
          <ul class="list-group">
            <li
              v-for="contact in contactList"
              v-bind:key="contact.id"
              class="list-group-item"
              v-bind:class="{'active' : contact.id === selectedId }"
            >
              <a @click="select(contact)">
                <h4>{{contact.firstName}} {{contact.lastName}}</h4>
                <p class="text-justify">{{contact.email}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="contactPageDetails!=null">
      <ul class="pagination pagination-md">
        <li class="page-item" v-bind:class="{'disabled': !(selectedPage>1)}">
          <a class="page-link" href="#" @click="previousContactPage()">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="index in contactPageDetails.pageCount"
          :key="index"
          v-bind:class="{'active': selectedPage==index }"
        >
          <a class="page-link" href="#" @click="getSelectedPage(index)">{{index}}</a>
        </li>
        <li
          class="page-item"
          v-bind:class="{'disabled': ! (selectedPage < contactPageDetails.pageCount)}"
        >
          <a class="page-link" href="#" @click="nextContactPage()">Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ContactService from "../services/contact.service";
import { required } from "vuelidate/lib/validators";

function isPageStepValid(val) {
  let pattern = /^[0-9]*$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
export default {
  data() {
    return {
      selectedId: null,
      contact: null,
      pageLimit: 0,
      pageSkip: 0,
      pageSteps: 2,
      selectedPage: 0,
      contactList: [],
      contactPageDetails: null
    };
  },
  contactService: null,
  created() {
    this.contactService = new ContactService();
    this.getSelectedPage(1, false);
  },
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    contactListLength: function() {
      return this.contactList.length;
    }
  },
  validations: {
    pageSteps: { required, isPageStepValid }
  },
  methods: {
    select(contact) {
      this.selectedId = contact.id;
      this.$emit("changedSelectedContact", contact);
      return true;
    },
    getSelectedPage(pageNumber, changedPageSteps) {
      if (pageNumber != this.selectedPage || changedPageSteps) {
        this.selectedPage = pageNumber;
        this.pageSkip = (pageNumber - 1) * this.pageSteps;
        this.pageLimit = this.pageSteps;
        this.getContactList(this.pageSkip, this.pageLimit);
      }
    },
    getContactList: async function(pageSkip, pageLimit) {
      await this.getContactListPageDetails(this.pageSteps);
      this.contactList = await this.contactService.getContactList(
        this.user.id,
        pageLimit,
        pageSkip
      );
    },
    getContactListPageDetails: async function(pageSteps) {
      this.contactPageDetails = await this.contactService.getContactPageDetails(
        this.user.id,
        pageSteps
      );
      console.log(this.contactPageDetails);
    },
    changePageSteps() {
      console.log("Changing page steps...");
      this.$v.pageSteps.$touch();
      if (this.$v.pageSteps.$error) return;
      this.getSelectedPage(this.selectedPage, true);
    },
    previousContactPage() {
      if (this.selectedPage > 1)
        this.getSelectedPage(this.selectedPage - 1, false);
    },
    nextContactPage() {
      if (this.selectedPage < this.contactPageDetails.pageCount)
        this.getSelectedPage(this.selectedPage + 1, false);
    }
  }
};
</script>

<style scoped>
.input-center {
  text-align: center;
}
</style>