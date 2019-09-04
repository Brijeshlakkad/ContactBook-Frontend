<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <nav class="navbar navbar-light">
        <button class="btn btn-primary" @click="createDefaultContact()">
          <span>Add Contact</span>
        </button>
      </nav>
      <div class="row">
        <contact-list
          class="col-md-4"
          :contactList="contactList"
          v-on:changedSelectedContact="changeSelectedContactFunc"
        ></contact-list>
        <contact-detail
          :contact="contact"
          :addContactFlag="addContact"
          :user="user"
          class="col-md-8"
        ></contact-detail>
      </div>
    </div>
  </div>
</template>
<script>
import ContactService from "../services/contact.service";
import ContactList from "@/components/ContactList.vue";
import ContactDetail from "@/components/ContactDetail.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      user: null,
      contact: null,
      addContact: null,
      contactList: []
    };
  },
  components: {
    NavBar,
    "contact-list": ContactList,
    "contact-detail": ContactDetail
  },
  contactService: null,
  async created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.contactService = new ContactService();
    this.addContact = false;
    this.getContactList();
  },
  methods: {
    // setContact: function(contact) {
    //   this.contact = contact;
    //   this.$router.push({
    //     name: "contact-detail",
    //     params: {
    //       contact: contact
    //     }
    //   });
    // },
    getContactList: async function() {
      this.contactList = await this.contactService.getContactList(this.user.id);
    },
    changeSelectedContactFunc(contact) {
      this.addContact = false;
      this.contact = contact;
    },
    createDefaultContact() {
      this.addContact = true;
      this.contact = {
        firstName: null,
        lastName: null,
        company: null,
        email: null,
        phone: null
      };
    }
  }
};
</script>

<style>
.contact {
  padding: 10px;
  margin: 10px;
}

section {
  margin: 0 20px;
}

a:focus {
  outline: none;
}

.panel {
  margin: 20px;
}

.button-bar {
  right: 0;
  left: 0;
  bottom: 0;
  border-top: 1px solid #ddd;
  background: white;
}

.button-bar > button {
  float: right;
  margin: 20px;
}

.contact-list {
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

li.list-group-item {
  list-style: none;
}

li.list-group-item > a {
  text-decoration: none;
}

li.list-group-item.active > a {
  color: white;
}
li.list-group-item.active{
   background-color: #021e53c7 !important;
}
</style>