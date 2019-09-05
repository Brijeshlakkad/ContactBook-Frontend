<template>
  <div>
    <NavBar></NavBar>
    <div>
      <div class="container pb-5">
        <ContactNavBar />
      </div>
      <div class="container-fluid">
        <div class="row">
          <contact-list
            ref="contactListComponent"
            class="col-12 col-lg-5"
            :user="user"
            v-on:changedSelectedContact="changeSelectedContactFunc"
          ></contact-list>
          <keep-alive>
            <contact-detail
              :contact="contact"
              :addContactFlag="addContact"
              :user="user"
              v-on:refreshContactList="refreshContactList"
              class="col-12 col-lg-7"
            ></contact-detail>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactList from "@/components/ContactList.vue";
import ContactDetail from "@/components/ContactDetail.vue";
import NavBar from "@/components/NavBar.vue";
import ContactNavBar from "@/components/ContactNavBar.vue";

export default {
  data() {
    return {
      user: null,
      contact: null,
      addContact: null
      // contactList: []
    };
  },
  components: {
    NavBar,
    ContactNavBar,
    "contact-list": ContactList,
    // "contact-list": () => import("@/components/ContactList.vue"),
    "contact-detail": ContactDetail
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.addContact = false;
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
    },
    refreshContactList() {
      console.log("calling getContactList");
      this.$refs.contactListComponent.changePageSteps();
    }
  }
};
</script>

<style>
.no-contact-selection {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}

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

.fill-padding {
  border: 1px solid #ddd;
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
li.list-group-item.active {
  background-color: #021e53c7 !important;
}
</style>