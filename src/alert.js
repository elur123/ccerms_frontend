const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

export const customAlert = (type, message) => {
    Toast.fire({
        icon: type,
        title: message
    })
}