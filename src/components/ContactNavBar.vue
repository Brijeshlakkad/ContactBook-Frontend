<template>
  <nav class="navbar navbar-light bg-light">
    <button class="btn btn-primary" @click="$parent.createDefaultContact()">
      <span>Add Contact</span>
    </button>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <form class="form-inline" @submit.prevent="searchContact(contactName)">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search Contact"
              v-model="contactName"
              @input="searchContact(contactName)"
            />
          </div>
        </form>
      </li>
    </ul>
  </nav>
</template>
<script>
import ContactService from "../services/contact.service";
export default {
  data() {
    return {
      contactName: null,
      suggestedContactList: null,
      mutex: false
    };
  },
  contactService: null,
  created() {
    this.contactService = new ContactService();
  },
  methods: {
    async searchContact(contactName) {
      if (contactName != null && contactName != "" && !this.mutex) {
        this.suggestedContactList = await this.contactService.searchContact(
          this.$parent.user.id,
          contactName
        );
        this.mutex = false;
        this.$emit("getSuggestedContactList", this.suggestedContactList);
      } else {
        this.$emit("getSuggestedContactList", null);
      }
    }
  }
};
</script>
