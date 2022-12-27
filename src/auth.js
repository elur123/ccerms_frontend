/* eslint-disable no-unused-expressions */
export const authenticate = (to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user !== null && user !== undefined) {
      if (user.usertype_id !== 6) {
        next('/admin/dashboard')
      } if (user.usertype_id === 6) {
        next('/student/dashboard')
      }
    } else {
      localStorage.removeItem('user')
      next()
    }
  }
  
export const adminAuthenticated = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user !== null && user !== undefined) {
    user.usertype_id !== 6 ? next() : next('/student/dashboard')
  } else {
    localStorage.removeItem('user')
    next('/login')
  }
}

export const studentAuthenticated = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user !== null && user !== undefined) {
    user.usertype_id === 6 ? next() : next('/admin/dashboard')
  } else {
    localStorage.removeItem('user')
    next('/login')
  }
}
  