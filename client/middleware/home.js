export default function ({ store, redirect }) {
  // If the user is not homeenticated
  return redirect('/home')
}
