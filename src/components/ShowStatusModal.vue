<template>
  <div></div>
</template>
<script>
import bootbox from "bootbox";
import { setTimeout } from "timers";
export default {
  props: {
    modalData: {
      type: Object
    }
  },
  methods: {
    showDeleteActionStatus(callBackFun) {
      if (this.modalData != null) {
        let dialog = bootbox.dialog({
          message:
            '<p class="text-center mb-0"><i class="fa fa-spin fa-cog"></i>' +
            this.modalData.status +
            "</p>",
          closeButton: this.modalData.closeButton
        });
        setTimeout(() => {
          dialog.modal("hide");
          callBackFun();
        }, 2000);
      }
    }
  }
};
</script>