<template>
  <div class="contact-list">
    <ul class="list-group">
      <li
        v-for="contact in contactList"
        v-bind:key="contact.id"
        class="list-group-item"
        v-bind:class="{'active' : contact.id === selectedId }"
      >
        <a @click="select(contact)">
          <h4>{{contact.firstName}} {{contact.lastName}}</h4>
          <p>{{contact.email}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedId: null,
      contact: null
    };
  },
  props: {
    contactList: {
      type: Array
    }
  },
  methods: {
    select(contact) {
      this.selectedId = contact.id;
      this.$emit("changedSelectedContact", contact);
      return true;
    }
  }
};
</script>