import Swal, { SweetAlertIcon } from "sweetalert2";

function renderAlert(icon: SweetAlertIcon, message: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
  });
}

export default renderAlert;
