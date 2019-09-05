<template>
  <div></div>
</template>
<script>
import bootbox from "bootbox";
import { setTimeout } from "timers";
export default {
  // props: {
  //   modalData: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      modalData: null
    };
  },
  methods: {
    showDeleteActionStatus(modalData) {
      this.modalData = modalData;
      let classToAdd =
        this.modalData.statusCode == 1
          ? "alert alert-success"
          : "alert alert-danger";
      let message =
        '<p class="text-center mb-0' +
        classToAdd +
        '"><i class="fa fa-spin fa-cog"></i>' +
        this.modalData.status +
        "</p>";
      if (this.modalData != null) {
        let dialog = bootbox.dialog({
          message: message,
          closeButton: this.modalData.closeButton
        });
        setTimeout(async () => {
          await this.modalData.callBackFunc();
          dialog.modal("hide");
        }, this.modalData.timeOut);
      }
    }
  }
};
</script>