 <template>
  <div>
    <div
      class="no-contact-selection"
      v-if="contact==null && !addContactFlag"
    >Please Select a Contact</div>
    <div class="card" v-if="contact!=null || addContactFlag">
      <div class="card-header custom-focused-element">
        <h3>{{actionToTake}} Person Profile</h3>
      </div>
      <div class="card-body">
        <form role="form">
          <div class="form-group">
            <label class="col-sm-3 col-form-label">First Name</label>
            <div class="col-sm-9">
              <input
                type="text"
                placeholder="first name"
                class="form-control"
                v-model="contact.firstName"
                @blur="$v.contact.firstName.$touch()"
              />
              <div
                v-if="$v.contact.firstName.$dirty && $v.contact.firstName.$invalid"
                style="color:red;"
              >
                <div
                  v-if="!$v.contact.firstName.required"
                  class="invalid-feedback"
                >First Name is required</div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 col-form-label">Last Name</label>
            <div class="col-sm-9">
              <input
                type="text"
                placeholder="last name"
                class="form-control"
                v-model="contact.lastName"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 col-form-label">Company</label>
            <div class="col-sm-9">
              <input
                type="text"
                placeholder="company"
                class="form-control"
                v-model="contact.company"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 col-form-label">Email</label>
            <div class="col-sm-9">
              <input
                type="text"
                placeholder="email"
                class="form-control"
                v-model="contact.email"
                @blur="$v.contact.email.$touch()"
              />
              <div v-if="$v.contact.email.$dirty && $v.contact.email.$invalid" style="color:red;">
                <div v-if="!$v.contact.email.email" class="invalid-feedback">Email is invalid</div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-3 col-form-label">Phone Number</label>
            <div class="col-sm-9">
              <input
                type="text"
                placeholder="phone number"
                class="form-control"
                v-model="contact.phone"
                @blur="$v.contact.phone.$touch()"
              />
              <div v-if="$v.contact.phone.$dirty && $v.contact.phone.$invalid" style="color:red;">
                <div v-if="!$v.contact.phone.required" class="invalid-feedback">Phone is required</div>
                <div
                  v-if="$v.contact.phone.required && !$v.contact.phone.isValidPhone"
                  class="invalid-feedback"
                >Phone is invalid</div>
              </div>
            </div>
          </div>
        </form>
        <div class="d-flex flex-row justify-content-between">
          <div class="p-3">
            <button
              type="submit"
              class="btn btn-success"
              @click="addOrUpdate()"
              :disabled="$v.contact.$error || $v.contact.$invalid"
            >{{actionToTake}}</button>
          </div>
          <div v-if="!addContactFlag" class="p-3">
            <button class="btn btn-danger" @click="deleteConfirmation(deleteContact)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationModal ref="confirmationModal"></ConfirmationModal>
    <ShowStatusModal ref="showStatusModal"></ShowStatusModal>
  </div>
</template>
  
<script>
import ContactService from "../services/contact.service";
import { required, email } from "vuelidate/lib/validators";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import ShowStatusModal from "@/components/ShowStatusModal.vue";

function isValidPhone(val) {
  let pattern = /^[0-9]{10}$/;
  if (pattern.test(val)) {
    return true;
  }
  return false;
}
export default {
  data() {
    return {
      confirmationModal: {
        header: null,
        body: null,
        cancelAction: null,
        takeAction: null,
        callBackFunc: Function
      },
      showStatusModal: {
        status: String,
        closeButton: Boolean,
        timeOut: Number,
        statusCode: Number,
        callBackFunc: Function
      }
    };
  },
  contactService: null,
  props: {
    contact: {
      type: Object
    },
    addContactFlag: {
      type: Boolean
    },
    user: {
      type: Object
    }
  },
  components: {
    ConfirmationModal,
    ShowStatusModal
  },
  validations: {
    contact: {
      firstName: { required },
      email: { email },
      phone: { required, isValidPhone }
    }
  },
  computed: {
    actionToTake() {
      if (this.addContactFlag) return "Save";
      return "Update";
    }
  },
  created() {
    this.contactService = new ContactService();
  },
  methods: {
    async addOrUpdate() {
      this.$v.contact.$touch();
      if (this.$v.contact.$error) return;

      if (this.addContactFlag) {
        await this.contactService.addContact(this.user.id, this.contact);
        await this.$parent.getContactList();

        // this.$v.$reset();
        // setTimeout(() => { this.$v.$reset() }, 0);
        // this.$nextTick(() => { this.$v.$reset() });
      } else {
        await this.contactService.updateContact(this.contact);
      }
      let status = this.addContactFlag ? "Saved" : "Updated";
      this.showStatusModal.status = status + " Successfully";
      this.showStatusModal.statusCode = 1;
      this.showStatusModal.closeButton = true;
      this.showStatusModal.callBackFunc = this.addContactFlag
        ? this.afterSavedAction
        : this.afterUpdatedContact;
      this.showStatusModal.timeOut = 2000;
      this.$refs.showStatusModal.showDeleteActionStatus(this.showStatusModal);
    },
    async afterSavedAction() {
      await this.resetContactForm();
    },
    async afterUpdatedContact() {},
    async resetContactForm() {
      this.$parent.createDefaultContact();
      await this.$v.contact.$reset();
    },
    async deleteConfirmation(callBackFunc) {
      this.confirmationModal.header = "Delete contact";
      this.confirmationModal.body =
        "Do you want to delete now? This cannot be undone.";
      this.confirmationModal.cancelAction = "Cancel";
      this.confirmationModal.takeAction = "Delete";
      this.confirmationModal.callBackFunc = callBackFunc;
      this.$refs.confirmationModal.deleteConfirmation(this.confirmationModal);
    },
    deleteContact: async function(result) {
      if (result) {
        let res = await this.contactService.deleteContact(this.contact.id);
        if (res.status == 200) {
          this.showStatusModal.statusCode = 1;
          this.showStatusModal.status = "Deleted Successfully";
          this.showStatusModal.closeButton = true;
          this.showStatusModal.callBackFunc = this.afterDeletedContact;
          this.showStatusModal.timeOut = 2000;
          this.$refs.showStatusModal.showDeleteActionStatus(
            this.showStatusModal
          );
        }
      }
    },
    afterDeletedContact: async function() {
      await this.$parent.getContactList();
      await this.resetContactForm();
    }
  }
};
</script>

<style scoped>
.no-contact-selection {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}
.custom-focused-element {
  color: white;
  background-color: #021e53c7;
}
</style>