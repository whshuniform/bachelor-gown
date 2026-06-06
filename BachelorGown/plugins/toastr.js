import Vue from "vue";
import Toastr from 'vue-toastr';

Vue.use(Toastr, {
  defaultTimeout: 3000,
  defaultProgressBar: true,
  defaultType: "info",
  defaultPosition: "toast-bottom-center",
  defaultCloseOnHover: true
});
