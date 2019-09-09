<template>
  <div >
    <h3>Matched results:</h3>
    <div class="contact-list">
      <div v-if="suggestedContactList.length==0">Not Found :(</div>
      <ul class="list-group" v-if="suggestedContactList.length>0">
        <li class="list-group-item" v-for="contact in suggestedContactList" :key="contact.id">
          <a @click="select(contact)" href="#" class="btn btn-link">
            <h4>{{contact.firstName}} {{contact.lastName}}</h4>
            <p>{{contact.email}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    suggestedContactList: {
      type: Array
    }
  },
  methods: {
    select(contact) {
      // this.selectedId = contact.id;
      this.$emit("changedSelectedContact", contact);
      return true;
    }
  }
};
</script>