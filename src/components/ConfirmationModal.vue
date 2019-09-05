<template>
  <div></div>
</template>
<script>
import bootbox from "bootbox";
export default {
  data() {
    return {
      modalData: null
    };
  },
  methods: {
    async deleteConfirmation(modalData) {
      this.modalData = modalData;
      if (this.modalData != null) {
        bootbox.confirm({
          title: this.modalData.header,
          message: this.modalData.body,
          buttons: {
            cancel: {
              label:
                '<i class="fa fa-times"></i> ' + this.modalData.cancelAction
            },
            confirm: {
              label: '<i class="fa fa-check"></i> ' + this.modalData.takeAction
            }
          },
          callback: this.modalData.callBackFunc
        });
      }
    }
  }
};
</script>